import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, 
  Route,
  Routes,
  useLocation, 
  useNavigate, 
  Link,
}from 'react-router-dom';
import Cookies from 'js-cookie';


import { useDataContex } from './DataContex.jsx';
import '../css/login1.css';
import Login1 from './Login1.jsx';
import Signin from './Signin.jsx';
import Header1 from './Header1.jsx';

import { app } from '../firebase/firebase.js';
import { getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  GithubAuthProvider} from 'firebase/auth';
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth(app);
const signinWithGoogle = () =>{
  signInWithPopup(auth, googleProvider).then(() => console.log("Google : success"));
}
const signinWithGithub = () =>{
  signInWithPopup(auth, githubProvider).then(() => console.log("Github : success"));
}

const Authentication = (props) => {
  const [activePage, setActivePage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const style1 = {
    color: 'white',
    padding: '5px 20px 5px 20px',
    borderRadius: '20px',
    background: 'rgb(211,152,232)',
    backgroundImage: 'linear-gradient(90deg, rgba(211,152,232,1) 27%, rgba(133,72,208,1) 75%)',
    cursor: 'pointer',
    margin : '10px'
  };
  const style2 = {
    background: 'white',
    borderRadius: '20px',
    padding: '5px 20px 5px 20px',
    cursor : 'pointer',
    margin : '10px'
  };

  const handleLogin = () => {
    console.log('Logging in with:', username, password1);
  };

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {  
        setCurrentUser(null);
      }
    });
  }, [onAuthStateChanged]);

  if(Cookies.get('email') !== null || Cookies.get('email') != ''){
    navigate('/');
  }

  if (currentUser !== null) {
    const { setUser } = useDataContex();
    setUser(currentUser);
    navigate('/');
  }

  return (
    <>
    <Header1/>
    <div className="login-container">
      <div className="login-form">
        <div className="login-title-name">
          <h2
            className={`title ${activePage === 'login' ? 'active' : ''}`}
            style={activePage === 'login' ? style1 : style2}
            onClick={() => handlePageChange('login')}
          >
            Signin
          </h2>
          <h2
            className={`title ${activePage === 'signup' ? 'active' : ''}`}
            style={activePage === 'signup' ? style1 : style2}
            onClick={() => handlePageChange('signup')}
          >
            Signup
          </h2>
        </div>

        {activePage === 'login' ? (
            <Login1 />
          ) : (
            <Signin />
          )}
        <div className="login-logo-parent">
          <div className='google login-logo' onClick={signinWithGoogle}></div>
          <div className='github login-logo' onClick={signinWithGithub}></div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Authentication;
