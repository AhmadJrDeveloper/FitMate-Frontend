import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/newlogo.jpeg";
import "./NavBarComponent.css";

function NavBarComponent() {
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    setSelectedLink(getLinkKey(currentPath));
  }, [location]);

  const getLinkKey = (pathname:any) => {
    switch (pathname) {
      case "/":
        return "home";
      case "/aboutus":
        return "about-us";
      case "/exercises":
        return "exercises";
      case "/contactus":
        return "contact-us";
      case "/login":
        return "login";
      default:
        return "";
    }
  };

  const toggleNavbar = () => {
    setShowResponsiveNav(!showResponsiveNav);
  };

  const navigateToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    toggleNavbar();
  };

  return (
    <header className="NavBar-Header">
      <div className="Header-Logo">
        <RouterLink to={'/'}>
          <img src={Logo} alt="" className="Header-Logo-Image" />
        </RouterLink>
        <h3 className="Header-Logo-H3">
          FIT<span className="span-color">MATE</span>
        </h3>
      </div>
      <nav className={showResponsiveNav ? "responsive_nav" : ""}>
        <RouterLink to={"/"} className={selectedLink === "home" ? "active" : ""}>
          <a style={{ color: selectedLink === "home" ? "rgb(201,34,34)" : "" }}>
            HOME
          </a>
        </RouterLink>
        <ScrollLink
          style={{ cursor: "pointer" }}
          to="about-us"
          smooth={true}
          duration={0}
          className={selectedLink === "about-us" ? "active" : ""}
          onClick={navigateToHome}
        >
          ABOUT
        </ScrollLink>
        <ScrollLink
          style={{ cursor: "pointer" }}
          to="contact-us"
          smooth={true}
          duration={500}
          className={selectedLink === "contact-us" ? "active" : ""}
          onClick={navigateToHome}
        >
          CONTACT
        </ScrollLink>
        <RouterLink to={"/exercises"} className={selectedLink === "exercises" ? "active" : ""}>
          <a style={{ color: selectedLink === "exercises" ? "rgb(201,34,34)" : "" }} >
            EXERCISES
          </a>
        </RouterLink>
        <RouterLink to={"/login"} className={selectedLink === "login" ? "active" : ""}>
          <a style={{ color: selectedLink === "login" ? "rgb(201,34,34)" : "" }}>
            LOGIN
          </a>
        </RouterLink>
        <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={toggleNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default NavBarComponent;
