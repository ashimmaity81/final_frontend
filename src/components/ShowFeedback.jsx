import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";

const ShowFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [myRole, setMyRole] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Date selector state - default today (local yyyy-mm-dd)
  const getLocalToday = () => new Date().toLocaleDateString("en-CA");
  const [selectedDate, setSelectedDate] = useState(getLocalToday());

  // Fetch user role and email
  const fetchMyDetails = async () => {
    try {
      const res = await axiosInstance.get("/users/details");
      setMyRole(res.data.data.user.role.toLowerCase());
      setMyEmail(res.data.data.user.email.toLowerCase());
    } catch (err) {
      setMyRole("user");
      setMyEmail("");
    }
  };

  // Fetch feedbacks based on role and selected date
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/feedback/all");
      let allFeedbacks = res.data.data;

      // Filter by selectedDate using local date string
      const filteredByDate = allFeedbacks.filter((fb) => {
        const localFbDate = new Date(fb.createdAt).toLocaleDateString("en-CA");
        return localFbDate === selectedDate;
      });

      if (myRole === "admin") {
        setFeedbacks(filteredByDate);
      } else if (myRole === "doctor") {
        const doctorFeedbacks = filteredByDate.filter(
          (fb) => fb.doctorEmail?.toLowerCase() === myEmail
        );
        setFeedbacks(doctorFeedbacks);
      } else {
        setFeedbacks([]);
      }
      setCurrentPage(1); // reset to first page on new fetch
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDetails();
  }, []);

  useEffect(() => {
    if (myRole) {
      fetchFeedbacks();
    }
  }, [myRole, selectedDate, myEmail]);

  // Pagination
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const paginatedFeedbacks = feedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePrevPage = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (myRole !== "admin" && myRole !== "doctor") {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Only admins and doctors can view feedbacks.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white max-w-6xl mx-auto rounded-3xl shadow-lg border border-emerald-200 mt-5 mb-5">
      <h2 className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
        User Feedbacks
      </h2>

      {/* Date selector for admins */}
      {myRole === "admin" && (
        <div className="mb-6 flex justify-center">
          <label className="mr-4 font-semibold text-indigo-700 self-center">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded px-3 py-1"
            max={getLocalToday()}
          />
        </div>
      )}

      {feedbacks.length === 0 ? (
        <p className="text-gray-500 text-center">
          No feedbacks found for this date.
        </p>
      ) : (
        <>
          {/* 2-column grid for feedback */}
          <div className="grid grid-cols-1 gap-6">
            {paginatedFeedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg shadow bg-emerald-100 border-emerald-300 w-[99.5%] mx-auto"
              >
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {/* Row 1 */}
                  <div>
                    <strong>Name:</strong> {fb.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {fb.email}
                  </div>

                  {/* Row 2 */}
                  <div>
                    <strong>Gender:</strong> {fb.gender}
                  </div>
                  <div>
                    <strong>Doctor:</strong> {fb.doctor}
                  </div>

                  {/* Row 3 */}
                  <div>
                    <strong>Purpose:</strong> {fb.purpose}
                  </div>
                  <div>
                    <strong>Message:</strong> {fb.message}
                  </div>

                  {/* Row 4: Date spanning full width */}
                  <div className="col-span-2 mt-2 text-sm text-gray-500">
                    <strong>Date:</strong>{" "}
                    {new Date(fb.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-5 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-emerald-700 text-white hover:bg-emerald-600"
                }`}
              >
                Prev
              </button>
              <span className="self-center font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-5 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-emerald-700 text-white hover:bg-emerald-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { ShowFeedback };
