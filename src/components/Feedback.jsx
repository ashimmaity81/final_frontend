import { doctors } from "../components/Doctors";

const Feedback = () => {
  return (
    <div>
      {/* Feedback Form */}
      <section className="p-6 max-w-5xl mx-auto mt-8">
        <h2 className="text-3xl font-semibold text-indigo-900 mb-4">
          Patient Feedback / Request
        </h2>
        <form className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <div className="flex items-center justify-around w-full border border-gray-300 rounded-md p-2">
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="accent-indigo-600"
                />
                <span>Male</span>
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="accent-indigo-600"
                />
                <span>Female</span>
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="accent-indigo-600"
                />
                <span>Others</span>
              </label>
            </div>
          </div>

          {/* Doctor & Purpose Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Doctor Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Doctor
              </label>
              <select className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 overflow-y-auto">
                <option value="">Select Doctor</option>
                {doctors.map((doc, index) => (
                  <option key={index} value={doc.name}>
                    {doc.name} ({doc.specialization})
                  </option>
                ))}
              </select>
            </div>

            {/* Purpose Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Purpose
              </label>
              <select className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400">
                <option value="">Select Purpose</option>
                <option value="appointment">Appointment</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
          </div>

          {/* Feedback Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Feedback / Request
            </label>
            <textarea
              rows="4"
              placeholder="Share your experience..."
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export { Feedback };
