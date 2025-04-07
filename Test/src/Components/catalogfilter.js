import { useState, useEffect } from "react";
import Car_Block from "../Components/carblock";
import { CARDATA } from "../cardata";

import Select from "react-select";
import ReactSlider from "react-slider";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";
// Custom Option Component with Styled Checkbox
const CustomOption = (props) => {

  const { data, isSelected, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center px-3 py-2 cursor-pointer rounded-md ${
        isSelected ? "text-black" : "hover:bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-5 h-5 flex justify-center items-center border-2 ${
          isSelected ? "border-gray-400" : "border-gray-400"
        } rounded-md`}
      >
        {isSelected && (
          <svg
            className="w-4 h-4 text-[#3084F4]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className={`ml-2 ${isSelected ? "text-black" : "text-gray-700"}`}>
        {data.label}
      </span>
    </div>
  );
};

const Catalogfilter = ({onCompare}) => {
  const location = useLocation();
  const carPrice = location.state?.price
  useEffect(() => {
    if (carPrice !== undefined) {
      console.log("value", carPrice);
    }
  }, [carPrice]);


  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const [selected, setSelected] = useState([]);

  const options = ["Door Count", "Seat Count", "Car Type", "Drive Train"];
  
  
  const toggleDropdown = () => {
  setIsOpen3(!isOpen3);
  setIsOpen(false);
  setIsOpen2(false);
};

const toggletypeofcars = () => {
  setIsOpen(!isOpen);
  setIsOpen2(false);
  setIsOpen3(false);
};

const toggledrivetrain = () => {
  setIsOpen2(!isOpen2);
  setIsOpen(false);
  setIsOpen3(false);
};

const [isDoorCountVisible, setIsDoorCountVisible] = useState(false);
const [isSeatCountVisible, setIsSeatCountVisible] = useState(false);
const [isCarTypeVisible, setIsCarTypeVisible] = useState(false);
const [isDriveTrainVisible, setIsDriveTrainVisible] = useState(false);

const handleCheckboxChange = (category) => {
  setSelected((prev) =>
    prev.includes(category)
      ? prev.filter((item) => item !== category)
      : [...prev, category]
  );

  switch (category) {
    case "Door Count":
      setIsDoorCountVisible(!isDoorCountVisible);
      break;
    case "Seat Count":
      setIsSeatCountVisible(!isSeatCountVisible);
      break;
    case "Car Type":
      setIsCarTypeVisible(!isCarTypeVisible);
      break;
    case "Drive Train":
      setIsDriveTrainVisible(!isDriveTrainVisible);
      break;
    default:
      break;
  }
};
  
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 6 : 12); // Mobile: 6, Desktop: 12
    };

    updateItemsPerPage(); // Set initial value
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  let apiData = CARDATA() || {};
  let data = {};
  if (typeof apiData === "object" && !Array.isArray(apiData)) {
    data = Object.entries(apiData);
  }

  // console.log("Catalog Filter Data: ", data);

  // Get unique values for brand, car type, and drivetrain
  const uniqueBrands = [...new Set(data.map((car) => car[1].manufacturer))].map(
    (brand) => ({ value: brand, label: brand })
  );

  // console.log("Unique Brands: ", uniqueBrands);

  const uniqueCarTypes = [...new Set(data.map((car) => car[1].type))];

  // console.log("Unique Car Types: ", uniqueCarTypes);

  const uniqueDrivetrains = [...new Set(data.map((car) => car[1].drivetrain.value))];

  // console.log("Unique Drivetrains: ", uniqueDrivetrains);

  const batteries = data?.map((car) => car[1].battery_pack) || [];
  const prices = data?.map((car) => car[1].price) || [];
  const ranges = data?.map((car) => car[1].drive_range) || [];
  const cardoors = data?.map((car) => car[1].door_count) || [];
  const seatcounts = data?.map((car) => car[1].seat_count) || [];
  
  const minBattery = batteries.length > 0 ? Math.min(...batteries) : null;
  const maxBattery = batteries.length > 0 ? Math.max(...batteries) : null;
  
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : null;
  
  const minRange = ranges.length > 0 ? Math.min(...ranges) : null;
  const maxRange = ranges.length > 0 ? Math.max(...ranges) : null;
  
  const minCardoor = cardoors.length > 0 ? Math.min(...cardoors) : null;
  const maxCardoor = cardoors.length > 0 ? Math.max(...cardoors) : null;
  
  const minSeatcount = seatcounts.length > 0 ? Math.min(...seatcounts) : null;
  const maxSeatcount = seatcounts.length > 0 ? Math.max(...seatcounts) : null;
  
  // Default states
  const [battery, setBattery] = useState([0, 0]);
  const [price, setPrice] = useState([0.0, 0.0]);
  const [range, setRange] = useState([0]); // Assuming range has a min/max
  const [cardoor, setCardoor] = useState([0]);
  const [seatcount, setSeatcount] = useState([0]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  // Update state when min/max values are available
  useEffect(() => {
    if (minBattery !== null && maxBattery !== null) setBattery([minBattery, maxBattery]);
    if (minPrice !== null && maxPrice !== null) setPrice([minPrice, carPrice !== undefined ? carPrice : maxPrice]);    if (minRange !== null && maxRange !== null) setRange([minRange]);
    if (minCardoor !== null && maxCardoor !== null) setCardoor([minCardoor]);
    if (minSeatcount !== null && maxSeatcount !== null) setSeatcount([minSeatcount]);
  }, [minBattery, maxBattery, minPrice, maxPrice, minRange, maxRange, minCardoor, maxCardoor, minSeatcount, maxSeatcount]);
  
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Filter data based on selected filters
const filteredData = data
.filter((car) => {
  if (selectedOptions.length === 0) return true;
  return selectedOptions.some((option) => car[1].manufacturer === option.value);
})
.filter((car) => car[1].battery_pack >= battery[0] && car[1].battery_pack <= battery[1])
.filter((car) => car[1].price >= price[0] && car[1].price <= price[1])
.filter((car) => car[1].drive_range >= range)
.filter((car) => car[1].door_count >= cardoor)
.filter((car) => car[1].seat_count >= seatcount)
.filter((car) => {
  if (selected.filter((item) => uniqueCarTypes.includes(item)).length === 0) return true;
  return selected.includes(car[1].type);
}) // Filter by car type only if selected
.filter((car) => {
  if (selected.filter((item) => uniqueDrivetrains.includes(item)).length === 0) return true;
  return selected.includes(car[1].drivetrain.value);
}); // Filter by drivetrain only if selected


    

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage)); // Ensure at least 1 page
  const currentCars = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // console.log("catalogfilter.js Current Cars: ", currentCars);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  

  return (
    <div className="w-full max-w-[1500px] mx-auto">
      <div className="flex flex-col lg:flex-row items-start w-full mt-3">
        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full p-4 lg:py-5 2xl:px-0">
          {/* Brands Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-[15px]">
              Brands
            </label>
            <Select
              options={uniqueBrands}
              isMulti
              value={selectedOptions}
              onChange={handleChange}
              closeMenuOnSelect={false}
              hideSelectedOptions={true}
              className="text-sm"
              components={{ Option: CustomOption }}
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: "#A4A7B5",
                  boxShadow: state.isFocused ? "0 0 0 1px #A4A7B5" : "none",
                  "&:hover": { borderColor: "#A4A7B5" },
                }),
                menu: (base) => ({
                  ...base,
                  border: "1px solid #A4A7B5",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  borderRadius: "6px",
                  zIndex:20,
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#3084F4",
                  color: "white",
                  borderRadius: "4px",
                  padding: "2px 6px",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white",
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "white",
                  ":hover": {
                    backgroundColor: "#2063C6",
                  },
                }),
              }}
            />
          </div>

          {/* Battery Pack Capacity Slider */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-[15px]">
              Battery Pack Capacity
            </label>
            <div className="border border-[#A4A7B5] rounded-[4px] px-4 py-[7px] text-gray-700 text-center font-medium text-[15px]">
              {battery[0]} kWh - {battery[1]} kWh
            </div>
            <ReactSlider
              className="mt-3 h-2 bg-gray-300 rounded-full relative"
              thumbClassName="w-5 h-5 bg-white border-2 border-[#3084F4] rounded-full cursor-pointer 
                        absolute -top-2 transform translate-y-[3px] z-10"
              renderTrack={(props, state) => (
                <div
                  {...props}
                  className={`h-2 rounded-full ml-1 ${
                    state.index === 1 ? "bg-[#3084F4]" : "bg-gray-300"
                  }`}
                />
              )}
              min={minBattery}
              max={maxBattery}
              step={0.1}
              value={battery}
              onChange={setBattery}
              pearling
            />
          </div>

          {/* Price Slider */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-[15px]">
              Price
            </label>
            <div className="border border-[#A4A7B5] rounded-[4px] px-4 py-[7px] text-gray-700 text-center font-medium text-[15px]">
              ₱{" "}
              {` ${new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              })
                .format(price[0])
                .replace("₱", "")
                .trim()}`}{" "}
              - ₱{" "}
              {` ${new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              })
                .format(price[1])
                .replace("₱", "")
                .trim()}`}
            </div>
            <ReactSlider
              className="mt-3 h-2 bg-gray-300 rounded-full relative"
              thumbClassName="w-5 h-5 bg-white border-2 border-[#3084F4] rounded-full cursor-pointer 
                        absolute -top-2 transform translate-y-[3px] z-10"
              renderTrack={(props, state) => (
                <div
                  {...props}
                  className={`h-2 rounded-full ml-1 ${
                    state.index === 1 ? "bg-[#3084F4]" : "bg-gray-300"
                  }`}
                />
              )}
              min={minPrice}
              max={maxPrice}
              step={1}
              value={price}
              onChange={setPrice}
              pearling
            />
          </div>

          {/* Range (Single Full Charge) Slider */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-[15px]">
              Range (Single Full Charge)
            </label>
            <div className="border border-[#A4A7B5] rounded-[4px] px-4 py-[7px] text-gray-700 text-center font-medium text-[15px]">
              {range} km
            </div>
            <ReactSlider
              className="mt-3 h-2 bg-gray-300 rounded-full relative"
              thumbClassName="w-5 h-5 bg-white border-2 border-[#3084F4] rounded-full cursor-pointer 
                        absolute -top-2 transform translate-y-[3px] z-10"
              renderTrack={(props, state) => (
                <div
                  {...props}
                  className={`h-2 rounded-full ${
                    state.index === 0 ? "bg-[#3084F4]" : "bg-gray-300"
                  }`}
                />
              )}
              min={minRange}
              max={maxRange}
              step={0.1}
              value={range}
              onChange={(val) => setRange(val)} // Single value instead of array
              pearling
            />
          </div>


          {isDoorCountVisible && (
  <div>
    <label className="block text-gray-700 font-medium mb-2 text-[15px]">
      Door Count
    </label>
    <div className="border border-[#A4A7B5] rounded-[4px] px-4 py-[7px] text-gray-700 text-center font-medium text-[15px]">
      {cardoor} Doors
    </div>
    <ReactSlider
      className="mt-3 h-2 bg-gray-300 rounded-full relative"
      thumbClassName="w-5 h-5 bg-white border-2 border-[#3084F4] rounded-full cursor-pointer 
        absolute -top-2 transform translate-y-[3px] z-10"
      renderTrack={(props, state) => (
        <div
          {...props}
          className={`h-2 rounded-full ${
            state.index === 0 ? "bg-[#3084F4]" : "bg-gray-300"
          }`}
        />
      )}
      min={minCardoor}
      max={maxCardoor}
      step={1}
      value={cardoor}
      onChange={(val) => setCardoor(val)}
      pearling
    />
  </div>
)}


{isSeatCountVisible && (
  <div>
    <label className="block text-gray-700 font-medium mb-2 text-[15px]">
      Seat Count
    </label>
    <div className="border border-[#A4A7B5] rounded-[4px] px-4 py-[7px] text-gray-700 text-center font-medium text-[15px]">
      {seatcount} Seats
    </div>
    <ReactSlider
      className="mt-3 h-2 bg-gray-300 rounded-full relative"
      thumbClassName="w-5 h-5 bg-white border-2 border-[#3084F4] rounded-full cursor-pointer 
        absolute -top-2 transform translate-y-[3px] z-10"
      renderTrack={(props, state) => (
        <div
          {...props}
          className={`h-2 rounded-full ${
            state.index === 0 ? "bg-[#3084F4]" : "bg-gray-300"
          }`}
        />
      )}
      min={minSeatcount}
      max={maxSeatcount}
      step={1}
      value={seatcount}
      onChange={(val) => setSeatcount(val)}
      pearling
    />
  </div>
)}


{isCarTypeVisible && (
  <div className="relative">
    <button
      className="flex items-center justify-between w-full font-semibold text-lg bg-white"
      onClick={toggletypeofcars}
    >
      <span className="text-gray-700 font-medium text-[15px]">Car Type</span>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && (
      <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md border border-gray-300 z-10 mt-[10px] md:mt-[-50px]">
        {uniqueCarTypes.map((typeofcars) => (
          <li
            key={typeofcars}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 text-[13px]"
            onClick={() => handleCheckboxChange(typeofcars)}
          >
            <div
              className={`w-5 h-5 flex justify-center items-center border-2 rounded-md ${
                selected.includes(typeofcars) ? "border-[#3084F4]" : "border-gray-400"
              }`}
            >
              {selected.includes(typeofcars) && (
                <svg
                  className="w-4 h-4 text-[#3084F4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-gray-700">{typeofcars}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
)}

{isDriveTrainVisible && (
  <div className="relative">
    <button
      className="flex items-center justify-between w-full font-semibold text-lg bg-white"
      onClick={toggledrivetrain}
    >
      <span className="text-gray-700 font-medium text-[15px]">Drive Train</span>
      {isOpen2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen2 && (
      <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md border border-gray-300 z-10 mt-[10px] md:mt-[-50px]">
        {uniqueDrivetrains.map((drivetrain, index) => (
          <li
            key={index}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 text-[13px]"
            onClick={() => handleCheckboxChange(drivetrain)}
          >
            <div
              className={`w-5 h-5 flex justify-center items-center border-2 rounded-md ${
                selected.includes(drivetrain) ? "border-[#3084F4]" : "border-gray-400"
              }`}
            >
              {selected.includes(drivetrain) && (
                <svg
                  className="w-4 h-4 text-[#3084F4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-gray-700">{drivetrain}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
)}

        </div>

        <div className="relative flex justify-center items-center p-4 lg:py-5 2xl:px-0 2xl:ml-4 ">
      {/* Filter Button */}
      <button
        onClick={toggleDropdown}
        className="p-3 rounded-full bg-[#3084F4] hover:bg-[#2063C6] text-white shadow-lg transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4h18M5 12h14m-7 8h7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen3 && (
        <ul className="absolute ml-4 top-full left-0 md:left-auto md:right-0 bg-white shadow-lg rounded-md border border-gray-300 z-10 lg:mt-[-10px] w-48">
        {options.map((option) => (
            <li
              key={option}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 text-[14px]"
              onClick={() => handleCheckboxChange(option)}
            >
              {/* Custom Checkbox */}
              <div
                className={`w-5 h-5 flex justify-center items-center border-2 rounded-md ${
                  selected.includes(option) ? "border-[#3084F4]" : "border-gray-400"
                }`}
              >
                {selected.includes(option) && (
                  <svg
                    className="w-4 h-4 text-[#3084F4]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-gray-700">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
        
      </div>

      {/* Car Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:py-5 2xl:px-0">
  {currentCars.map((car, index) => (
    <Car_Block key={index} data={{ [String(car[0])]: car[1] }} onCompare={onCompare} />
  ))}
</div>

      {/* Numbered Pagination (Always Visible) */}
      <div className="flex justify-center my-2 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md transition ${
              currentPage === index
                ? "bg-[#2A7EF5] text-white font-semibold"
                : "bg-gray-300 hover:bg-gray-400 font-semibold"
            }`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Catalogfilter;