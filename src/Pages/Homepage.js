'use client'

import Navbar from "../Components/navbar";
import Banner from "../Components/banner";
import Landing from "../Components/Landing";
import NavBlock from "../Components/navblock";
import Footer from "../Components/Footer";
import Brandslider from "../Components/Brandslider";

export default function Homepage() {
  const handleCompare = (car) => {
    // console.log("Comparing car:", car);
    // Add your compare logic here
  };
  return (
    <div>
      <Banner />
      <Navbar />
      <Landing onCompare={handleCompare}/>
      <Brandslider />
      <NavBlock />
      <Footer />
    </div>
  )
}

