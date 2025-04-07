import Display_Img from "../Assets/landing_display_img1.svg";

const Aboutuscompanyintro = () => {
  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-8 2xl:px-0 flex flex-col lg:flex-row gap-[10px] md:gap-[50px] mt-[15px]">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-5 md:mb-0 flex flex-col justify-center">
        <h4 className="text-[16px] mb-2">About Us</h4>
        <h2 className="text-[28px] font-semibold mb-4">Driving the Future, Electrifying Manila</h2>
        <p className="mb-4">
          At <span className="font-semibold">EVest Dealership</span>, we are committed to revolutionizing urban mobility by providing
          <span className="font-semibold"> affordable, eco-friendly, and high-quality electric vehicles </span> in Manila. Our mission
          is to make sustainable transportation accessible to everyone, offering the
          <span className="font-semibold"> lowest-priced electric cars </span> without compromising on performance, reliability, or style.
        </p>
        <p className="mb-4">
          We believe in <span className="font-semibold">a greener future</span>—one where innovation meets affordability, and
          where every drive contributes to a cleaner environment. Whether you're looking for
          a compact city EV or a family-friendly electric ride,
          <span className="font-semibold"> EVest Dealership </span> is your trusted partner in making the switch to electric
          <span className="font-semibold"> hassle-free and rewarding</span>.
        </p>
        <p className="">
          As we continue to grow, our commitment remains the same: to
          <span className="font-semibold"> empower Manila with smarter, greener mobility solutions</span>.
        </p>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <img src={Display_Img} alt="Electric Car on a Road" className="rounded-lg md:max-w-[690px]" />
      </div>
    </div>
  );
};

export default Aboutuscompanyintro;
