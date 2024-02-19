import Navbar from "../../components/Navbar/Navbar"
import Hero from "../../components/Hero/Hero"
import NavBarComponent from "../../components/NavBarComponent/NavBarComponents"
import './Home.css'
const Home = () => {
  return (
    <>
    <div className="home-container">
    <NavBarComponent />
    <Hero />
    </div>
    </>
  )
}

export default Home