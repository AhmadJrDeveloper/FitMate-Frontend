import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FullLogo from "../assets/newlogo.jpeg";
import { toast } from "react-toastify";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { FormEvent } from 'react';
import { useInfo } from "../utils/AuthContext";

interface CustomJwtPayload extends JwtPayload {
  type: string;
  id: string;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const context = useInfo();
  if (!context) {
    throw new Error('Login component must be used within an AuthProvider');
  }
  const { setId, setAuth, setType } = context;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/admins/login`, {
        username,
        password,
      });
      const token = response.data.token;
      
      // Storing token in local storage
      localStorage.setItem('token', token);

      // Decoding token to extract user info
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setType(decoded.type);
      setId(decoded.id);
      setAuth(true);
      
      toast.success("Logged in successfully!");
      navigate('/admin');
    } catch (err) {
      console.log(err);
      toast.error("Invalid login");
    }
  }

  const handleGoHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="l-wrapper" style={{ backgroundColor: "black", height: "100vh" }}>
      <button className="go-home" onClick={handleGoHomeClick}>
        Go Home
      </button>
      <div className="RegisterLoginPage">
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
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
              </div>
              <div className="overlay-panel overlay-right">
                <img className="FullLogo" src={FullLogo} alt="Logo" />
                <h2>Hello, Admin!</h2>
                <p>Login To Manage FITMATE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
