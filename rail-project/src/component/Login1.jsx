import React, {useState} from "react";
import { useDataContex } from './DataContex.jsx';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';


const Login1 = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, user } = useDataContex();
    const navigate = useNavigate();
    const [validMessage, setValidMessage] = useState('');

    const isValidEmail = ()=>{
        return /\S+@\S+\.\S+/.test(email);
    }

    const validate = async (event) =>{
        if(!isValidEmail(event.target.value)){
            setValidMessage("Email is Invalid");
            return;
        }

        const response = await axios.get(`http://localhost:8001/get-user${email}`);
        if(response.data.length == 0){
            setValidMessage("User is not resgistered");
        } 
        else if(response.data[0].password != password){
            setValidMessage("Password is wrong");
        }
        else{
            const username = response.data[0].username;
            Cookies.set('user', username, { expires: 1 }); 
            Cookies.set('email', email, { expires: 1 });
            setUser(response.data[0]);
            navigate('/');
        }
    }
    
    return (
        <>
            <input
            className="login-input"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            />
            <input
            className="login-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
            <div>{validMessage}</div>
            <button className="login-btn" onClick={validate}>Login</button>
        </>
    );
}

export default Login1;