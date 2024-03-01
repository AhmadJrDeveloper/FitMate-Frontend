import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponents";
import ContactUs from "../../components/ContactUs/ContactUs";
import AboutUs from "../../components/AboutUs/AboutUs";
import Hero2 from "../../components/Hero2/Hero2";
import Footer from "../../components/Footer/Footer";
import ExerciseCards from "../../components/ExerciseCards/ExerciseCards";
import "./Home.css";

const Home = () => {
  const scrollToAboutUs = () => {
    const aboutUsElement = document.getElementById("about-us");
    if (aboutUsElement) {
      scroll.scrollTo(aboutUsElement.offsetTop);
    }
  };
  
  const scrollToContactUs = () => {
    const contactUsElement = document.getElementById("contact-us");
    if (contactUsElement) {
      scroll.scrollTo(contactUsElement.offsetTop);
    }
  };
  

  return (
    <>
      <div className="home-container">
        <NavBarComponent />
        <Hero2 />
        <AboutUs />
        {/* <ExerciseCards /> */}
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};

export default Home;
