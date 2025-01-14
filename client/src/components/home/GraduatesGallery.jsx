import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import one from "./../../assets/graduatesGallery/1.jpg";
import two from "./../../assets/graduatesGallery/2.jpg";
import three from "./../../assets/graduatesGallery/3.jpg";
import four from "./../../assets/graduatesGallery/4.jpg";
import five from "./../../assets/graduatesGallery/5.jpg";
import six from "./../../assets/graduatesGallery/6.jpg";
import seven from "./../../assets/graduatesGallery/7.jpg";
import eight from "./../../assets/graduatesGallery/8.jpg";
import nine from "./../../assets/graduatesGallery/9.jpg";
import ten from "./../../assets/graduatesGallery/10.jpg";
import eleven from "./../../assets/graduatesGallery/11.jpg";
import twelve from "./../../assets/graduatesGallery/12.jpg";
import thirteen from "./../../assets/graduatesGallery/13.jpg";
import fourteen from "./../../assets/graduatesGallery/14.jpg";
import fifteen from "./../../assets/graduatesGallery/15.jpg";
import sixteen from "./../../assets/graduatesGallery/16.jpg";
import seventeen from "./../../assets/graduatesGallery/17.jpg";
import eighteen from "./../../assets/graduatesGallery/18.jpg";

import { useGetCollegesQuery } from "@/redux/features/collegeApi";
import IsRTKLoadingLoader from "../IsRTKLoadingLoader";
import { toast } from "sonner";

const images = [
  one, two, three, four, five, six, seven, eight, nine, ten,
  eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen,
];

const GraduatesGallery = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [isFading, setIsFading] = useState(false); // For fade effect
  const { data, isLoading, error } = useGetCollegesQuery({ page: 1 });
  const isSmallScreen = window.innerWidth <= 768;

  const prevSlider = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlider((currentSlider) =>
        currentSlider === 0 ? images.length - 1 : currentSlider - 1
      );
      setIsFading(false);
    }, 300);
  };

  const nextSlider = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlider((currentSlider) =>
        currentSlider === images.length - 1 ? 0 : currentSlider + 1
      );
      setIsFading(false);
    }, 300);
  };

  if (error) {
    toast.error(error?.data?.message)
  }
  
  if (isLoading) {
    return <IsRTKLoadingLoader />
  }

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1.5" >
        <h1 className="heading">{`Graduate's Gallery`} </h1>
        <p className="text-gray-500">
          {`Discover the world's top colleges, by graduating from our prestigious universities. View our graduate's photos and read their testimonials.`}
        </p>
      </div>

      <div
      className="w-full h-full md:h-[95vh] sm:h96 md:h[540px] rounded-lg flex flex-col xl:flex-row items-center justify-center gap-5 lg:gap-10 relative bg-cover before:absolute before:bg-black/50 before:inset-0 transform duration-1000 ease-linear z-50 overflow-hidden"
    >
      {/* Main Image with Fade Effect */}
      <img
        src={images[currentSlider]}
        alt={`${data?.colleges?.[currentSlider]?.name}'s graduation`}
        loading="lazy"
        className={`h-full w-full absolute transition-opacity rounded-lg duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Arrow Controls */}
      <div className="absolute bottom-2 right-0 flex gap-3 z-50 px-5">
        {/* Arrow Left */}
        <button onClick={prevSlider} className="bg-white text-black rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-300 duration-500 " >
          <ChevronLeft />
        </button>

        {/* Arrow Right */}
        <button onClick={nextSlider} className="bg-white text-black rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-300 duration-500" >
          <ChevronRight />
        </button>
      </div>

      {/* Text Container */}
      {/* <div className="w-1/2 px-4 left-0 absolute drop-shadow-lg text-white rounded-lg">
        <h1 className="lg:text-3xl mb-3">
          {data?.colleges?.[currentSlider]?.name || "Loading..."}
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">
          {data?.colleges?.[currentSlider]?.details ||
            "Fetching details..."}
        </p>
      </div> */}

      {/* Slider Thumbnails */}
      <div className="w-1/3 overflow-hidden absolute bottom-1 left-0 bg-red-5 bg-transparent border2 lg:-right-6 px-2 z-50">
        <div
          className="ease-linear duration-300 flex gap-4 items-center  "
          style={{
            transform: `translateX(-${currentSlider * (isSmallScreen ? 98 : 200)}px)`,
          }}
        >
          {/* Thumbnails */}
          {images.map((image, inx) => (
            <img
              key={inx}
              src={image}
              loading="lazy"
              className={`min-w-[90px] lg:min-w-[184px] h-full ${
                currentSlider - 1 === inx ? "scale-0" : "scale-100 delay-500"
              } duration-300 rounded-lg z-50`}
              alt={`Slide ${inx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default GraduatesGallery;