import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponents";
import ContactUs from "../../components/ContactUs/ContactUs";
import AboutUs from "../../components/AboutUs/AboutUs";
import Hero2 from "../../components/Hero2/Hero2";
import Footer from "../../components/Footer/Footer";
import Trainer from "../../components/Trainer/Trainer";
import "./Home.css";

const Home = () => {
 
  

  return (
    <>
      <div className="home-container">
        <NavBarComponent />
        <Hero2 />
        <AboutUs />
        <Trainer />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};

export default Home;
