
import Navbar from "../Components/navbar";
import Banner from "../Components/banner";
import Footer from "../Components/Footer";
import AboutusCompanyIntro from "../Components/Aboutus_company_intro";
import AboutusFeaturedDetails from "../Components/Aboutus_featured_details";
import AboutusCompanyStory from "../Components/Aboutus_company_story";
import AboutusBodInvestors from "../Components/Aboutus_bod_investors";


export default function Aboutus() {


  return (
    <div>
      <Banner />
      <Navbar />
      <AboutusCompanyIntro />
      <AboutusFeaturedDetails />
      <AboutusCompanyStory />
      <AboutusBodInvestors />
      <Footer />
    </div>
  );
}