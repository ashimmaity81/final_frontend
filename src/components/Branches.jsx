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
    name: "South Hub",
    address: "56 Garden Park, Kharagpur",
    specialties: "Full-service Multispeciality Unit",
  },
];

const Branches = () => {
  return (
    <div>
      {/* Branches Section */}
      <section className="p-6 max-w-5xl mx-auto mt-8">
        <h2 className="text-3xl font-semibold text-indigo-900 mb-4 text-center">
          Our Clinic Branches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {branches.map((branch, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-indigo-900">
                {branch.name}
              </h3>
              <p className="text-sm text-gray-700">{branch.address}</p>
              <p className="text-sm text-emerald-700">{branch.specialties}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export { Branches };
