import logo from "@assets/logo.png";
import { useDispatch } from "react-redux";
import { logOut } from "@store/auth/authslice";
import { removeModel } from "@store/model/modelSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(logOut());
    dispatch(removeModel())
  };
  return (
    <div>
      <nav className="flex flex-row justify-between items-center px-5 py-2">
        <img src={logo} alt="logo" className="w-auto h-16 z-10" />
        <h1
          className="font-semibold text-md bg-red-500 px-5 py-2 my-auto rounded-lg hover:scale-105 transition-all duration-500 hover:cursor-pointer z-10 text-white hover:bg-red-600"
          onClick={handleClick}
        >
          Logout
        </h1>
      </nav>
    </div>
  );
};

export default Navbar;
