'use client'

import Navbar from "../Components/navbar";
import Banner from "../Components/banner";
import Calculatorblock from "../Components/Calculatorblock";
import NavBlock from "../Components/navblock";
import Footer from "../Components/Footer";
import Landing from "../Components/Landing_default";

export default function Loancalculator() {

  return (
    <div>
      <Banner />
      <Navbar />
      <Landing />
      <Calculatorblock/>
      <NavBlock />
      <Footer />
    </div>
  )
}

