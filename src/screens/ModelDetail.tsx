import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setModelMedia } from "@store/model/modelSlice";
import { Title } from "@components/stylingComponents/Title";
import GradientButton from "@components/stylingComponents/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  setLastGeneratedData,
  setSelectedMedia,
} from "@store/model/productAiSlice";
import { setGenerating } from "@store/model/productAiSlice";

const ModelDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const lastGeneratedData = useSelector(
    (state: any) => state.productAi.lastGeneratedData,
  );
  const generating = useSelector((state: any) => state.productAi.generating);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // store selected IDs
  const modelUrl = import.meta.env.VITE_MODEL_BASE_URL;
  const MAX_SELECTION = 4;

  useEffect(() => {
    if (id) {
      api
        .get("/user/models/mediaList", {
          params: {
            type: "IMAGES",
            modelId: id,
            limit: 20,
            page: 1,
          },
        })
        .then((res) => {
          console.log(res.data.data.data);
          const data = res.data.data.data || [];
          setMediaList(data);
          dispatch(setModelMedia(data));
          localStorage.setItem("media", JSON.stringify(data));
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  // Toggle individual checkbox
  const toggleSelect = (mediaId: string) => {
    const isSelected = selectedItems.includes(mediaId);

    if (!isSelected && selectedItems.length >= MAX_SELECTION) {
      toast.error(`You can only select up to ${MAX_SELECTION} items.`);
      return;
    }

    setSelectedItems((prev) =>
      isSelected ? prev.filter((id) => id !== mediaId) : [...prev, mediaId],
    );
  };

  // Select all checkboxes
  const handleSelectAll = () => {
    const allIds = mediaList.slice(0, MAX_SELECTION).map((media) => media._id);

    if (mediaList.length > MAX_SELECTION) {
      toast.info(`Only the first ${MAX_SELECTION} items were selected.`);
    }

    setSelectedItems(allIds);
  };

  // Unselect all checkboxes
  const handleUnselectAll = () => {
    setSelectedItems([]);
  };

  // Generate API call
  const handleGenerate = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item.");
      return;
    }

    const selectedMedia = mediaList.filter((media) =>
      selectedItems.includes(media._id),
    );
    dispatch(setSelectedMedia(selectedMedia));
    const productImageKeys = selectedMedia.map((media) => media.key);

    dispatch(setGenerating(true));
    localStorage.setItem("selectedMedia", JSON.stringify(selectedMedia));
    api
      .post("/user/productAiDescription/generate", {
        modelId: id,
        productImageKeys,
      })
      .then((res) => {
        const data = res.data; // your actual response data
        dispatch(setLastGeneratedData(data)); // overwrite last data
        console.log("Generate success", data);
        navigate(`/model/${id}/description`); // redirect to description page
        toast.success("Generation completed!");
      })
      .catch(() => {
        // No toast error here, just log
        toast.warn("API failed, using last generated data instead");
        if (lastGeneratedData) {
          console.log("Showing old data:", lastGeneratedData);
          navigate(`/model/${id}/description`); // redirect to description page
        }
      })
      .finally(() => {
        dispatch(setGenerating(false));
      });
  };

  return (
    <div className="px-6 relative mb-10">
      <div className="flex flex-col items-center my-6">
        <Title text="Generate Product Ai Description" />
        <p className="text-md xl:text-lg text-center mb-5 text-gray-700">
          Select the media you want to generate product ai description for.
        </p>
      </div>
      <div className="flex gap-4 my-5 justify-center xl:justify-start">
        <GradientButton text="Select All" onClick={handleSelectAll} />
        <GradientButton text="Unselect All" onClick={handleUnselectAll} />
        <button
          onClick={handleGenerate}
          disabled={generating}
          className={`px-3 py-2 text-lg rounded-2xl duration-300 hover:scale-105 hover:cursor-pointer 
    ${
      generating
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-400 hover:bg-blue-500 text-white"
    }
  `}
        >
          Generate
        </button>
      </div>

      {mediaList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {mediaList.map((media) => (
            <div
              onClick={() => toggleSelect(media._id)}
              key={media._id}
              className="border rounded-lg p-2 flex flex-col gap-2 hover:cursor-pointer"
            >
              <div className="self-end mr-1">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(media._id)}
                  onChange={() => toggleSelect(media._id)}
                  className="appearance-none h-5 w-5 rounded-full border-2 border-gray-400 checked:bg-purple-300 checked:border-blue-500 focus:outline-none cursor-pointer transition-all duration-200"
                />
              </div>
              <img
                src={`${modelUrl}/${media.thumbnail}`}
                alt="model media"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-bold">Media Not Available</p>
      )}
    </div>
  );
};

export default ModelDetail;
