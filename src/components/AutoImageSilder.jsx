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
    }, 5000); // every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-6 bg-white max-w-6xl mx-auto shadow-md mt-4 overflow-hidden rounded-md">
      <img
        src={images[index]}
        alt={`clinic-${index}`}
        className="w-full h-[470px] object-cover transition-all duration-500 rounded-b-md cursor-not-allowed"
      />
    </div>
  );
};

export {AutoImageSlider};
