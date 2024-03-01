import React, { useState } from 'react';
import './SingleChat.css';
import { Socket } from 'socket.io-client'; // Import the Socket type
import io from 'socket.io-client';
import './SingleChat.css'
const ENDPOINT = 'http://localhost:4000';
// Initialize socket connection
const socket: Socket = io(ENDPOINT); // Specify the type for socket
import Chat from '../Chat/Chat';


const SingleChat = () => {
    const [username,setUsername] = useState('')
    const [room,setRoom] = useState('')

    // useEffect(() =>{
    //     socket = io(ENDPOINT)
    // },[]);
    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room",room)
        }
    }
    return (
        <>
        <div className="chat-container">
        <h3>join chat</h3>
        <input type="text"  placeholder='abou ramleh....' onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text"  placeholder='Room Id' onChange={(e)=>setRoom(e.target.value)}/>
        <button onClick={joinRoom}>join</button>
        <Chat socket={socket} username={username} room={room}/>
        </div>

        </>
    );
}

export default SingleChat;
