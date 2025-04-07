import Nav_Block1 from "../Assets/Nav_Block_Images/Nav_Block1.svg";
import Nav_Block2 from "../Assets/Nav_Block_Images/Nav_Block2.svg";
import Nav_Block3 from "../Assets/Nav_Block_Images/Nav_Block3.svg";
import Nav_Block4 from "../Assets/Nav_Block_Images/Nav_Block4.svg";

const Navblock = () => {
  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-5 2xl:px-[80px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Box 1 */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
          <img src={Nav_Block4} alt="Nav Block 1" className="w-full h-auto object-contain brightness-75" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-[10px] md:px-[50px] text-center ">
            <h2 className="text-[19px] lg:text-[25px] font-bold">FINANCING / LOAN CALCULATION</h2>
            <p className="text-[15px] lg:text-[20px] font-medium">Our agents will be able to assist you about your financing
            questions and calculation.</p>
            <a href="/loan-calculator">
              <button
                className="text-[16px] lg:text-[18px] mt-4 bg-white text-black font-semibold py-2 px-5 md:px-8 rounded-[30px]"
              >
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* Box 2 */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
          <img src={Nav_Block3} alt="Nav Block 1" className="w-full h-auto object-contain brightness-75" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-[10px] md:px-[50px] text-center ">
            <h2 className="text-[19px] lg:text-[25px] font-bold">CAR COMPARISON TOOL</h2>
            <p className="text-[15px] lg:text-[20px] font-medium">Use the car comparison tool to help find the 
            suitable car for you.</p>
            <a href="/car-comparison">
              <button
                className="text-[16px] lg:text-[18px] mt-4 bg-white text-black font-semibold py-2 px-5 md:px-8 rounded-[30px]"
              >
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* Box 3 */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
          <img src={Nav_Block2} alt="Nav Block 1" className="w-full h-auto object-contain brightness-75" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-[10px] md:px-[50px] text-center ">
            <h2 className="text-[19px] lg:text-[25px] font-bold">SERVICES THAT WE OFFER</h2>
            <p className="text-[15px] lg:text-[20px] font-medium">Learn more about what are the services EVest Dealership provides.</p>
            <a href="/services">
              <button
                className="text-[16px] lg:text-[18px] mt-4 bg-white text-black font-semibold py-2 px-5 md:px-8 rounded-[30px]"
              >
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* Box 4 */}
        <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
          <img src={Nav_Block1} alt="Nav Block 1" className="w-full h-auto object-contain brightness-75" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-[10px] md:px-[50px] text-center ">
            <h2 className="text-[19px] lg:text-[25px] font-bold">BROWSE CAR CATALOG</h2>
            <p className="text-[15px] lg:text-[20px] font-medium">EVest Dealership will be happy to assist you in finding your ideal electric car.</p>
            <a href="/car-catalog">
              <button
                className="text-[16px] lg:text-[18px] mt-4 bg-white text-black font-semibold py-2 px-5 md:px-8 rounded-[30px]"
              >
                Learn More
              </button>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navblock;
