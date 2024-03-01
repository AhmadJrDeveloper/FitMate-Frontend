import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './Register.css';
import { FormEvent } from 'react';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDate] = useState('');
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    const handleAddUser = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const add = await axios.post(`${apiUrl}/users`, {
                username,
                password,
                firstName,
                lastName,
                dob
            });
            // Show success toast
            toast.success("User registered successfully!");
        } catch (err) {
            console.log(err);
            // Show error toast
            toast.error("Error registering user. Please try again later.");
        }
    }

    return (
        <div className="register-container">
            <ToastContainer /> {/* Toast container for displaying notifications */}
            <div className="register-form">
                <div className="register-header">
                    Register
                </div>
                <form className='inputs-form' onSubmit={handleAddUser}>
                    <div className="field">
                        <label className='register-label' htmlFor='username'> Username</label>
                        <input className='register-input-field' type="text" placeholder="Enter Username" id='username'
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="field">
                        <label className='register-label' htmlFor='firstname'> First Name</label>
                        <input className='register-input-field' type="text" placeholder="Enter First Name" id='firstname'
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="field">
                        <label className='register-label' htmlFor='lastname'> Last Name</label>
                        <input className='register-input-field' type="text" placeholder="Enter Last Name" id='lastname'
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="field">
                        <label className='register-label' htmlFor="password">Password</label>
                        <input className='register-input-field' type="password" placeholder="Password" id='password'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="field">
                        <label className='register-label' htmlFor="dob">Date Of Birth</label>
                        <input className='register-input-field' type="date" placeholder="Choose Your Date of Birth" id='dob'
                            onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <button className='register-button'>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
