import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import BackIcon from "../Assets/BackIcon.svg"; // Replace with your actual image icon
import defaultCarImg from "../Assets/Car_Images/missing-car1.png"; // Import default image

const AccordionItem = ({ title, isOpen, onClick, children }) => (
    <div className="border-b border-gray-300">
      <button
        onClick={onClick}
        className="text-[18px] w-full text-left flex justify-between items-center px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 transition duration-300"
      >
        {title}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && <div className="px-4 py-2 bg-gray-20">{children}</div>}
    </div>
  );

const CarProfile = ( { carData } ) => {

  const navigate = useNavigate();
  const carValues = carData;
  const imageSource = carValues.img_src;
  const imageFolder = `${imageSource.directory}/`;
  const imageFiles = imageSource.files;

  const [imageGallery, setImageGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      const images = [];
      const priorityImages = ["main.avif", "front.avif", "side.avif", "back.avif"];
      const optionalImages = imageFiles.filter((value) => !new Set(priorityImages).has(value));

      // console.log("Priority Images: ", priorityImages);
      // console.log("Optional Images: ", optionalImages);
      // console.log("All Images: ", imageFiles);
      
      const checkImageExists = (src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src); 
          img.onerror = () => resolve(null);
        });
      };

      for (const fileName of priorityImages) {
        const imageSrc = await checkImageExists(`${imageFolder}${fileName}`);
        if (imageSrc) images.push(imageSrc);
      }

      for (const fileName of optionalImages) {
        const imageSrc = await checkImageExists(`${imageFolder}${fileName}`);
        if (imageSrc) images.push(imageSrc);
      }

      setImageGallery(images);
      if (images.length > 0) setSelectedImage(images[0]); // Default to first image
    };

    loadImages();
  }, [carValues.reference]);

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };


  

  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-8 2xl:px-0 flex flex-col lg:flex-row gap-[20px] md:gap-[70px]">
      {/* Left Section: Car Image & Gallery */}
      <div className="w-full lg:w-3/6 md:sticky md:top-0 md:self-start">
      <img
  src={selectedImage || defaultCarImg}
  alt="Car Profile"
  className="w-full h-[380px] rounded-lg shadow-lg object-cover border"
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = defaultCarImg; // Replace with default image
  }}
/>

{/* Thumbnail Gallery */}
<div className="grid grid-cols-5 gap-0 mt-4">
          {imageGallery.map((image, index) => (
            <div key={index} className="w-full h-[80px]">
              <img
                src={image}
                className={`w-full h-full object-cover rounded-lg shadow-lg cursor-pointer border-2 ${
                  selectedImage === image ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(image)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultCarImg;
                }}
              />
            </div>
          ))}
        </div>


<div className="md:hidden">
    <div className="flex justify-between items-center mt-5 md:hidden">
          <h1 className="text-[28px] font-semibold mb-2">{carData.manufacturer} {carData.model}</h1>
          <img src={BackIcon} alt="Back" className="w-10 h-10 cursor-pointer" onClick={() => navigate(-1)}/>
        </div>

        {/* Price & Buttons */}
        <div className="flex flex-wrap items-center justify-between w-full">
          {/* Left Section: Price Text */}
          <div>
            <p className="text-gray-500 text-[16px] mb-2">Starting at</p>
            <p className="text-[30px] font-semibold mb-3">
            {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(carData.price)}
            </p>
          </div>

          {/* Right Section: Buttons */}
          <div className="flex flex-col w-full gap-2">
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold">
              GET CAR NOW
            </button>
            <button className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-600 hover:text-white font-semibold transition duration-300">
              CALCULATE LOAN
            </button>
          </div>
        </div>

</div>


        {/* Full-Width Accordion Section */}
<div className="w-full mt-3">
  {/* Vehicle Description */}
  <AccordionItem
    title="Vehicle Description"
    isOpen={openAccordion === 0}
    onClick={() => handleAccordionClick(0)}
  >
    <div className="p-2 text-gray-700 leading-relaxed text-justify">
      <p>{carData.details.description}</p>
    </div>
  </AccordionItem>

  {/* Equipment Description */}
  <AccordionItem
    title="Equipment Description"
    isOpen={openAccordion === 1}
    onClick={() => handleAccordionClick(1)}
  >
    <div className="p-4 text-gray-700 leading-relaxed text-justify">
    <p>{carData.details.equipment}</p>    
    </div>
  </AccordionItem>

  {/* Driving Performance */}
  <AccordionItem
    title="Driving Performance"
    isOpen={openAccordion === 2}
    onClick={() => handleAccordionClick(2)}
  >
    <div className="p-4 text-gray-700 leading-relaxed text-justify">
    <p>{carData.details.performance}</p>    
    </div>
  </AccordionItem>

  {/* Technology Features */}
  <AccordionItem
    title="Technology Features"
    isOpen={openAccordion === 3}
    onClick={() => handleAccordionClick(3)}
  >
    <div className="p-4 text-gray-700 leading-relaxed text-justify">
    <p>{carData.details.features}</p>    
    </div>
  </AccordionItem>
</div>


    
      </div>

      {/* Right Section: Car Details */}
      <div className="w-full lg:w-3/5 space-y-4 md:sticky md:top-0 md:self-start">
        {/* Title & Back Button */}

        <div className="hidden md:block">
    <div className="flex justify-between items-center">
          <h1 className="text-[35px] font-semibold mb-2">{carData.manufacturer} {carData.model}</h1>
          <img src={BackIcon} alt="Back" className="w-10 h-10 cursor-pointer" onClick={() => navigate(-1)}/>
        </div>

        {/* Price & Buttons */}
        <div className="flex flex-wrap items-center justify-between justify-center w-full">
          {/* Left Section: Price Text */}
          <div>
            <p className="text-gray-500 text-[20px] mb-2">Starting at</p>
            <p className="text-[35px] font-semibold">
              {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(carData.price)}
            </p>

          </div>

          {/* Right Section: Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold">
              GET CAR NOW
            </button>
            <button className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg shadow hover:bg-blue-600 hover:text-white font-semibold transition duration-300">
              CALCULATE LOAN
            </button>
          </div>
        </div>

</div>

        {/* Car Specifications Table */}
        <div className="px-5 rounded-lg shadow-lg border border-gray-300">

        <table className="w-full text-left text-gray-700">
  <tbody>
    {[
      ["Manufacturer", carData.manufacturer],
      ["Model", carData.model],
      ["Range", `${carData.drive_range} km`],
      ["Power", `${carData.engine_power} HP`],
      ["Battery Pack", `${carData.battery_pack} kWh`],
      ["Fuel", carData.fuel],
      ["Number of Seats", `${carData.seat_count} seats`],
      ["Gearbox", carData.transmission],
      ["Doors", `${carData.door_count} doors`],
      ["Motor", carData.drivetrain?.value], // Using optional chaining to prevent errors
      ["Vehicle Type", carData.type],
      ["Reference ID", carData.reference],
      ["Year Model", carData.year_model],
      ["Color Options", carData.colors?.join(", ") || "N/A"], // Display available colors
      // ["Is Featured", carData.is_featured ? "Yes" : "No"],
      // ["Is Secondhand", carData.is_secondhand ? "Yes" : "No"],
    ].map(([key, value], index) => (
      <tr key={index} className="border-b border-gray-300 last:border-0">
        <td className="px-4 py-4 font-semibold text-gray-900">{key}</td> 
        <td className="px-4 py-4 text-right">{value}</td> {/* Adjusted padding */}
      </tr>
    ))}
  </tbody>
</table>
        


        </div>
      </div>
    </div>
  );
};

export default CarProfile;
