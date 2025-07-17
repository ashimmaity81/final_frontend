import { Navbar } from "../components/navbar";
import { AutoImageSlider } from "../components/AutoImageSilder";
import { DoctorsList } from "../components/DoctorsList";
import { Branches } from "../components/Branches";
import { Treatments } from "../components/Treatments";
import { Feedback } from "../components/Feedback";
import { Footer } from "../components/Footer";

const HomePage = () => {
  return (
    <div
      className="max-h-screen overflow-y-auto overscroll-none"
      onTouchMove={(e) => e.stopPropagation()}
    >
      <Navbar />
      <div className="min-h-screen bg-emerald-50 text-gray-800 font-sans">
        {/* Header */}
        <header className="bg-green-300 p-5 shadow-md text-center text-3xl font-bold text-indigo-900">
          <div className="-mt-10">Welcome to HealthFirst Clinics</div>
        </header>

        {/* Image slider */}
        <AutoImageSlider />

        {/* Doctors list */}
        <DoctorsList />

        {/* Clinic Intro Description */}
        <div className="p-6 bg-white max-w-6xl mx-auto rounded-xl shadow-md mt-4">
          <div className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
            About Us
          </div>
          <p className="text-lg">
            At HealthFirst Clinics, we are committed to delivering the highest
            quality of care with compassion and excellence. Our state-of-the-art
            facilities, experienced medical staff, and comprehensive healthcare
            services ensure that every patient receives personalized treatment.
            We believe in proactive healthcare, ensuring prevention, timely
            diagnosis, and continuous support throughout your health journey.
          </p>
        </div>

        {/* Treatments Section */}
        <Treatments />

        {/* Branches */}
        <Branches />

        {/* Feedback Form */}
        <Feedback />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export { HomePage };
