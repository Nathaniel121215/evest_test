import Display_Img from "../Assets/landing_display_img3.svg";

const Aboutuscompanystory = () => {
  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-8 2xl:px-0 flex flex-col lg:flex-row-reverse gap-[10px] md:gap-[50px] mt-[15px]">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-5 md:mb-0 flex flex-col justify-center">
        <h4 className="text-[16px] mb-2">Our Story</h4>
        <h2 className="text-[28px] font-semibold mb-4">Powering a Greener Tomorrow: The EVest Dealership Journey</h2>
        <p className="mb-4">
          At <span className="font-semibold">EVest Dealership</span>, our journey began with a simple yet powerful vision:
          <span className="font-semibold"> to make electric vehicles (EVs) accessible to everyone in Manila.</span>
          As fuel prices soared and environmental concerns grew, we saw an opportunity to offer
          <span className="font-semibold"> a sustainable, cost-effective alternative to traditional cars.</span>
        </p>
        <p className="mb-4">
          Driven by a passion for <span className="font-semibold">innovation and sustainability</span>, we set out to bring
          <span className="font-semibold"> affordable, high-quality electric cars </span> to everyday drivers, families, and businesses.
          We believe that transitioning to electric should be easy, practical, and rewarding—without the hefty price tag.
        </p>
        <p className="">
          Today, <span className="font-semibold">EVest Dealership</span> stands as a trusted name in the EV market, providing
          <span className="font-semibold"> budget-friendly, reliable, and eco-conscious vehicle options.</span>
        </p>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center lg:justify-start">
        <img src={Display_Img} alt="Electric Car Charging" className="rounded-lg md:max-w-[690px]" />
      </div>
    </div>
  );
};

export default Aboutuscompanystory;
