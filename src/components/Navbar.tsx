import logo from "@assets/logo.png";
import { useDispatch } from "react-redux";
import { logOut } from "@store/auth/authslice";
import { removeModel } from "@store/model/modelSlice";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(logOut());
    dispatch(removeModel());
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="">
      <nav className="fixed top-0 left-0 w-full h-20 z-30 bg-white">
        <div className="flex flex-row justify-between items-center px-5 py-2 max-w-[1600px] mx-auto w-full">
          <div className="flex flex-row gap-8 justify-center items-center divide-x-2">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-auto h-16 z-10 pr-5" />
            </Link>
            <div className="">
              <button
                onClick={handleBack}
                className="bg-gradient-to-r from-orange-400 to-purple-400 px-5 py-2 rounded-lg hover:scale-105 transition-all duration-500 hover:cursor-pointer z-10 text-white"
              >
                ← Back
              </button>
            </div>
          </div>

          <h1
            className="font-semibold text-md bg-red-500 px-5 py-2 my-auto rounded-lg hover:scale-105 transition-all duration-500 hover:cursor-pointer z-10 text-white hover:bg-red-600"
            onClick={handleClick}
          >
            Logout
          </h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
