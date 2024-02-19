import HeroLogo from '../../assets/HeroLogo.png'
import HeroMan from '../../assets/hero_image.png'
import './Hero.css'
const Hero = () => {
  return (
<main className="HomeLanding-Main">
          <div className="HomeLanding-Titles">
            <p className="HomeLanding-Title">WORK</p>
            <p className="HomeLanding-SubTitle">
              Come Train With Me, We Will <br />
              Get You Gym Smart In No Time
            </p>
            <button
              className="HomeLanding-Button"
              
            >
              Lets Go
            </button>
          </div>
          <img className="HomeLanding-Image" src={HeroLogo} alt="" />
        </main>  )
}

export default Hero