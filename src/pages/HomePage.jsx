import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance"; // same axiosInstance you use in ProfilePage
import { Navbar } from "../components/navbar";
import { AutoImageSlider } from "../components/AutoImageSilder";
import { DoctorsList } from "../components/DoctorsList";
import { Branches } from "../components/Branches";
import { Treatments } from "../components/Treatments";
import { Feedback } from "../components/Feedback";
import { Footer } from "../components/Footer";
import { PromoteUsers } from "../components/PromoteUsers";
import { ShowFeedback } from "../components/ShowFeedback";

const HomePage = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const resp = await axiosInstance.get("/users/details");
        const user = resp.data.data.user;
        if (user?.role) {
          setRole(user.role.toLowerCase());
        } else {
          setRole("user"); // fallback role
        }
      } catch (err) {
        setRole("user"); // fallback role on error
        console.error("Failed to fetch user role:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div
      className="max-h-screen overflow-y-auto overscroll-none"
      onTouchMove={(e) => e.stopPropagation()}
    >
      <Navbar />
      <div className="min-h-screen bg-emerald-50 text-gray-800 font-sans">
        <header className="bg-green-300 p-5 shadow-md text-center text-3xl font-bold text-indigo-900">
          <div className="-mt-10">Welcome to HealthFirst Clinics</div>
        </header>

        <AutoImageSlider />
        <DoctorsList />

        <div className="p-6 bg-white max-w-6xl mx-auto rounded-3xl shadow-lg border border-emerald-200 mt-5 mb-5">
          <div className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
            About Us
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            At HealthFirst Clinics, we are committed to delivering the highest
            quality of care with compassion and excellence. Our state-of-the-art
            facilities, experienced medical staff, and comprehensive healthcare
            services ensure that every patient receives personalized treatment.
            We believe in proactive healthcare, ensuring prevention, timely
            diagnosis, and continuous support throughout your health journey.
          </p>
        </div>

        <Treatments />
        <Branches />

        {/* Show PromoteUsers only if role is superadmin, else Feedback */}
        {role === "superadmin" ? (
          <PromoteUsers />
        ) : role === "admin" ? (
          <ShowFeedback />
        ) : (
          <Feedback />
        )}

        <Footer />
      </div>
    </div>
  );
};

export { HomePage };
