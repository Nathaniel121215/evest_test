
import Navbar from "../Components/navbar";
import Banner from "../Components/banner";
import Footer from "../Components/Footer";
import FaqIntro from "../Components/faq_intro";
import FaqCategory from "../Components/faq_category";

export default function Faq() {


  return (
    <div>
      <Banner />
      <Navbar />
      <FaqIntro />
      <FaqCategory />
      <Footer />
    </div>
  );
}