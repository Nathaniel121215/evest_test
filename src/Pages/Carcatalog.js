import Navbar from "../Components/navbar";
import Banner from "../Components/banner";
import NavBlock from "../Components/navblock";
import Footer from "../Components/Footer";
import Catalogfilter from "../Components/catalogfilter";

export default function Carcatalog() {
  const handleCompare = (car) => {
    // console.log("Comparing car:", car);
    // return car;// Add your compare logic here
  };

  return (
    <div>
      <Banner />
      <Navbar />
      <Catalogfilter onCompare={handleCompare} />
      <NavBlock />
      <Footer />
    </div>
  );
}
