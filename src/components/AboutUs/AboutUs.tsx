import './AboutUs.css';
import Card from 'react-bootstrap/Card';
import Card1 from '../../assets/card1.jpeg';
import Card2 from '../../assets/card2.jpeg';
import Card3 from '../../assets/card3.jpeg'
import Card4 from '../../assets/newlogo.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const cardData = [
  {
    image: Card1,
    title: 'Live Chat with Trainers',
    text: 'Get personalized advice and guidance from certified trainers through our free live chat feature, helping you stay on track and achieve your fitness goals.',
  },
  {
    image: Card2,
    title: 'Schedule Management',
    text: 'Effortlessly manage your workout schedule with our intuitive scheduling tools, allowing you to book sessions, set reminders, and stay organized.',
  },
  {
    image: Card3,
    title: 'Exercise Library',
    text: 'Explore our extensive library of exercises covering various muscle groups and fitness levels, with detailed instructions and videos to ensure proper form and technique.',
  },
  {
    image: Card4,
    title: 'Personalized Workout Plans',
    text: 'Receive customized workout plans tailored to your fitness objectives and preferences, designed to help you progress effectively and reach your desired results.',
  },
];

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <section id="about-us">

    <div className='aboutus-container'>
      <h1 className='about-header'>WHY<span className='span-color'> US</span></h1>
      <div className="card-container">
        {cardData.map((card, index) => (
          <Card className='about-card' key={index} data-aos='fade-left' data-aos-delay={index * 500}>
            <Card.Img variant="top" src={card.image} />
            <Card.Body>
              <Card.Title className='card-title'>{card.title}</Card.Title>
              <Card.Text>
                {card.text}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
    </section>
  );
}

export default AboutUs;
