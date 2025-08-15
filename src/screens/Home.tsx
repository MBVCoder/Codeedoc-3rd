import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModels } from "@store/model/modelSlice";
import api from "@config/axiosInstance";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@store/index";
import { Title } from "@components/stylingComponents/Title";

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
        console.log(response.data.data.data);
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
    <div className="">
      <Title text="Welcome to Fyne" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mx-5 my-5">
        {models.length > 0 &&
          models.map((model) => (
            <div
              className="border-1 border-black rounded-lg p-4 bg-gradient-to-b from-purple-400 to-orange-400 flex flex-col gap-2 justify-between min-w-[200px]"
              key={model._id}
            >
              <div className="mb-5 flex flex-col gap-2 justify-start ">
                <p className="self-end text-sm">
                  {" "}
                  Category : {model.categoryName}
                </p>
                <h1 className="self-center text-xl xl:text-2xl font-semibold my-2 border-b-[2px] ">
                  {model.name}
                </h1>
              </div>
              <img
                src={`${baseModelURL}/${model.thumbnail}`}
                alt="model"
                className="rounded-lg flex-shrink-0 w-full h-auto shadow-sm shadow-black hover:scale-105 duration-500 hover:cursor-pointer"
                onClick={() => navigate(`/model/${model._id}`)}
              />
              <div className="flex flex-row gap-2 justify-start items-center mt-5 text-[12px]">
                <p className="">Created by : </p>
                <p>{model.createdBy}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
