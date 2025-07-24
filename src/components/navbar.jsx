import { Link, useNavigate } from "react-router";
import { useAppContext } from "../contexts/appContext";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
  const { user = {} } = useAppContext();
  const navigate = useNavigate();
  const { isAuthenticated } = user;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      SuccessToast("Logout successful!");
      window.location.reload();
    } catch (err) {
      ErrorToast(err.message);
    }
  };

  const handleOpenProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div className="px-8 py-4 flex items-center justify-between bg-green-300 shadow-lg">
      <div className="text-2xl font-bold text-indigo-900">My App</div>

      <div className="flex gap-6 items-center">
        <Link to="/" className="text-indigo-900 hover:text-indigo-600 text-3xl">
          <AiFillHome />
        </Link>

        {!isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="text-blue-700 font-medium hover:underline hover:text-blue-500 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-blue-700 font-medium hover:underline hover:text-blue-500 transition"
            >
              Signup
            </Link>
          </div>
        ) : (
          <>
            <button
              className="py-1 px-3 bg-indigo-900 text-white rounded-md hover:bg-indigo-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
            <div
              onClick={handleOpenProfilePage}
              className="h-10 w-10 cursor-pointer rounded-full bg-indigo-900 text-white text-lg flex items-center justify-center font-semibold hover:bg-indigo-600 transition"
            >
              {user?.email?.substr(0, 1)?.toUpperCase()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Navbar };
