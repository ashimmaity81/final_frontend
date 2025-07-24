const branches = [
  {
    name: "Downtown",
    address: "123 City Road, Kolkata",
    specialties: "General Medicine and Pediatrics",
  },
  {
    name: "North Clinic",
    address: "45 Green Lane, Siliguri",
    specialties: "Orthopedics & Sports Injury Center",
  },
  {
    name: "East Side",
    address: "12 Lake Avenue, Durgapur",
    specialties: "Dentistry and General Consultation",
  },
  {
    name: "West End",
    address: "89 Valley Street, Asansol",
    specialties: "Women and Child Care",
  },
  {
    name: "South Hub",
    address: "56 Garden Park, Kharagpur",
    specialties: "Full-service Multispeciality Unit",
  },
  {
    name: "North Hub",
    address: "52 Garden Park, Kharagpur",
    specialties: "Full-service Multispeciality Unit",
  },
];

const Branches = () => {
  return (
    <div className="p-6 bg-white max-w-6xl mx-auto rounded-3xl shadow-lg border border-emerald-200 mt-5 mb-5">
      {/* Branches Section */}
      <section>
        <h2 className="text-3xl font-semibold text-indigo-900 mb-6 text-center">
          Our Clinic Branches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {branches.map((branch, idx) => (
            <div
              key={idx}
              className="border border-emerald-300 p-4 rounded-lg hover:shadow-lg transition bg-emerald-100"
            >
              <h3 className="text-xl font-medium text-indigo-900 mb-2">
                {branch.name}
              </h3>
              <p className="text-sm text-gray-700 mb-1">{branch.address}</p>
              <p className="text-sm text-emerald-700">{branch.specialties}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export { Branches };
