import React, { createContext, useCallback, useContext, useEffect, useState} from "react";
import {io, Socket} from 'socket.io-client';
import {MessageSent, MessageReceived} from '../component/Chat3.jsx';
import { useDataContex } from "../component/DataContex.jsx";
import { json } from "react-router-dom";

const SocketContext = createContext();
export const SocketProvider = (props) =>{
    const {user} = useDataContex();
    // if(user.email) console.log("email : ", user.email);
    const [socket, setSocket] = useState();
    const [elements, setElements] = useState([]);

    const sendMessageFromContext = useCallback((message, userName, email) =>{
        setElements(prevElements => [...prevElements, <MessageSent msg={message} currUser={userName}/>]);
        if(socket){
            socket.emit('send_message', {message, userName, email})
        }
    }, [socket]);

    const receivedMessageFromContext = useCallback((data) => {
        data = JSON.parse(data);
    
        if (data.message) {
            setElements(prevElements => [
                ...prevElements,
                <MessageReceived msg={data.message} currUser={data.userName}/>
            ]);
        }
    }, [socket]);


    useEffect(() =>{
        // const _socket = io('http://localhost:8002');
        // setSocket(_socket);
        // _socket.on('message', receivedMessageFromContext);

        // return () =>{
        //     _socket.disconnect();
        //     setSocket(undefined);
        //     _socket.off("message", receivedMessageFromContext);
        // }
    },[]);

    return (
        <SocketContext.Provider value={{sendMessageFromContext, elements, setElements}}>
            {props.children}
        </SocketContext.Provider>
    );
}

export const useSocketContex = () => useContext(SocketContext);