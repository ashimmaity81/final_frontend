import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";

const fixedImageUrl =
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const resp = await axiosInstance.get("/users/admins");
        setDoctors(resp.data.data.admins || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-indigo-900 font-semibold">
        Loading doctors...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 font-semibold">
        No doctors found.
      </div>
    );
  }

  return (
    <div className="relative bg-emerald-50 py-0 mt-0 mb-0">
      <div className="p-8 bg-white max-w-6xl mx-auto rounded-3xl shadow-lg border border-emerald-200">
        <h2 className="text-3xl font-bold text-indigo-900 text-center mb-12 tracking-wide">
          Meet Our Expert Doctors
        </h2>

        <div
          className="flex justify-center border border-emerald-300 rounded-2xl shadow-inner overflow-x-auto px-4 py-6 max-w-full scroll-smooth snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {doctors.map((doc, idx) => (
            <div
              key={doc._id || idx}
              className="min-w-[260px] flex-shrink-0 bg-gradient-to-br from-emerald-50 to-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6 snap-center border border-emerald-200 mx-2"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={fixedImageUrl}
                  alt={doc.name || "Doctor"}
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-300 mb-4 shadow-sm"
                />
                <h3 className="text-lg font-semibold text-emerald-800">
                  {doc.name || "Name not available"}
                </h3>
                <p className="text-sm text-gray-700 mt-1 font-medium">
                  {doc.specialization || "Specialization N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1 italic">
                  {doc.experience
                    ? `${doc.experience} experience`
                    : "Experience N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { DoctorsList };
