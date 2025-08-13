import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@config/axiosInstance";
import { useDispatch } from "react-redux";
import { setModelMedia } from "@store/model/modelSlice";

const ModelDetail = () => {
	const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [mediaList, setMediaList] = useState([]);
  const modelUrl = import.meta.env.VITE_MODEL_BASE_URL;

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
          setMediaList(res.data.data.data);
					dispatch(setModelMedia(res.data.data.data));
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  console.log(mediaList);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Model Media</h1>
      {mediaList.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {mediaList.map((media) => (
            <img
              key={media._id}
              src={`${modelUrl}/${media.thumbnail}`}
              alt="model media"
              className="rounded-lg"
            />
          ))}
        </div>
      ) : (
        <p>Media Not Found</p>
      )}
    </div>
  );
};

export default ModelDetail;
