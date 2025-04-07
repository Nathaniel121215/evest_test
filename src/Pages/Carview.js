import { useParams, useLocation } from "react-router-dom";
import Navbar from "../Components/navbar";
import Banner from "../Components/banner";
import NavBlock from "../Components/navblock";
import Footer from "../Components/Footer";
import Carprofile from "../Components/Carprofile";

export default function Carview() {
  const { id } = useParams();
  const location = useLocation();
  const carData = location.state?.car;

  return (
    <div>
      <Banner />
      <Navbar />
      <Carprofile carData={carData} />
      <NavBlock />
      <Footer />
    </div>
  );
}