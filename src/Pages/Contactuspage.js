'use client'

import Navbar from "../Components/navbar";
import Banner from "../Components/banner";
import NavBlock from "../Components/navblock";
import Footer from "../Components/Footer";
import Contactus from "../Components/Contactus";

export default function Contactuspage() {
  const handleCompare = (car) => {
    // console.log("Comparing car:", car);
    // Add your compare logic here
  };
  return (
    <div>
      <Banner />
      <Navbar />
      <Contactus />
      <NavBlock />
      <Footer />
    </div>
  )
}

