"use client"; // Add this if using Next.js

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import 7 car brand images
import Volks_Logo from "../Assets/Car_Brand_Images/Volks_Logo.svg";
import BMW_Logo from "../Assets/Car_Brand_Images/Audi_Logo.svg";
import Audi_Logo from "../Assets/Car_Brand_Images/Benz_Logo.svg";
import Tesla_Logo from "../Assets/Car_Brand_Images/BMW_Logo.svg";
import Ford_Logo from "../Assets/Car_Brand_Images/Kia_Logo.svg";
import Mercedes_Logo from "../Assets/Car_Brand_Images/Nissan_Logo.svg";
import Toyota_Logo from "../Assets/Car_Brand_Images/Toyota_Logo.svg";

const images = [
  Volks_Logo,
  BMW_Logo,
  Audi_Logo,
  Tesla_Logo,
  Ford_Logo,
  Mercedes_Logo,
  Toyota_Logo,
];

const BrandSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 7, // Show 4 logos at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 640, // Mobile
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto flex justify-center items-center py-8 overflow-hidden">
      <div className="w-full max-w-[1500px]">
        <Slider {...settings}>
          {images.map((image, idx) => (
            <div key={idx} className="flex justify-center items-center">
            <img src={image} alt="Brand Logo" className="w-[100px] md:w-[150px] h-auto mx-auto" />
          </div>
          
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BrandSlider;
