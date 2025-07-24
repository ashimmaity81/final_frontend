import { useState, useEffect } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    doctor: "",
    purpose: "",
    message: "",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const resp = await axiosInstance.get("/users/details");
      const userData = resp?.data?.data?.user;

      if (!userData) {
        ErrorToast("User data not found.");
        return;
      }

      setUser(userData);
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        gender: userData.gender || "male",
      }));
    } catch (err) {
      console.error("Fetch error:", err);
      ErrorToast("Failed to load profile data.");
    }
  };

  const fetchDoctors = async () => {
    try {
      const resp = await axiosInstance.get("/users/admins");
      const adminList = resp.data?.data?.admins || [];
      setDoctors(adminList);
    } catch (err) {
      console.error("Failed to load doctors", err);
      ErrorToast("Unable to fetch doctors list.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axiosInstance.post("/feedback/submit", formData);
      SuccessToast(resp.data.message);
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        gender: user?.gender || "male",
        doctor: "",
        purpose: "",
        message: "",
      });
    } catch (err) {
      ErrorToast(err.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-white max-w-6xl mx-auto rounded-3xl shadow-lg border border-emerald-200 mt-5 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
        Patient Feedback / Request
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 space-y-6"
      >
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              disabled={loading}
            />
          </div>
        </div>

        {/* Gender */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="flex items-center justify-around w-full border border-gray-300 rounded-md p-2">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  className="accent-indigo-600"
                  disabled={loading}
                />
                <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Doctor & Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="doctor"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor
            </label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              disabled={loading}
            >
              <option value="">Select Doctor</option>
              {doctors.length === 0 ? (
                <option disabled>No doctors found</option>
              ) : (
                doctors.map((doc) => (
                  <option key={doc._id} value={doc.name}>
                    {doc.name} ({doc.specialization || "No specialization"})
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <label
              htmlFor="purpose"
              className="block text-sm font-medium text-gray-700"
            >
              Purpose
            </label>
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              disabled={loading}
            >
              <option value="">Select Purpose</option>
              <option value="appointment">Appointment</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Your Feedback / Request
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Share your experience..."
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            disabled={loading}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export { Feedback };
