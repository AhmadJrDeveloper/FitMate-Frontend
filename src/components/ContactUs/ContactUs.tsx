import  { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import './ContactUs.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = "service_udck6x2";
    const templateId = "template_dc3y09a";
    const userId = "w2XEn16Vz2vNsS71k";

    const dataWithNames = {
      ...formData,
      from_name: `${formData.firstName} ${formData.lastName}`,
    };

    emailjs
      .send(serviceId, templateId, dataWithNames, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
        toast.success("Message sent successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        // After successful submission, reset isSubmitting after 5 seconds
        setTimeout(() => {
          setIsSubmitting(false);
        }, 100);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send message. Please try again later.", {
          position: "top-center",
          autoClose: 3000,
        });
        setIsSubmitting(false); // Reset isSubmitting if submission fails
      });
  };

  return (
    <section id="contact-us">

    <div className="Contact-Main" data-aos="fade-bottom">
      <div className="Contact-Home-Parent">
      <h1 className="Contact-Form-Header">CONTACT <span className="span-color">US</span></h1>

        <div className="Contact-Home-Parent-Form">
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  required
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  value={formData.firstName}
                  id="firstName"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  required
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                  value={formData.lastName}
                  id="lastName"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                  placeholder="Enter E-mail"
                  onChange={handleChange}
                  value={formData.email}
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  name="message"
                  className="form-control"
                  required
                  placeholder="Enter Message"
                  onChange={handleChange}
                  value={formData.message}
                  id="message"
                  rows={5}
                ></textarea>
              </div>
              {/* <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ backgroundColor: "rgb(201, 34, 34)", border: "none" }}
                  disabled={isSubmitting} 
                >
                  {isSubmitting ? "Sending..." : "SUBMIT"}
                </button>
              </div> */}
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn41-43 btn-41"
                  style={{ backgroundColor: "rgb(201, 34, 34)", border: "none" }}
                  disabled={isSubmitting} 
                >
                  {isSubmitting ? "Sending..." : "SUBMIT"}
                </button>
              </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
    </section>
  );
}

export default ContactUs;
