import facebook from "@assets/icons/facebook.svg";
import twitter from "@assets/icons/twitter.svg";
import instagram from "@assets/icons/instagram.svg";
import logo from "@assets/logo.png";
import loginbg2 from "@assets/background/loginbg2removedbg.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@store/auth/authslice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "@config/axiosInstance";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("testom2@yopmail.com");
  const [password, setPassword] = useState("Test@123");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post("/user/auth/test-login", {
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log("Token from the Login : "+res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        dispatch(setToken(res.data.data));
        toast.success("Login Success");
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <section className="min-h-screen flex items-stretch">
      {/* Left Side */}
      <div className="lg:flex w-1/2 hidden justify-center relative">
        <img
          src={loginbg2}
          alt="loginbg"
          className="absolute bottom-30 bg-center bg-cover z-0"
        />
        <div className="w-full px-24 z-10 text-center absolute top-20">
          <h1 className="text-3xl 2xl:text-5xl tracking-wide font-roboto text-transparent bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text p-2">
            Welcome to FyneTone
          </h1>
          <p className="text-lg 2xl:text-2xl my-4 font-outfit font-semibold text-purple-400">
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
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
        <div className="lg:hidden absolute justify-center items-center">
          <img
            src={loginbg2}
            alt="loginbg2"
            className=" scale-110 lg:scale-170"
          />
        </div>
        <div className="w-full py-6 z-20 bg-white/40 backdrop-blur-md rounded-2xl text-center">
          {/* Logo */}
          <h1 className="my-6 flex justify-center items-center">
            <img
              src={logo}
              alt="logo"
              loading="eager"
              className="h-25 w-auto inline-flex"
            />
          </h1>

          <p className="text-md text-gray-500">
            Today is a new day. It's your day. You shape it. <br /> Sign in to start
            customising & managing your designs.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
          >
            <div className="pb-2 pt-4 my-2 flex flex-col gap-2 items-start">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="block w-full p-2 text-lg border-[1px] border-gray-800 text-gray-800 focus:outline-none rounded-sm"
              />
            </div>
            <div className="pb-2 pt-4 my-2 flex flex-col gap-2 items-start">
              <label htmlFor="email">Password :</label>
              <input
                className="block w-full p-2 text-lg border-[1px] border-gray-800 text-gray-800 focus:outline-none rounded-sm"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
              />
            </div>
            <div className="text-right text-gray-800 hover:underline hover:text-black font-semibold">
              <a href="#">Forgot your password?</a>
            </div>
            <div className=" pb-2 pt-4 my-5">
              <button className="uppercase block w-full p-2 text-md text-white focus:outline-none hover:cursor-pointer  bg-gradient-to-r from-orange-500 to-purple-500 rounded-sm text-shadow-none tracking-wider">
                sign in
              </button>
            </div>
            <div className="text-center text-gray-800 hover:underline hover:text-black font-semibold flex items-center justify-center">
              <p className="text-gray-400 mr-2">Don't have an account?</p>
              <a href="#" className="underline">Create Account</a>
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
