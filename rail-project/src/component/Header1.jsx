import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";
import { useDataContex } from "./DataContex";

export const HeaderIcon = (props) => {
    return <Link to={props.redirect} style={props.style}>
            <div className={props.class} id={props.id}>{props.title}</div>
        </Link>
};

const Header1 = (props) =>{
    const {user} = useDataContex();
    // console.log("user : ", user);
    const style = {
        backgroundColor : 'blue',
        color : 'white',
    };
    const location = useLocation().pathname;
    
    const setName = () =>{
        let userName = "Login/Signin";
        if(user != null && user.displayName != null)
            userName = "Hello, " + user.displayName.split(" ")[0];
        if(user != null && user.username != null)
            userName = "Hello, " + user.username.split(" ")[0];
        else if(user != null) userName = "Hello, User";
        return userName;
    }

    return <header> 
    <div className="header">
        <div className="header-child">
            <HeaderIcon class="website-logo zoomIn wow animated" redirect="/"/>
        </div>
        <div className="title">
            <HeaderIcon title="Home" class="header-child" redirect="/" 
                style={location === '/' ? style : {}}/>
            <HeaderIcon title="About" class="header-child" redirect="/about"
                style={location === '/about' ? style : {}}/>
            <HeaderIcon title="Sevices" class="header-child" redirect="/chat"
                style={location === '/services' ? style : {}}/>
        </div>
        <div className="title">
            <HeaderIcon title="Local" class="header-child" redirect="/local"
                style={location === '/local' ? style : {}}/>
            <HeaderIcon title="Express" class="header-child" redirect="/express"
                style={location === '/express' ? style : {}}/>
            <HeaderIcon title={setName()} 
                class="header-child" redirect={user ? '/profile' : '/authentication'} 
                style={location === '/authentication' ? style : {}}/>

        </div>
    </div>
    </header>
};

export default Header1;