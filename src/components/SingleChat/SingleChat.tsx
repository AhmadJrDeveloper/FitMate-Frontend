import { useState } from 'react';
import './SingleChat.css';
import { Socket } from 'socket.io-client'; 
import io from 'socket.io-client';
import './SingleChat.css'
// const ENDPOINT = 'http://localhost:4000';
const apiUrl = import.meta.env.VITE_APP_API_URL;

// Initialize socket connection
const socket: Socket = io(apiUrl); 
import Chat from '../Chat/Chat';
import { useInfo } from '../../utils/AuthContext';


const SingleChat = () => {
    const [room, setRoom] = useState('5151'); 
    const [joined, setJoined] = useState(false); // Track whether the user has joined the room
    const context = useInfo();
    if (!context) {
        throw new Error('Login component must be used within an AuthProvider');
    }
    const { name } = context;

    const joinRoom = () => {
        if (name && room !== "") {
            socket.emit("join_room", room);
            setJoined(true); // Set joined to true when the user joins the room
        }
    }

    return (
        <>
            <div className="chat-container">
                <h3>Here You Can Chat With Others On the Website</h3>
                {name && <p>Welcome, {name}!</p>}
                {/* <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /> */}
                {/* <input type="text" placeholder="Room ID" value={room} disabled /> Disable user input for room ID */}
                <button onClick={joinRoom} disabled={joined}>Join</button>
                {name && <Chat socket={socket} username={name} room={room} />}
            </div>
        </>
    );
}

export default SingleChat;
