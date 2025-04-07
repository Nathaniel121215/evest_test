import Display_Img from "../Assets/services_display_img.svg";
import Service1 from "../Assets/service_img1.svg";
import Service2 from "../Assets/service_img2.svg";
import Service3 from "../Assets/service_img3.svg";
import ServiceLoan from "../Assets/service_loan_img.svg";
import { FaCheckCircle } from "react-icons/fa";



const FeaturedServices = () => {
  const services = [
    {
      title: "Flexible Financing",
      description: "We offer a range of financing options to make owning an electric vehicle more affordable and hassle-free. Our team works with multiple lenders to ensure you get the best rates possible, helping you drive home your dream EV with ease.",
      icon: <FaCheckCircle style={{ color: "#2A7EF5" }} />,  // Custom blue check
      image: Service3

    },
    {
      title: "Seamless Trade-In",
      description: "Upgrade to an electric car effortlessly with our easy and transparent trade-in process. We offer competitive trade-in valuations to make your transition smoother and stress-free, ensuring you get the best value for your current vehicle.",
      icon: <FaCheckCircle style={{ color: "#2A7EF5" }} />,  // Custom blue check
      image: Service2

    },
    {
      title: "Comprehensive Aftersales",
      description: "From routine maintenance to expert support, we've got your EV covered long after your purchase. Our dedicated service team ensures your vehicle stays in peak condition with certified inspections and warranty-backed repairs.",
      icon: <FaCheckCircle style={{ color: "#2A7EF5" }} />,  // Custom blue check
      image: Service1

    }
];



  return (
    <div className="w-full max-w-[1500px] mx-auto p-6 lg:py-10 2xl:px-4">
      {/* Header Section */}
      <div className="w-full flex flex-col lg:flex-row gap-10 md:gap-16 mt-8">
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h4 className="text-lg mb-3">Our Services</h4>
          <h2 className="text-3xl font-semibold mb-6">Enhancing Your EV Ownership Experience</h2>
          <p className="mb-5 leading-relaxed">
            At <span className="font-semibold">EVest Dealership</span>, we go beyond just <span className="font-semibold">selling electric vehicles</span>. Our suite of services is designed to make your transition to electric driving <span className="font-semibold">smooth, affordable, and rewarding</span>.
          </p>
          <p className="mb-5 leading-relaxed">
            From <span className="font-semibold">flexible financing solutions</span> and <span className="font-semibold">seamless trade-in processes</span> to <span className="font-semibold">comprehensive aftersales support</span> and <span className="font-semibold">warranty coverage</span>, we are here to support you at every step of your EV journey. Your <span className="font-semibold">satisfaction and peace of mind</span> are our priorities.
          </p>
          <p className="mb-5 leading-relaxed">
            Our mission is to ensure that owning an EV is not just an upgrade but a <span className="font-semibold">transformative experience</span>. With our expert guidance, industry-leading resources, and commitment to excellence, we empower you to make informed decisions that enhance your lifestyle and contribute to a greener future.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img src={Display_Img} alt="EV Services" className="rounded-xl md:max-w-[720px] shadow-md" />
        </div>
      </div>
      
      {/* Services Grid */}
      <h2 className="text-3xl font-semibold text-center mt-12 mb-8">Our Key Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-8 border border-gray-200 transition-transform transform hover:scale-105">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
              <span className="text-2xl text-gray-700">{service.icon}</span>
            </div>
            <p className="text-gray-600 mt-4 leading-relaxed">{service.description}</p>
            <img src={service.image} alt={service.title} className="mt-6 w-full rounded-lg shadow-sm" />
          </div>
        ))}
      </div>
      
      {/* Loan Calculator Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-8 rounded-xl mt-16">
        <img src={ServiceLoan} alt="Loan Calculator" className="w-full max-w-[700px] rounded-lg" />
        <div className="md:ml-12 text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-3xl font-semibold text-gray-900">Not sure of your budget?</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">
            Check out our loan calculator to estimate your monthly or biweekly payments. Get a clear understanding of your financing options and plan your EV purchase with confidence.
          </p>
          <a href="/loan-calculator">
            <button className="mt-5 bg-[#2A7EF5] text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition-all">
              View Calculator
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;