import React, { useEffect, useState } from "react";
import {useNavigate}from 'react-router-dom';
import Header1 from "./Header1.jsx";
import '../css/chat.css';
import axios from 'axios';

// real-time database
import {app} from '../firebase/firebase.js';
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

import { useDataContex } from "./DataContex.jsx";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:8000");

const MessageReceived = (props) => {
    return (
        <div className="chat-show-received message">
            <div className="chat-show-header">{props.currUser}</div>
            {props.msg}
        </div>
    );
};

const MessageSent = (props) => {
    return (
        <div className="chat-show-sent message">
            <div className="chat-show-header">{props.currUser}</div>
            {props.msg}
        </div>
    );
};


const Chat = () => {
    const {user} = useDataContex();
    const navigate = useNavigate();
    if(user === null){
        navigate('/authentication');
    }

    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [elements, setElements] = useState([]);

    const addUserMessage = async (message) =>{
        await axios.post('http://localhost:8001/post-message',{
            username : userName,
            email : user.email,
            msg : message
        });
    };

    const fetchUserMessage = async () =>{
        const response = await axios.get('http://localhost:8001/get-message');
        
        response.data.forEach(element => {
            if(element.email == user.email){
                setElements(prevElements => [...prevElements, <MessageSent msg={element.msg} currUser={element.username}/>]);
            }
            else{
                setElements(prevElements => [...prevElements, <MessageReceived msg={element.msg} currUser={element.username}/>]);
            }
        });
    }

    const addUserName = () =>{
        let name = "Unknown User";
        if(user != null && user.displayName != null)
            name = user.displayName.split(" ")[0];
        setUserName(name);
    }

    const sendMessage = async() => {
        setElements(prevElements => [...prevElements, <MessageSent msg={message} currUser={userName}/>]);
        // addUserMessage(message);
        const email = user.email;
        socket.emit("send_message", { message, userName, email });
        setMessage('');
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if(data.email == user.email){
                setElements(prevElements => [...prevElements, <MessageSent msg={data.message} currUser={data.userName}/>]);
            }
            else{
                setElements(prevElements => [...prevElements, <MessageReceived msg={data.message} currUser={data.userName}/>]);
            }
        });
    
        fetchUserMessage();

        return () => {
            socket.off("receive_message");
        };
    }, [socket]);
    
    const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            sendMessage();
        }
    }

    useEffect(() =>{
        addUserName();
    },[])
    
    return (
        <>
            <Header1 />
            <div className="chat">
                <div className="chat-show">
                    {elements}
                </div>
                <div className="chat-message-box">
                    <input 
                        type="text" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Enter Message" 
                        onKeyPress={handleKeyPress}/>
                    <div className="btn" onClick={sendMessage}>Send</div>
                </div>
            </div>
        </>
    );
}

export default Chat;
