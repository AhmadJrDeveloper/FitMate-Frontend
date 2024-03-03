import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook } from 'react-icons/fa'; // Import icons
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink for other links
import { Link as ScrollLink, animateScroll } from 'react-scroll'; // Import ScrollLink and animateScroll
import Logo from '../../assets/newlogo.jpeg'; // Import your logo file
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    animateScroll.scrollToTop();
 };
 return (
    <footer className="text-white py-5 footer-container">
      <Container className='container-style'>
        <Row>
          <Col md={6}>
            <img src={Logo} alt="Logo" height="150" style={{width:"10rem"}} />
            <p className="mt-3 fs-5" style={{width:"20rem"}}>
              FitMate: Your ultimate gym companion for personalized workouts, progress tracking, and community support. Join us now!
            </p>
          </Col>
          <Col md={6} className='col-container'>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
            <li><a onClick={scrollToTop} style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>Home</a></li>
              {/* Use ScrollLink for About Us and Contact Us */}
              <li><ScrollLink to="about-us" smooth={true} duration={500} style={{ textDecoration: 'none', color: 'white' ,cursor:"pointer" }}>About Us</ScrollLink></li>
              <li><ScrollLink to="contact-us" smooth={true} duration={500} style={{ textDecoration: 'none', color: 'white',cursor:"pointer" }}>Contact Us</ScrollLink></li>
              <li><RouterLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</RouterLink></li>

            </ul>
            <a href="https://www.instagram.com/_ahmads3d/?next=%2F" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} style={{ marginRight: '1rem', color: 'rgb(201,34,34)' }} />
            </a>
            <a href="https://www.facebook.com/your_facebook_handle" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} style={{ color: 'rgb(201,34,34)' }} />
            </a>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-4 word-c">
        <p>&copy; {new Date().getFullYear()} FITMATE. All rights reserved.</p>
      </div>
    </footer>
 );
}

export default Footer;
