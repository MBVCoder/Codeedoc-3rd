import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setModels } from "@store/model/modelSlice";

const Home = () => {
	const baseURL = "https://local-test-fynetone-1.s3.us-east-1.amazonaws.com"
	const dispatch = useDispatch();
	const token2 = localStorage.getItem("token");
  useEffect(() => {

    axios
      .get(
        "https://edited-festival-types-kernel.trycloudflare.com/user/models/list?limit=20&page=1&search=",
        {
          headers: {
            Authorization: `Bearer ${token2}`,
						"org-id": "6899b0197ff60d555b110cb5",
						portal: "USER",
          },
        },
      )
      .then((response) => {
        console.log(response.data.data.data[0]);
				localStorage.setItem("models", JSON.stringify(response.data.data.data[0]));
				dispatch(setModels(response.data.data.data[0]));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
	const model = localStorage.getItem("models");
	const modelimage = JSON.parse(model).thumbnail;
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">Welcome to Fyne</h1>
			{/* <h1 className="text-2xl text-black">{modelimage}</h1> */}
			<img src={`${baseURL}/${modelimage}`} alt="model" className="w-1/2 h-auto" />
    </div>
  );
};

export default Home;
