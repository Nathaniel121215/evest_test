import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultCarImg from "../Assets/Car_Images/missing-car1.png"; // Default Image

const CarBlock = ({ data, onCompare }) => {
  const navigate = useNavigate(); // Initialize navigation
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const carValues = Object.values(data)[0];
  const manufacturer = carValues.manufacturer;
  const model = carValues.model;
  const name = `${manufacturer} ${model}`;
  const engine_power = carValues.engine_power;
  const price = carValues.price;
  const fuel = carValues.fuel;
  const drivetrain = carValues.drivetrain;
  const drivetrain_key = drivetrain.key;
  const drivetrain_value = drivetrain.value;
  const img_obj = carValues.img_src;
  const img_dir = img_obj.directory;
  const img_src = `${img_dir}/main.avif`;
  const reference = String(carValues.reference);

  // Handle navigation to car details
  const handleViewDetails = () => {
    navigate(`/car-view/${carValues.model}`, { state: { car: carValues } });
  };

  // Handle adding to comparison
  const handleCompare = () => {
    onCompare(data);

    let savedCars = localStorage.getItem("selectedCars");
    try {
      savedCars = savedCars ? JSON.parse(savedCars) : {};
    } catch (error) {
      console.error("Error parsing savedCars from localStorage:", error);
      savedCars = {};
    }

    if (savedCars.hasOwnProperty(reference)) {
      setShowPopup(true); // Show popup if car is already in comparison
    } else {
      savedCars[reference] = data[reference];
      localStorage.setItem("selectedCars", JSON.stringify(savedCars));
      navigate("/car-comparison");
    }
  };

  return (
    <div className="relative w-full bg-white shadow-lg rounded-lg overflow-hidden border group">
      {/* Image Section */}
      <div className="relative">
        <img
          src={img_src}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultCarImg; // Default image on error
          }}
          className="w-full h-[220px] object-cover rounded-t-lg mx-auto transition duration-300 ease-in-out group-hover:brightness-50"
        />

        {/* Hover Overlay with Buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
          <button
            onClick={handleCompare}
            className="px-4 py-2 bg-white text-black font-semibold rounded-lg shadow-md mb-2 hover:bg-gray-200"
          >
            ADD TO COMPARE
          </button>
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200"
          >
            VIEW CAR DETAILS
          </button>
        </div>
      </div>

      {/* Car Details Section */}
      <div className="px-4 pb-6">
        <h2 className="text-xl font-bold mt-3">{name}</h2>

        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-600">Model: {model}</p>
          <p className="text-gray-600">Power: {engine_power} HP</p>
        </div>

        <hr className="my-3 border-gray-300" />

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-[24px] font-bold text-green-600 mb-2">
              ₱ {price.toLocaleString()}
            </p>
            <p className="text-[15px] text-gray-600">Fuel Type: {fuel}</p>
            <p className="text-[15px] text-gray-600">
              Drivetrain: {drivetrain_value} ({drivetrain_key})
            </p>
          </div>

          <button className="p-2 rounded-full text-white text-[25px]">
            🛒
          </button>
        </div>
      </div>

            {/* Popup Modal for Duplicate Entry */}
            {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-100 text-center mx-4">
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

export default CarBlock;
