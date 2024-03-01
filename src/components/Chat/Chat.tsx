import React, { useEffect, useState } from 'react';

interface ChatProps {
 socket: any; // You should replace 'any' with the actual type of socket if possible
 username: string; // Assuming username is a string
 room: string; // Assuming room is a string
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
                    new Date(Date.now()).getMinutes() // Properly call getMinutes() method
            };
            // Emit the message to the server without updating the state
            await socket.emit("send_message", messageData);
            setMessage(''); // Clear input field after sending message
        }
    };

    useEffect(()=>{
        socket.on("recive_message",(data: Message) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        // Clean up function to unsubscribe from socket events
        return () => {
            socket.off('recive_message');
        };
    },[socket])
  
    return (
    <div>
      <div className="chat-header">
        <p>Live Chat With Fitness Trainer</p>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index}>
            <p><strong>{msg.author}:</strong> {msg.message} ({msg.time})</p>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input type="text" placeholder='Hey....' 
        value={message}
        onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
 );
};

export default Chat;
