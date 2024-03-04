import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { FaInstagram, FaFacebook } from 'react-icons/fa'; // Import Facebook and Instagram icons from react-icons
import './Trainer.css';

interface Trainer {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
    insta: string;
    facebook: string;
    type:string;
}

const Trainer = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/admins`);
                const trainerAdmins = response.data.filter((admin: Trainer) => admin.type === 'trainer');
                setTrainers(trainerAdmins);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='aboutus-container'>
            <h1 className='about-header'>OUR<span className='span-color'> TRAINERS</span></h1>
            <div className="card-container">
                {trainers.map((trainer, index) => (
                    <Card className='about-card' key={index} data-aos='fade-right' data-aos-delay={index * 100}>
                        <Card.Img variant="top" className='trainer-image' src={`http://localhost:4000/uploads/${trainer.image}`} alt="Trainer" />
                        <Card.Body>
                            <Card.Title className='card-title'>{trainer.firstName} {trainer.lastName}</Card.Title>
                            <div className="trainer-social-icons">
                                {trainer.insta && <a className='icons-ccolor' href={trainer.insta}><FaInstagram /></a>}
                                {trainer.facebook && <a  className='icons-ccolor'href={trainer.facebook}><FaFacebook /></a>}
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Trainer;
