  import {useState} from "react";
  import axios from "axios";
  import "./RegisterPage.css";
  import { useNavigate} from "react-router-dom";
  import FullLogo from "../../assets/newlogo.jpeg";
  import { toast } from "react-toastify";
  import { jwtDecode, JwtPayload } from "jwt-decode";
  import { FormEvent } from 'react';
  import { useInfo } from '../../utils/AuthContext';
  interface CustomJwtPayload extends JwtPayload {
    type: string;
    id:string
    firstName:string;
    lastName:string;
   }

  const RegisterLogin = () => {
    const navigate = useNavigate();
    const context = useInfo();
    if (!context) {
        throw new Error('Login component must be used within an AuthProvider');
    }
    const {setId, setUserAuth, setAuth,setName} = context;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const handleAddUser = async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
          const add = await axios.post(`${apiUrl}/users`, {
              username,
              password,
              firstName,
              lastName,
          });
          console.log(add);
          // Show success toast
          toast.success("User registered successfully!");
      } catch (err) {
          console.log(err);
          toast.error("Error registering user. Please try again later.");
      }
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const add = await axios.post(`${apiUrl}/users/login`, {
        username,
        password,
      });
      const token = add.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setId(decoded.id);
      setAuth(false);
      setUserAuth(true);
      setName(decoded.firstName + ' ' + decoded.lastName)
      toast.success("Logged in successfully!", {
        autoClose: 500, // Auto close after 3 seconds
        onClose: () => navigate('/user/addschedule')
      });
      

    } catch (err) {
      console.log(err);
      toast.error("Invalid login");
    }
  }
    


    const handleSignUpClick = () => {
      const container = document.getElementById("container");
      if (container) {
         container.classList.add("right-panel-active");
      }
     };
     
     const handleSignInClick = () => {
      const container = document.getElementById("container");
      if (container) {
         container.classList.remove("right-panel-active");
      }
     };
     

    const handleGoHomeClick = () => {
      navigate("/");
    };

    return (
      <div className="l-wrapper" style={{backgroundColor:"black",height:"100vh"}}>
<button className="go-home" onClick={handleGoHomeClick}>
          Go Home
        </button>        <div className="RegisterLoginPage">
          <div className="container" id="container">
            <div className="form-container sign-up-container">
              <form onSubmit={handleAddUser}>
                <h2>Create Account</h2>
                <span>or use your email for registration</span>
                <input
                  className="Registerinput"
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="Registerinput"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="Registerinput"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  className="Registerinput"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
                <button>Sign Up</button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form onSubmit={handleLogin} >
                <h2>Sign in</h2>
                <span> use your account</span>
                <input
                  className="Registerinput"
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="Registerinput"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
                <button>Sign In</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <img className="FullLogo" src={FullLogo} alt="Logo" />
                  <h2>Welcome Back!</h2>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="ghost" onClick={handleSignInClick}>
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <img className="FullLogo" src={FullLogo} alt="Logo" />
                  <h2>Hello, Friend!</h2>
                  <p>Enter your personal details and start the journey with us</p>
                  <button className="ghost" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default RegisterLogin;
