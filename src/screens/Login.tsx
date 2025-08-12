import facebook from "@assets/facebook.svg";
import twitter from "@assets/twitter.svg";
import instagram from "@assets/instagram.svg";
import logo from "@assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "@store/auth/authslice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
  const [email, setEmail] = useState("testom2@yopmail.com");
  const [password, setPassword] = useState("Test@123");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post("https://edited-festival-types-kernel.trycloudflare.com/user/auth/test-login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.data.token);
				localStorage.setItem("refreshToken", res.data.data.refreshToken);
        dispatch(setToken(res.data.data.token));
        toast.success("Login Success");
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <section className="min-h-screen flex items-stretch text-white">
      {/* Left Side */}
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2020/02/08/03/42/singapore-jewel-4828998_1280.jpg)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl text-left tracking-wide font-roboto">
            Welcome to Fyne
          </h1>
          <p className="text-3xl my-4 font-outfit">
            Let's design in your unique way.First Login to Start and Create your
            own Fyne.
          </p>
        </div>
        <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
          <span className="bg-black p-2 rounded-2xl hover:scale-110 duration-400 cursor-pointer">
            <img src={facebook} alt="facebook" className="w-8 h-8 " />
          </span>
          <span className="bg-black p-2 rounded-2xl hover:scale-110 duration-400 cursor-pointer">
            <img src={twitter} alt="twitter" className="w-8 h-8 " />
          </span>
          <span className="bg-black p-2 rounded-2xl hover:scale-110 duration-400 cursor-pointer">
            <img src={instagram} alt="instagram" className="w-8 h-8 " />
          </span>
        </div>
      </div>

      {/* Right Side */}
      <div
        className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
        style={{ backgroundColor: "#161616" }}
      >
        <div
          className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div className="w-full py-6 z-20">
          {/* Logo */}
          <h1 className="my-6 flex justify-center items-center">
            <img
              src={logo}
              alt="logo"
              loading="eager"
              className=" w-auto h-30 inline-flex"
            />
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
          >
            <div className="pb-2 pt-4 my-2">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="block w-full p-4 text-lg rounded-2xl bg-black focus:outline-none"
              />
            </div>
            <div className="pb-2 pt-4 my-2">
              <input
                className="block w-full p-4 text-lg rounded-2xl bg-black focus:outline-none"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
              />
            </div>
            {/* <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
              <a href="#">Forgot your password?</a>
            </div> */}
            <div className="px-4 pb-2 pt-4 my-5">
              <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none hover:cursor-pointer duration-300 ">
                sign in
              </button>
            </div>

            {/* Social Icons on Mobile */}
            <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden">
              <span className="bg-black p-2 rounded-2xl hover:scale-110 duration-400 cursor-pointer">
                <img src={facebook} alt="facebook" className="w-8 h-8 " />
              </span>
              <span className="bg-black p-2 rounded-2xl hover:scale-110 duration-400 cursor-pointer">
                <img src={twitter} alt="twitter" className="w-8 h-8 " />
              </span>
              <span className="bg-black p-2 rounded-2xl hover:scale-110 duration-400 cursor-pointer">
                <img src={instagram} alt="instagram" className="w-8 h-8 " />
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
