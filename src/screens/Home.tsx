import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModels } from "@store/model/modelSlice";
import api from "@config/axiosInstance";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@store/index";

const Home = () => {
  const navigate = useNavigate();
  const baseModelURL = import.meta.env.VITE_MODEL_BASE_URL;
  const dispatch = useDispatch();
  const { models } = useSelector((state: RootState) => state.model);

  useEffect(() => {
    // console.log(models);
    api
      .get("/user/models/list", {
        params: { limit: 20, page: 1, search: "" },
      })
      .then((response) => {
        // console.log(response.data.data.data[0]);
        localStorage.setItem("models", JSON.stringify(response.data.data.data));
        dispatch(setModels(response.data.data.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // console.log(
  //   "response from the homepage :" +
  //     models.name +
  //     " and " +
  //     models.categoryName,
  // );

  return (
    <div>
      <h1 className="text-center text-4xl font-bold">Welcome to Fyne</h1>
      <div className="grid grid-cols-4 gap-4 mx-5 my-5">
        {models.length > 0 &&
          models.map((model) => (
            <div className="border-1 border-black rounded-lg" key={model._id}>
              <img
                src={`${baseModelURL}/${model.thumbnail}`}
                alt="model"
                className="rounded-lg flex-shrink-0 w-full h-auto"
                onClick={() => navigate(`/model/${model._id}`)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
