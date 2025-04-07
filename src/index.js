import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "../src/Pages/Homepage";
import CarCatalog from "../src/Pages/Carcatalog";
import Carview from "../src/Pages/Carview";
import CarComparison from "../src/Pages/Carcomparison";
import Loancalculator from "../src/Pages/Loancalculator";
import Contactus from "../src/Pages/Contactuspage";
import Aboutus from "../src/Pages/Aboutus";
import Faq from "../src/Pages/Faq";
import Services from "../src/Pages/Services";
import Chatbot from "../src/Components/Chatbot";


// import { MessengerChat } from "react-messenger-chat-plugin";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
    {/* <MessengerChat
    pageId="630747706785507"
    language="en_US"
    themeColor={"#cc4839"}
    // bottomSpacing={300}
    loggedInGreeting="Hi! How can we help you?"
    loggedOutGreeting="Hi! How can we help you?"
    greetingDialogDisplay={"show"}
    debugMode={true}
    onMessengerShow={() => {
      console.debug("onMessengerShow");
    }}
    onMessengerHide={() => {
      console.debug("onMessengerHide");
    }}
    onMessengerDialogShow={() => {
      console.debug("onMessengerDialogShow");
    }}
    onMessengerDialogHide={() => {
      console.debug("onMessengerDialogHide");
    }}
    onMessengerMounted={() => {
      console.debug("onMessengerMounted");
    }}
    onMessengerLoad={() => {
      console.debug("onMessengerLoad");
    }}
    
  /> */}
      <Chatbot />
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/car-catalog" element={<CarCatalog />} />
        <Route path="/car-view/:id" element={<Carview />} />
        <Route path="/car-comparison" element={<CarComparison />} />
        <Route path="/loan-calculator" element={<Loancalculator />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
