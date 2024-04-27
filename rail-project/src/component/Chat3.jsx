import React, { useEffect, useState } from "react";
import {useNavigate}from 'react-router-dom';
import Header1 from "./Header1";
import '../css/chat.css';
import axios from 'axios';
import { useSocketContex } from "../context/SocketProvider.js";
import { useDataContex } from "./DataContex";
import io from 'socket.io-client';
import Cookies from 'js-cookie';

export const MessageReceived = (props) => {
    return (
        <div className="chat-show-received message">
            <div className="chat-show-header">{props.currUser}</div>
            {props.msg}
        </div>
    );
};

export const MessageSent = (props) => {
    return (
        //  style={{height: `${props.msg.length * 0.6}px`, width:`${props.msg.length}px`}}
        <div className="chat-show-sent message">
            <div className="chat-show-header">{props.currUser}</div>
            {props.msg}
        </div>
    );
};


const Chat3 = () => {
    const {sendMessageFromContext, elements, setElements} = useSocketContex();
    const {user} = useDataContex();
    const navigate = useNavigate();
    const email = user != null ? user.email : Cookies.get('email');
    if(Cookies.get('user') === null || user === null){
        navigate('/authentication');
    }

    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    const addUserMessage = async (message) =>{
        await axios.post('http://localhost:8001/post-message',{
            username : userName,
            email : email,
            msg : message
        });
    };

    const fetchUserMessage = async () =>{
        const response = await axios.get('http://localhost:8001/get-message');
        console.log(response);
        response.data.forEach(element => {
            if(element.email == email){
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
        sendMessageFromContext(message, userName, email);
        setMessage('');
        addUserMessage(message);
    }

    const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            sendMessageFromContext(message, userName, email);
            setMessage('');
        }
    }

    useEffect(() => {
        addUserName();
        fetchUserMessage();
        setUserName(Cookies.get('user'));
    }, []);
    
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
                        onKeyPress={handleKeyPress}
                    />
                    <div className="btn" onClick={sendMessage}>Send</div>
                </div>
            </div>
        </>
    );
}

export default Chat3;
