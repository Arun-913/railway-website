import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import { useDataContex } from './DataContex.jsx';
import axios from 'axios';
const random = require("simple-random-number-generator");
import Cookies from 'js-cookie';


const Signin = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [validMessage, setValidMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [inputOtp, setInputOtp] = useState('');
    const {setUser} = useDataContex();
    const navigate = useNavigate();

    const isValidEmail = ()=>{
        return /\S+@\S+\.\S+/.test(email);
    }

    const handelOnValidate = async (event) =>{
        if(!isValidEmail(event.target.value)){
            setValidMessage('Email is Invalid');
        }
        else if(password1.length < 8){
            setValidMessage("Password must be greater than 8 digit");
        }
        else if(password1 != password2){
            setValidMessage("Password is not same");
        }
        else{
            const isAlreadyRegistered = await axios.get(`http://localhost:8001/get-user${email}`);
            if(isAlreadyRegistered.data.length != 0){
                setValidMessage("User is already registered");
                return;
            }

            setVisible(true);
            const temp = random({min:100000, max:999999, integer: true});
            setOtp(temp);
            await axios.post('http://localhost:8001/generate-otp', {
                username: username,
                email: email,
                otp: temp
            });
        }
    }

    const handleOnSubmit = async() =>{
        if(inputOtp != otp){
            setValidMessage("OTP is wrong");
            return;
        }

        const response = await axios.post(`http://localhost:8001/post-user`,{
            username : username,
            email : email,
            password : password1,
        });
        Cookies.set('user', username, { expires: 1 }); 
        Cookies.set('email', email, { expires: 1 });
        setUser(response.data[0]);
        navigate('/');
    }

    return (
        <>
            {!visible && <><input
                className="login-input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
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
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Enter Password"
            />
            <input
                className="login-input"
                type="password"
                id="confirmPassword"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm Password"
            />
            <button className="login-btn" onClick={handelOnValidate}>Signup</button></>}
            
            
            {visible && <><input
                type="text"
                className="login-input"
                value={inputOtp}
                onChange={e => setInputOtp(e.target.value)}
                placeholder="Enter OTP"
                />
            <button className="login-btn" onClick={handleOnSubmit}>Confirm OTP</button></>}
            <div>{validMessage}</div>
        </>
    );
}

export default Signin;