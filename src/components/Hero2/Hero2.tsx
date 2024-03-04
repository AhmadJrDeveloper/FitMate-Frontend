import './Hero2.css'
import { Link } from 'react-router-dom'
const Hero2 = () => {
  return (
    <div className='Hero-Container'>
        <div className="HomeLanding-Titles">
        <p className="HomeLanding-Title">
          <span>F</span>
          <span>I</span>
          <span >T</span>
          <span className='span-color'>M</span>
          <span className='span-color'>A</span>
          <span className='span-color'>T</span>
          <span className='span-color'>E</span>
        </p>
        <p className="HomeLanding-SubTitle">
          <span>S</span>
          <span>mall Space, </span>
          <br />
          <span>Big </span>
          <span className='span-color'>M</span>
          <span className='span-color'>A</span>
          <span className='span-color'>T</span>
          <span className='span-color'>E</span>
          <span> for Fitness </span>
          <span className='span-color'>G</span>
          <span className='span-color'>O</span>
          <span className='span-color'>A</span>
          <span className='span-color'>L</span>
          <span className='span-color'>S</span>
        </p>
        
      </div>
      <Link to ={'/exercises'}>
      <button className="HomeLanding-Button">
          Let's Start
        </button>
        </Link>

    </div>
  )
}

export default Hero2