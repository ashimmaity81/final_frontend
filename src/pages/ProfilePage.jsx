import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { Navbar } from "../components/navbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const getUserDetails = async () => {
    try {
      setLoadingProfile(true);
      const resp = await axiosInstance.get("/users/details");
      const user = resp.data.data.user;
      if (user) {
        setUserDetails(user);
        setName(user.name || "");
        setGender(user.gender || "");
      } else {
        setUserDetails({});
      }
    } catch (err) {
      ErrorToast(`${err.response?.data?.message || err.message}`);
      setUserDetails({});
    } finally {
      setTimeout(() => setLoadingProfile(false), 3000);
    }
  };

  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosInstance.put("/users/update", {
        name,
        gender,
      });
      setUserDetails(resp.data.data.user);
      SuccessToast("Profile updated successfully!");
    } catch (err) {
      ErrorToast(`${err.response?.data?.message || err.message}`);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-emerald-100">
      <Navbar />
      <div className="flex justify-center p-6">
        {loadingProfile ? (
          <SkeletonTheme baseColor="#cbd5e0" highlightColor="#a0aec0">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-xl">
              <div className="flex flex-col items-center mb-6">
                <Skeleton
                  circle={true}
                  height={80}
                  width={80}
                  className="mb-4"
                />
                <Skeleton height={20} width="60%" className="mb-2" />
                <Skeleton height={15} width="40%" />
              </div>
              <Skeleton height={35} width="100%" className="mb-4" />
              <Skeleton height={35} width="100%" className="mb-4" />
              <Skeleton height={35} width="100%" className="mb-4" />
              <Skeleton height={35} width="50%" />
            </div>
          </SkeletonTheme>
        ) : (
          <form
            onSubmit={handleUpdateUserDetails}
            className="bg-white shadow-xl rounded-lg p-6 w-full max-w-xl flex flex-col gap-6"
          >
            <h2 className="text-2xl font-semibold text-indigo-900">
              Your Profile
            </h2>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Email</label>
              <input
                value={userDetails?.email || ""}
                type="text"
                name="email"
                className="py-2 px-3 rounded-md border border-gray-300 bg-gray-200 text-gray-700 cursor-not-allowed"
                disabled
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Role</label>
              <p className="px-3 py-2 bg-lime-200 text-indigo-800 font-medium rounded-md w-fit">
                {userDetails?.role || ""}
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">--- Select ---</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-indigo-900 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export { ProfilePage };
