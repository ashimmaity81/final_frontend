import { doctors } from "../components/Doctors";

const DoctorsList = () => {
  return (
    <div className="p-6 bg-white max-w-6xl mx-auto rounded-xl shadow-md mt-4">
      <h2 className="text-3xl font-semibold text-indigo-900 text-center mb-6">
        Our Doctors
      </h2>

      {/* Scrollable horizontally with snapping */}
      <div className="flex justify-center">
        <div
          className="scroll-container flex gap-6 overflow-x-auto px-2 pb-4 max-w-full scroll-smooth scroll-pl-6 snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="min-w-[220px] flex-shrink-0 flex flex-col items-center bg-emerald-100 shadow-md rounded-lg p-4 snap-center"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-300 mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{doc.name}</h3>
              <p className="text-sm text-gray-600">{doc.specialization}</p>
              <p className="text-sm text-gray-500">{doc.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { DoctorsList };
