import Board_img from "../Assets/Board_img.svg";
import Investor_img from "../Assets/Inventory_img.svg";

const Aboutusbodinvestors = () => {
  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-8 2xl:px-0">

      {/* Board of Directors Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Board of Directors</h2>
        <div className="flex flex-wrap justify-center gap-10 px-5">

          {/* Director 1 */}
          <div className="flex flex-col items-center">
            <img src={Board_img} alt="Director 1" className="w-40 h-40 rounded-full mb-4" />
            <h3 className="text-lg font-medium">Director Name Here</h3>
            <p className="text-sm text-gray-500">Board of Director</p>
            <p className="text-sm text-gray-500">CEO & Founder at EVEST Dealership</p>
          </div>

          {/* Director 2 */}
          <div className="flex flex-col items-center">
            <img src={Board_img} alt="Director 2" className="w-40 h-40 rounded-full mb-4" />
            <h3 className="text-lg font-medium">Director Name Here</h3>
            <p className="text-sm text-gray-500">Board of Director</p>
            <p className="text-sm text-gray-500">CEO & Founder at EVEST Dealership</p>
          </div>

          {/* Director 3 */}
          <div className="flex flex-col items-center">
            <img src={Board_img} alt="Director 3" className="w-40 h-40 rounded-full mb-4" />
            <h3 className="text-lg font-medium">Director Name Here</h3>
            <p className="text-sm text-gray-500">Board of Director</p>
            <p className="text-sm text-gray-500">CEO & Founder at EVEST Dealership</p>
          </div>

          {/* Director 4 */}
          <div className="flex flex-col items-center">
            <img src={Board_img} alt="Director 3" className="w-40 h-40 rounded-full mb-4" />
            <h3 className="text-lg font-medium">Director Name Here</h3>
            <p className="text-sm text-gray-500">Board of Director</p>
            <p className="text-sm text-gray-500">CEO & Founder at EVEST Dealership</p>
          </div>

        </div>
      </div>

      {/* Investors Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Our Investors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-5">

          {/* Investor 1 */}
          <img src={Investor_img} alt="Investor 1" className="w-full h-40 object-cover rounded-lg" />

          {/* Investor 2 */}
          <img src={Investor_img} alt="Investor 2" className="w-full h-40 object-cover rounded-lg" />

          {/* Investor 3 */}
          <img src={Investor_img} alt="Investor 3" className="w-full h-40 object-cover rounded-lg" />

          {/* Investor 4 */}
          <img src={Investor_img} alt="Investor 4" className="w-full h-40 object-cover rounded-lg" />

          {/* Investor 5 */}
          <img src={Investor_img} alt="Investor 5" className="w-full h-40 object-cover rounded-lg" />

          {/* Investor 6 */}
          <img src={Investor_img} alt="Investor 6" className="w-full h-40 object-cover rounded-lg" />

        </div>
      </div>
      
    </div>
  );
};

export default Aboutusbodinvestors;
