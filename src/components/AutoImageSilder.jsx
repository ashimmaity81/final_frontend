import { useEffect, useState } from "react";

const images = [
  "https://media.gettyimages.com/id/1990943278/photo/empty-doctors-office-in-a-large-hospital-no-people.jpg?s=612x612&w=0&k=20&c=bLn2LceMjarkNlT0IB6BD4NpTfA7kB_9hr_EZZ-yYCY=",
  "https://media.gettyimages.com/id/1295782888/photo/empty-doctors-office.jpg?s=612x612&w=0&k=20&c=goSuQXrpRKZsc3iP_1nzrkj0rNXqClgg13wawnf1L9A=",
  "https://media.gettyimages.com/id/1128843877/photo/happy-doctors-and-businessmen-reading-medical-data-in-hospital.jpg?s=612x612&w=0&k=20&c=bhBVulFQIjy2dcncnEe4Oc-KtCCW5DooUTEW70tYXX4=",
  "https://media.gettyimages.com/id/1440783906/photo/medical-boardroom-meeting.jpg?s=612x612&w=0&k=20&c=KbYhCz1eab7eb8HiS6rD6DueP0iHr7-Ka_YGFYePwmU=",
];

const AutoImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white max-w-6xl mx-auto mt-5 mb-5 p-8 rounded-3xl shadow-lg overflow-hidden select-none border border-emerald-200">
      <div className="relative w-full h-[560px]">
        <img
          src={images[index]}
          alt={`clinic-${index}`}
          className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-in-out cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export { AutoImageSlider };
