import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import "./NavBarComponent.css";

function NavBarComponent() {
  const [showResponsiveNav, setShowResponsiveNav] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setShowResponsiveNav(!showResponsiveNav);
  };

  const [selectedLink, setSelectedLink] = useState('home');

  return (
    <header className="NavBar-Header">
      <div className="Header-Logo">
        <img src={Logo} alt="" className="Header-Logo-Image" />
        <h3 className="Header-Logo-H3">Shape</h3>
      </div>
      <nav className={showResponsiveNav ? "responsive_nav" : ""}>
        <Link to={"/"} className={selectedLink === 'home' ? 'active' : ''}>
          <a  style={{ color: selectedLink === 'home' ? '#D5DD5A' : '' }}>
            HOME
          </a>
        </Link>
        <Link to={"/recipes"} className={selectedLink === 'recipes' ? 'active' : ''}>
          <a  style={{ color: selectedLink === 'recipes' ? '#D5DD5A' : '' }}>
            RECIPES
          </a>
        </Link>
        <Link to={"/articles"} className={selectedLink === 'articles' ? 'active' : ''}>
          <a  style={{ color: selectedLink === 'articles' ? '#D5DD5A' : '' }}>
            ARTICLES
          </a>
        </Link>
        <Link to={"/videos"} className={selectedLink === 'videos' ? 'active' : ''}>
          <a  style={{ color: selectedLink === 'videos' ? '#D5DD5A' : '' }}>
            VIDEOS
          </a>
        </Link>

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
