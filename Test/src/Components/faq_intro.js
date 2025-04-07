import Display_Img from "../Assets/faq_display_img.svg";

const FaqIntro = () => {
  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-8 2xl:px-0 flex flex-col lg:flex-row gap-[10px] md:gap-[50px] mt-[15px]">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-5 md:mb-0 flex flex-col justify-center">
        <h4 className="text-[16px] mb-2">Frequently Asked Questions</h4>
        <h2 className="text-[28px] font-semibold mb-4">GET YOUR QUESTION ANSWERED</h2>
        <p className="mb-4">
          At <span className="font-semibold">EVest Dealership</span>, we know that making the switch to an electric vehicle (EV) is an exciting step toward a <span className="font-semibold">sustainable and cost-effective driving experience</span>. However, we also understand that you may have questions about <span className="font-semibold">affordability, charging, maintenance, performance, and more</span> before making your decision. That’s why we’ve put together this <span className="font-semibold">comprehensive FAQ section</span> to address the most common inquiries from our customers.
        </p>
        <p className="mb-4">
          Whether you’re wondering about the <span className="font-semibold">charging infrastructure in Manila</span>, the <span className="font-semibold">benefits of electric cars</span>, or how much you can save in <span className="font-semibold">fuel and maintenance costs</span>, we’ve got you covered. Our goal is to provide <span className="font-semibold">clear, reliable answers</span> so you can make an informed and confident choice when purchasing your EV.
        </p>
        <p className="">
          If you don’t find the answer to your question here, don’t worry! Our team of <span className="font-semibold">EV specialists is always ready to assist you</span>. Feel free to contact us anytime, and we’ll be happy to guide you through the process of owning your very own <span className="font-semibold">affordable, eco-friendly electric vehicle</span>.
        </p>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <img src={Display_Img} alt="Electric Car on a Road" className="rounded-lg md:max-w-[690px]" />
      </div>
    </div>
  );
};

export default FaqIntro;
