import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CarIcon from "../Assets/compare_car_icon.svg";
import CatalogFilter from "./catalogfilter";
import defaultCarImg from "../Assets/Car_Images/missing-car1.png"; // Import default image

const CompareTool = () => {
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCars, setSelectedCars] = useState(() => {
    // Load initial state from local storage
    const savedCars = localStorage.getItem('selectedCars');
    return savedCars ? JSON.parse(savedCars) : {};
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedCars = localStorage.getItem("selectedCars");
    if (savedCars) {
      try {
        const parsedCars = JSON.parse(savedCars);
        setSelectedCars(parsedCars && typeof parsedCars === 'object' ? parsedCars : {});
      } catch (error) {
        console.error("Error parsing selectedCars from localStorage:", error);
        setSelectedCars({}); 
      }
    } else {
      setSelectedCars({}); 
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCompare = (carData) => {
    const car = Object.values(carData)[0];
    if (!car || !car.reference) {
      alert("Invalid car data.");
      return;
    }

    let savedCars = localStorage.getItem('selectedCars');

    if (!savedCars || savedCars.length === 0) {
      savedCars = {};
    } else {
      try {
        savedCars = JSON.parse(savedCars);
      } catch (error) {
        console.error("Error parsing savedCars from localStorage:", error);
        savedCars = {};
      }
    }

    if (savedCars[car.reference]) {
      setShowPopup(true); // Show popup if car is already in comparison
    } else {
      savedCars[car.reference] = car;
      localStorage.setItem('selectedCars', JSON.stringify(savedCars));
      setSelectedCars(savedCars);
    }

    closeModal();
  };

  const handleLearnMore = (car) => {
    navigate(`/car-view/${car.model}`, { state: { car } });
  };

  const removeCar = (reference) => {
    setSelectedCars((prevCars) => {
      const updatedCars = { ...prevCars };
      delete updatedCars[reference];
      localStorage.setItem('selectedCars', JSON.stringify(updatedCars));
      return updatedCars;
    });
  };

  const selectedCarsArray = Object.entries(selectedCars);

  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-7 2xl:px-0">
      <div className="bg-white rounded-lg shadow-md">
        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-separate border border-spacing-0 border-gray-300 min-w-[500px] md:min-w-[1200px]">
            <thead>
              <tr className="">
                <td className="p-4 border min-w-[300px] md:min-w-[350px] bg-white sticky left-0 z-20 hidden md:table-cell"></td>
                {selectedCarsArray.map(([reference, car], index) => (
                  <td key={index} className="p-4 border text-center min-w-[230px] md:min-w-[350px] relative">
                    <button
                      onClick={() => removeCar(reference)}
                      className="text-[18px] absolute top-2 right-2 bg-black hover:bg-gray-300 text-white hover:text-red-700 w-7 h-7 flex items-center justify-center rounded-full"
                    >
                      &times;
                    </button>
                    <div key={index} className="w-full">
                      <img
                        src={car.img_src ? car.img_src.directory + "/main.avif" : defaultCarImg}
                        alt={car.model}
                        className={`w-full h-full object-cover rounded-lg max-h-[200px] mb-2`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultCarImg;
                        }}
                      />
                    </div>
                    <p className="font-semibold">{car.manufacturer} {car.model}</p>
                    <button onClick={() => handleLearnMore(car)} className="mt-3 text-black font-semibold border border-gray-300 border-2 px-4 md:py-2 py-[8px] rounded-lg w-full text-[14px] md:text-[17px]">Learn More</button>
                    <button onClick={openModal} className="mt-2 bg-[#2A7EF5] text-white font-semibold px-4 md:py-2 py-[8px] rounded-lg w-full text-[14px] md:text-[17px]">Get Car Now</button>
                  </td>
                ))}
                {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
                  <td key={index} className="border text-center min-w-[230px] md:min-w-[350px] px-10 py-[55px]">
                    <img src={CarIcon} alt="Add Car" className="mb-4 w-25 mx-auto" />
                    <p>You can still add another car for comparison</p>
                    <button onClick={openModal} className="mt-3 bg-black text-white px-4 md:py-2 py-[8px] rounded-lg w-full font-semibold text-[14px] md:text-[17px]">Add</button>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              
            {selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Manufacturer</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Manufacturer</div>
        <div className="text-[13px] md:text-[15px]">{car.manufacturer}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Model</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Model</div>
        <div className="text-[13px] md:text-[15px]">{car.model}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Price</td>
    {selectedCarsArray.map(([reference, car], index) => {
      const minPrice = Math.min(...selectedCarsArray.map(([_, car]) => car.price || Infinity));
      const priceColor = car.price === minPrice ? '#2A7EF5' : '#E90000';
      return (
        <td key={index} className="px-4 py-2 border w-[250px]" style={{ color: priceColor }}>
          <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Price</div>
          <div className="text-[13px] md:text-[15px]">{car.price !== undefined ? `₱${car.price.toLocaleString()}` : 'N/A'}</div>
        </td>
      );
    })}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Range</td>
    {selectedCarsArray.map(([reference, car], index) => {
      const maxRange = Math.max(...selectedCarsArray.map(([_, car]) => car.drive_range || 0));
      const rangeColor = car.drive_range === maxRange ? '#2A7EF5' : '#E90000';
      return (
        <td key={index} className="px-4 py-2 border w-[250px]" style={{ color: rangeColor }}>
          <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Range</div>
          <div className="text-[13px] md:text-[15px]">{car.drive_range !== undefined ? `${car.drive_range} km` : 'N/A'}</div>
        </td>
      );
    })}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Power</td>
    {selectedCarsArray.map(([reference, car], index) => {
      const maxPower = Math.max(...selectedCarsArray.map(([_, car]) => car.engine_power || 0));
      const powerColor = car.engine_power === maxPower ? '#2A7EF5' : '#E90000';
      return (
        <td key={index} className="px-4 py-2 border w-[250px]" style={{ color: powerColor }}>
          <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Power</div>
          <div className="text-[13px] md:text-[15px]">{car.engine_power !== undefined ? `${car.engine_power} hp` : 'N/A'}</div>
        </td>
      );
    })}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Battery Pack</td>
    {selectedCarsArray.map(([reference, car], index) => {
      const maxBattery = Math.max(...selectedCarsArray.map(([_, car]) => car.battery_pack || 0));
      const batteryColor = car.battery_pack === maxBattery ? '#2A7EF5' : '#E90000';
      return (
        <td key={index} className="px-4 py-2 border w-[250px]" style={{ color: batteryColor }}>
          <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Battery Pack</div>
          <div className="text-[13px] md:text-[15px]">{car.battery_pack !== undefined ? `${car.battery_pack} kWh` : 'N/A'}</div>
        </td>
      );
    })}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Fuel</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Fuel</div>
        <div className="text-[13px] md:text-[15px]">{car.fuel || 'N/A'}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Number of Seats</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Number of Seats</div>
        <div className="text-[13px] md:text-[15px]">{car.seat_count !== undefined ? `${car.seat_count} seats` : 'N/A'}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Gearbox</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Gearbox</div>
        <div className="text-[13px] md:text-[15px]">{car.transmission || 'N/A'}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Doors</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Doors</div>
        <div className="text-[13px] md:text-[15px]">{car.door_count !== undefined ? `${car.door_count} doors` : 'N/A'}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Drive Train</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Drive Train</div>
        <div className="text-[13px] md:text-[15px]">{car.drivetrain ? car.drivetrain.value : 'N/A'}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 0) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Vehicle Type</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Vehicle Type</div>
        <div className="text-[13px] md:text-[15px]">{car.type || 'N/A'}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}

{selectedCarsArray.length > 0 && (
  <tr>
    <td className="p-4 border w-[200px] bg-white sticky left-0 z-20 font-semibold hidden md:table-cell">Reference ID</td>
    {selectedCarsArray.map(([reference, car], index) => (
      <td key={index} className="px-4 py-2 border w-[250px]">
        <div className="text-[14px] font-semibold text-black mb-1 md:hidden">Reference ID</div>
        <div className="text-[13px] md:text-[15px]">{reference}</div>
      </td>
    ))}
    {Array.from({ length: Math.max(3 - selectedCarsArray.length, 1) }).map((_, index) => (
      <td key={index} className="p-4 border w-[250px]"></td>
    ))}
  </tr>
)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" m-5 p-4 rounded-lg shadow-lg w-full max-w-[1500px] relative bg-white">
            <button onClick={closeModal} className="absolute w-8 h-8 top-1 right-3 text-gray-600 hover:text-gray-900 text-2xl flex items-center justify-center bg-white">
              &times;
            </button>
            <div className="overflow-y-auto max-h-[90vh] w-full mt-5 bg-white">
              <CatalogFilter onCompare={handleCompare} />
            </div>
          </div>
        </div>
      )}

      {/* Popup Modal for Duplicate Entry */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" p-6 rounded-lg shadow-lg z-50 w-100 text-center mx-4 bg-white">
            <h2 className="text-lg font-semibold text-red-600">
              Car Already in Comparison
            </h2>
            <p className="text-gray-700 mt-2">
              This vehicle has already been added for comparison.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CompareTool;