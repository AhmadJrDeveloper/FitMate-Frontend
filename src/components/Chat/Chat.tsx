import React, { useEffect, useState } from 'react';
import './Chat.css'

interface ChatProps {
 socket: any; 
 username: string;
 room: string; 
}

interface Message {
 room: string;
 author: string;
 message: string;
 time: string;
}

const Chat: React.FC<ChatProps> = ({ socket, username, room }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room: room,
                author: username,
                message: message,
                time: new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes() 
            };
            await socket.emit("send_message", messageData);
            setMessage(''); // Clear input field after sending message
        }
    };

    useEffect(()=>{
        socket.on("recive_message",(data: Message) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        return () => {
            socket.off('recive_message');
        };
    },[socket])
  
    return (
    <div>
      <div className="chat-header">
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index}>
            <p><strong>{msg.author}:</strong> {msg.message} ({msg.time})</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input className='chat-input' type="text" placeholder='Send Message...' 
        value={message}
        onChange={(e) => setMessage(e.target.value)}/>
        <button className='chat-button' onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
 );
};

export default Chat;
