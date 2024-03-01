import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormEvent } from 'react';
import { jwtDecode, JwtPayload } from "jwt-decode";
import './Login.css';
import { useInfo } from '../../utils/AuthContext';

// Define a new interface that extends JwtPayload and includes the 'type' property
interface CustomJwtPayload extends JwtPayload {
 type: string;
 id:string
}

const Login = () => {
    const navigate = useNavigate();
    const context = useInfo();
    if (!context) {
        throw new Error('Login component must be used within an AuthProvider');
    }
    const {setId, setAuth, setType} = context;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const add = await axios.post(`${apiUrl}/admins/login`, {
                username,
                password
            });
            const token = add.data.token;
            localStorage.setItem('token', token);
            // Use the CustomJwtPayload interface when decoding the JWT token
            const decoded = jwtDecode<CustomJwtPayload>(token);
            setType(decoded.type);
            setId(decoded.id);
            setAuth(true);
            console.log(decoded);
            console.log(add.data);
            navigate('/admin/categories');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="login-header">
                    LOGIN
                </div>
                <form className='inputs-form' onSubmit={handleLogin}>
                    <div className="field">
                        <label className='login-label' htmlFor='username'> Username</label>
                        <input className='login-input-field' type="text" placeholder="Email or Phone" id='username'
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="field">
                        <label className='login-label' htmlFor="password">Password</label>
                        <input className='login-input-field' type="password" placeholder="Password" id='password'
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className='login-button'>LOGIN</button>

                    <div className="link">
                        Not a member?
                        <Link to={'/register'}>
                            <a href="#">Signup now</a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
