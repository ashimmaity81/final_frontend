import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axios/axiosInstance";

const PromoteUsers = () => {
  const [email, setEmail] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [myRole, setMyRole] = useState("");
  const [loading, setLoading] = useState(true);

  // Fields for promotion inputs
  const [nameInput, setNameInput] = useState("");
  const [specializationInput, setSpecializationInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [genderInput, setGenderInput] = useState("male"); // default to male

  // Fetch current logged-in user's role
  const fetchMyDetails = async () => {
    try {
      const resp = await axiosInstance.get("/users/details");
      const user = resp.data.data.user;
      setMyRole(user?.role?.toLowerCase() || "user");
    } catch (err) {
      console.error("Failed to fetch user details", err);
      setMyRole("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDetails();
  }, []);

  // Clear the card when email input is cleared
  useEffect(() => {
    if (email.trim() === "") {
      closeUserCard();
    }
  }, [email]);

  // When a user is searched and loaded, populate inputs if promoting
  useEffect(() => {
    if (searchedUser) {
      setNameInput(searchedUser.name || "");
      setSpecializationInput(searchedUser.specialization || "");
      setExperienceInput(searchedUser.experience || "");
      setGenderInput(searchedUser.gender || "male");
    } else {
      setNameInput("");
      setSpecializationInput("");
      setExperienceInput("");
      setGenderInput("male");
    }
  }, [searchedUser]);

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setSearchedUser(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (myRole !== "superadmin") {
      setError("Access denied. Only superadmins can promote/demote users.");
      return;
    }

    try {
      const res = await axiosInstance.get(
        `/users/details-by-email?email=${encodeURIComponent(email)}`
      );
      const user = res.data.data.user;

      if (user.role.toLowerCase() === "superadmin") {
        setError("Cannot modify role of another superadmin.");
        return;
      }

      setSearchedUser(user);
    } catch (err) {
      setError(err.response?.data?.message || "User not found.");
    }
  };

  const handleRoleChange = async () => {
    if (!searchedUser) return;

    let newRole, payload;

    if (searchedUser.role === "admin") {
      // Demote admin to user: clear specialization, experience, gender
      newRole = "user";
      payload = {
        email: searchedUser.email,
        role: newRole,
        specialization: null,
        experience: null,
        gender: null,
      };
    } else {
      // Promote user to admin: validate mandatory inputs
      if (
        !nameInput.trim() ||
        !specializationInput.trim() ||
        !experienceInput.trim()
      ) {
        setError(
          "Name, Specialization, and Experience are required to promote a user."
        );
        return;
      }

      newRole = "admin";
      payload = {
        email: searchedUser.email,
        role: newRole,
        name: nameInput.trim(),
        specialization: specializationInput.trim(),
        experience: experienceInput.trim(),
        gender: genderInput,
      };
    }

    try {
      const res = await axiosInstance.put("/users/update-role", payload);
      setMessage(res.data.message || `User role updated to ${newRole}.`);
      setSearchedUser((prev) => ({
        ...prev,
        role: newRole,
        name: payload.name || null,
        specialization: payload.specialization || null,
        experience: payload.experience || null,
        gender: payload.gender || null,
      }));
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (err) {
      setError(err.response?.data?.message || "Role update failed.");
    }
  };

  const closeUserCard = () => {
    setSearchedUser(null);
    setMessage("");
    setError("");
    setNameInput("");
    setSpecializationInput("");
    setExperienceInput("");
    setGenderInput("male");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-indigo-900">
        Loading your profile...
      </div>
    );
  }

  if (myRole !== "superadmin") {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-red-600 font-semibold">
        You are not authorized to access this page.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white max-w-6xl mx-auto rounded-3xl shadow-lg mt-5 mb-5 border border-emerald-200">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">
        Promote or Demote User
      </h2>

      <div className="flex gap-4 flex-col sm:flex-row">
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {searchedUser && (
        <div className="relative mt-6 border rounded-md p-4 shadow bg-gray-50">
          {/* Close Button */}
          <button
            onClick={closeUserCard}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            title="Close"
          >
            ×
          </button>

          <p>
            <strong>Email:</strong> {searchedUser.email}
          </p>

          {searchedUser.role === "user" ? (
            <>
              <div className="mt-2">
                <label className="block font-semibold mb-1">Name*</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="mt-2">
                <label className="block font-semibold mb-1">
                  Specialization*
                </label>
                <input
                  type="text"
                  value={specializationInput}
                  onChange={(e) => setSpecializationInput(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Enter specialization"
                  required
                />
              </div>

              <div className="mt-2">
                <label className="block font-semibold mb-1">Experience*</label>
                <input
                  type="text"
                  value={experienceInput}
                  onChange={(e) => setExperienceInput(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Enter experience"
                  required
                />
              </div>

              <div className="mt-2">
                <label className="block font-semibold mb-1">Gender*</label>
                <select
                  value={genderInput}
                  onChange={(e) => setGenderInput(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {searchedUser.name || "N/A"}
              </p>
              <p>
                <strong>Specialization:</strong>{" "}
                {searchedUser.specialization || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong> {searchedUser.experience || "N/A"}
              </p>
              <p>
                <strong>Gender:</strong> {searchedUser.gender || "N/A"}
              </p>
            </>
          )}

          <p className="mt-2">
            <strong>Role:</strong> {searchedUser.role}
          </p>

          <button
            onClick={handleRoleChange}
            className={`${
              searchedUser.role === "admin"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 mt-4 rounded`}
          >
            {searchedUser.role === "admin"
              ? "Demote to User"
              : "Promote to Admin"}
          </button>
        </div>
      )}

      {(message || error) && (
        <div
          className={`mt-4 font-medium ${
            message ? "text-green-700" : "text-red-600"
          }`}
        >
          {message || error}
        </div>
      )}
    </div>
  );
};

export { PromoteUsers };
