import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import './SingleChat.css';

const ENDPOINT = 'http://localhost:4000';

const ChatContext = () => {
    const [socket, setSocket] = useState<Socket | null>(null); // Specify the type for socket

    useEffect(() => {
        const newSocket = io(ENDPOINT);
        setSocket(newSocket);
    }, []);

    return (
        <div>ChatContext</div>
    );
};

export default ChatContext;
