import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const AccordionItem = ({ title, isOpen, onClick, children }) => (
  <div className="border-b border-gray-300">
    <button
      onClick={onClick}
      className="text-[16px] w-full text-left flex justify-between items-center px-5 py-4 font-semibold text-gray-900 hover:bg-gray-100 transition duration-300"
    >
      {title}
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    {isOpen && <div className="px-5 py-3 bg-gray-50 text-gray-700">{children}</div>}
  </div>
);

const FaqCategory = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    "General",
    "Financing",
    "Sell or Trade",
    "Buying",
    "Warranties",
    "Deliveries",
    "Car Loan",
  ];

  const faqData = {
    General: [
      { question: "Why should I switch to an electric vehicle?", answer: "EVs are eco-friendly, cost-effective, and require less maintenance." },
      { question: "How much does an electric car cost at EVest?", answer: "Our prices vary based on the model, but we offer competitive pricing with financing options available." },
      { question: "Does EVest offer test drives?", answer: "Yes! You can schedule a test drive at any of our EVest locations to experience electric driving firsthand." },
      { question: "What is the range of your electric vehicles?", answer: "Our EVs offer ranges between 250 to 500 km per charge, depending on the model." },
      { question: "Does EVest provide charging solutions?", answer: "Yes, we offer home charging station installations and guide you on public charging station locations." },
    ],
  
    Financing: [
      { question: "What financing options does EVest offer?", answer: "We offer flexible financing plans, including low-interest loans and leasing options." },
      { question: "Can I trade in my current vehicle for an EV?", answer: "Yes! We accept trade-ins and offer fair market value assessments." },
      { question: "Are there government incentives for buying an electric car?", answer: "Yes, various tax credits and rebates are available for EV buyers depending on your location." },
    ],
  
    "Sell or Trade": [
      { question: "How does the trade-in process work at EVest?", answer: "Bring your car for an appraisal, and we'll offer a competitive trade-in value towards your new EV." },
      { question: "Can I sell my gas-powered car to EVest?", answer: "Yes, we accept both gas-powered and electric vehicles for trade-ins." },
      { question: "What factors affect my car’s trade-in value?", answer: "Condition, mileage, model year, and market demand determine the trade-in value." },
    ],
  
    Buying: [
      { question: "What should I consider when buying an electric vehicle?", answer: "Consider range, charging options, battery life, and available incentives before purchasing." },
      { question: "How do I reserve a vehicle at EVest?", answer: "You can reserve a vehicle online or visit our showroom to place an order." },
      { question: "Can I customize my EV before purchase?", answer: "Yes, we offer customization options, including color, interior finishes, and additional features." },
    ],
  
    Warranties: [
      { question: "What warranty coverage does EVest offer?", answer: "We offer a standard 5-year vehicle warranty and an 8-year battery warranty." },
      { question: "Is the EV battery covered under warranty?", answer: "Yes, our EV batteries come with an 8-year or 160,000 km warranty, whichever comes first." },
      { question: "Can I purchase an extended warranty?", answer: "Yes, extended warranty packages are available for additional coverage and peace of mind." },
    ],
  
    Deliveries: [
      { question: "Does EVest offer home delivery for purchased EVs?", answer: "Yes, we provide doorstep delivery services for online and showroom purchases." },
      { question: "How long does delivery take after purchasing?", answer: "Delivery times range from 5-10 business days, depending on your location." },
      { question: "Can I track my vehicle’s delivery?", answer: "Yes, we provide real-time tracking for all deliveries to keep you updated." },
    ],
  
    "Car Loan": [
      { question: "Does EVest assist with car loans?", answer: "Yes, we work with various banks and lenders to offer competitive car loan options." },
      { question: "What credit score is required for an EV loan?", answer: "Loan approval depends on your credit score, but we offer options for a range of credit profiles." },
      { question: "Can I refinance my EV loan later?", answer: "Yes, we provide refinancing options to help lower your interest rate or monthly payments." },
    ],
  };
  

  return (
    <div className="">
      {/* View By Topics */}
      <div className="bg-[#F6F9FC]">
        <div className="w-full max-w-[1500px] mx-auto p-4 2xl:px-0 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">VIEW BY TOPICS</h2>
          <div className="flex flex-wrap justify-center gap-5 max-w-[900px] mx-auto">
  {categories.map((category) => (
    <button
      key={category}
      className={`px-5 py-3 rounded-lg shadow-md border border-gray-300 text-gray-800 transition duration-300 md:w-[180px] w-[150px] text-center ${
        activeCategory === category ? "bg-gray-200" : "bg-white"
      }`}
      onClick={() => {
        setActiveCategory(category);
        setOpenIndex(null);
      }}
    >
      {category}
    </button>
  ))}
</div>

        </div>

      </div>
      

      {/* FAQ Section */}
      <div className="w-full max-w-[1500px] mx-auto p-4 2xl:px-0 mt-[20px]">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{activeCategory.toUpperCase()}</h2>
        <div className="border-t border-gray-300">
          {faqData[activeCategory]?.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.question}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.answer}
            </AccordionItem>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default FaqCategory;