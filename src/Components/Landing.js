import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import Landing_Image_Mobile from '../Assets/Landing_Image_Mobile.svg';
import Landing_Image_Desktop from '../Assets/Landing_Image.svg';
import Landing_Next_Icon from '../Assets/Landing_Next_Icon.svg';
import Car_Block from "../Components/carblock";
import { CARDATA } from "../cardata";

const Landing = ({onCompare}) => {
  const carData = CARDATA("true");
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const gridRef = useRef(null);

  useEffect(() => {
    if (carData) {
      setData(carData);
    }
  }, [carData]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (gridRef.current) {
        const gridComputedStyle = window.getComputedStyle(gridRef.current);
        const columns = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
        setItemsPerPage(columns);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  let carDataArray = Object.entries(data);
  const totalPages = carDataArray.length > 0 ? Math.ceil(carDataArray.length / itemsPerPage) : 0;
  const currentCars = carDataArray.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSwipeLeft = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...swipeHandlers}>
      {/* Background Section */}
      <div
        className="w-full max-w-[1500px] mx-auto h-[500px] lg:h-[430px] bg-cover bg-center flex flex-col justify-center text-white px-5 lg:px-10 rounded-b-[30px] lg:rounded-b-[50px] overflow-hidden"
        style={{
          backgroundImage:
            window.innerWidth >= 1024
              ? `url(${Landing_Image_Desktop})` // No gradient on lg
              : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.07)), url(${Landing_Image_Mobile})`, // Gradient on mobile
        }}
      >
        {/* Content */}
        <div>
          {/* Header */}
          <h1 className="text-[40px] lg:text-[60px] font-bold mb-3 leading-[1.2] lg:leading-[1]">
            Drive the Future.<br />
            Go Electric Today!
          </h1>
          <p className="text-[18px] lg:text-[20px] font-semibold mb-6 leading-[1.3]">
            Find your dream electrical car with evest dealership.
          </p>

          {/* Mobile Buttons (Hidden on Desktop) */}
          <div className="flex flex-col gap-4 lg:hidden">
          <button
  onClick={() => window.location.href = "/car-catalog"}
  className="flex flex-row justify-between items-center w-full bg-white text-[18px] text-black font-semibold py-5 px-6 rounded-lg"
>
  <div className="flex flex-col text-left">
    <div className="font-semibold text-[18px]">Browse Electric Cars</div>
    <div className="hidden text-[15px] text-gray-600">
      Hundreds of vehicles to fit all tastes and budgets
    </div>
  </div>
  <img src={Landing_Next_Icon} alt="Icon" className="w-10 h-10" />
</button>

<button
  onClick={() => window.location.href = "/car-comparison"}
  className="flex flex-row justify-between items-center w-full bg-white text-[18px] text-black font-semibold py-5 px-6 rounded-lg"
>
  <div className="flex flex-col text-left">
    <div className="font-semibold text-[18px]">Car Comparison Tool</div>
    <div className="hidden text-[15px] text-gray-600">
      Compare existing cars in our car catalog
    </div>
  </div>
  <img src={Landing_Next_Icon} alt="Icon" className="w-10 h-10" />
</button>

          </div>
        </div>
      </div>

      {/* Desktop Buttons (Hidden on Mobile) */}
      <div className="hidden lg:flex w-full max-w-[1500px] mx-auto px-5 mt-[-60px] gap-4 items-center justify-center">
      <button
        onClick={() => window.location.href = "/car-catalog"}
        className="flex flex-row justify-between items-center w-1/2 bg-white text-[20px] text-black font-semibold py-9 px-8 rounded-lg shadow-lg w-[500px]"
      >
        <div className="flex flex-col text-left">
          <div className="font-bold text-[33px]">Browse Electric Cars</div>
          <div className="text-[15px] text-gray-500">
            Hundreds of vehicles to fit all tastes and budgets
          </div>
        </div>
        <img src={Landing_Next_Icon} alt="Icon" className="w-12 h-12" />
      </button>


        <button
          onClick={() => window.location.href = "/car-comparison"}
          className="flex flex-row justify-between items-center w-1/2 bg-white text-[20px] text-black font-semibold py-9 px-8 rounded-lg shadow-lg w-[500px]"
        >
          <div className="flex flex-col text-left">
            <div className="font-bold text-[33px]">Car Comparison Tool</div>
            <div className="text-[15px] text-gray-500">
              Compare existing cars in our car catalog
            </div>
          </div>
          <img src={Landing_Next_Icon} alt="Icon" className="w-12 h-12" />
        </button>

      </div>

      <div className="w-full max-w-[1500px] mx-auto">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:py-5 2xl:px-0 mt-[30px] lg:mt-[20px]">
          {
            currentCars.length > 0 && currentCars.map((car, index) => ( 
            <Car_Block key={index} data={{ [String(car[0])]: car[1] }} onCompare={onCompare} />
          ))}
        </div>

        <div className="flex justify-center mb-4 space-x-2">
          {totalPages > 1 && Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${currentPage === index ? "bg-black" : "bg-gray-400"}`}
              onClick={() => handlePageChange(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;