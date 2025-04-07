import { Link } from "react-router-dom";
import { useEffect } from "react";
import Facebook_Icon from "../Assets/Footer_Images/facebook_Icon.svg";
import Twitter_Icon from "../Assets/Footer_Images/Twitter_Icon.svg";
import Instagram_Icon from "../Assets/Footer_Images/Instagram_Icon.svg";
import Youtube_Icon from "../Assets/Footer_Images/Youtube_Icon2.svg";

const Footer = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer className="bg-white text-black border-t text-sm mt-5">
      <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-5 2xl:px-[80px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Explore Section */}
          <div className="text-left">
            <h3 className="font-bold mb-2 text-base">EXPLORE</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="font-semibold text-[#808080] hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/car-catalog" className="font-semibold text-[#808080] hover:text-black">
                  Car Catalog
                </Link>
              </li>
              <li>
                <Link to="/loan-calculator" className="font-semibold text-[#808080] hover:text-black">
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link to="/car-comparison" className="font-semibold text-[#808080] hover:text-black">
                  Car Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="text-left">
            <h3 className="font-bold mb-2 text-base">COMPANY</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/about-us" className="font-semibold text-[#808080] hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="font-semibold text-[#808080] hover:text-black">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="font-semibold text-[#808080] hover:text-black">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="font-semibold text-[#808080] hover:text-black">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-left">
            <h3 className="font-bold mb-2 text-base">CONTACT US</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/contact-us" className="font-semibold text-[#808080] hover:text-black">
                  Chat with Us
                </Link>
              </li>
              <li>
                <a href="tel:+639171809000" className="font-semibold text-[#808080] hover:text-black">
                  Call Us at +63 917-180-9000
                </a>
              </li>
              <li>
                <a href="mailto:electriccar@evestdealership.com" className="font-semibold text-[#808080] hover:text-black">
                  Email Us
                </a>
              </li>
              <li>
                <Link to="/contact-us" className="font-semibold text-[#808080] hover:text-black">
                  Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Section */}
          <div className="text-left">
            <h3 className="font-bold mb-3 text-base">SOCIALS</h3>
            <div className="flex space-x-3">
              <a href="#" className="w-6 h-6">
                <img src={Facebook_Icon} alt="Facebook" width={19} height={19} />
              </a>
              <a href="#" className="w-6 h-6">
                <img src={Twitter_Icon} alt="Twitter" width={23} height={23} />
              </a>
              <a href="#" className="w-6 h-6">
                <img src={Instagram_Icon} alt="Instagram" width={19} height={19} />
              </a>
              <a href="#" className="w-11 h-11">
                <img src={Youtube_Icon} alt="YouTube" width={27} height={27} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-center text-[13px]">
          <p>electriccar@evestdealership.com</p>
          <p>+63 921 378 3197 | +63 916 242 3581 | +63 917 180 9000</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;