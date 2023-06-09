import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import 'firebase/compat/auth';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);
  


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  const firebaseConfig = {
    apiKey: "AIzaSyCGRG2r6MT-CoPN1d-UVrbwhbyWhg0VGyU",
    authDomain: "watermetro-69ffe.firebaseapp.com",
    projectId: "watermetro-69ffe",
    storageBucket: "watermetro-69ffe.appspot.com",
    messagingSenderId: "405368155649",
    appId: "1:405368155649:web:1ffea291743d7123c7da00",
    measurementId: "G-CREXXM61GJ"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        console.log(displayName, email, photoURL, emailVerified);
        setDisplayName(displayName);
        setIsUserSignedIn(true);
        history.push('/'); // Redirect to the dashboard or home page
      } else {
        // User is signed out
        setIsUserSignedIn(false);
      }
    });
    // Cleanup function
    return () => unsubscribe();
  }, [auth, history]);
  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Handle successful login
        const user = userCredential.user;
        console.log('Logged in user:', user);
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
      });
  };
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // Handle successful login
        const user = result.user;
        const profilePictureUrl = result.user.photoURL;
        setProfilePictureUrl(profilePictureUrl);
        console.log(profilePictureUrl);
        console.log('Logged in user:', user);
        // Redirect to a new page or perform any other actions
        history.push('/');
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
        // Display an error message or perform any other error handling
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Successful sign-out
        setIsUserSignedIn(false);
        console.log('User signed out successfully');
        alert('User signed out successfully');
        setProfilePictureUrl('');
        setDisplayName('');
        history.push('/');
      })
      .catch((error) => {
        // Sign-out error
        console.error('Sign-out error:', error);
      });
  };
  const handleHomeClick = () => {
    history.push('/');
  };
  const handleRegisterClick = () => {
    history.push('/register');
  };
  const handleFareDetailsClick = () => {
    history.push('/fare');
  };
  const handleBookTicketsClick = () => {
    history.push('/bookticket');
  };
  const handleTerminalsClick = () => {
    history.push('/terminals');
  };
  const handleLoginClick = () => {
    history.push('/login');
  };
  if (isUserSignedIn) {
    return null; // Render nothing if the user is signed in
  }
  return (
    <div className="Home">
      <img src="https://dl.dropboxusercontent.com/s/zckq71jrgnv4yvf/logo.png?dl=0" className="logo" alt="watermetro" />
      <header className="home-header">
        <h4 className="home" onClick={handleHomeClick}>HOME</h4>
        <h4 className="booktickets" onClick={handleBookTicketsClick}>BOOK TICKETS</h4>
        <h4 className="terminals" onClick={handleTerminalsClick}>TERMINALS</h4>
        <h4 className="faredetails" onClick={handleFareDetailsClick}>FARE DETAILS</h4>
        {isUserSignedIn && (
        <div>
          <h4 className="login" onClick={handleLoginClick}>LOGIN</h4>
          </div>
        )}
      </header>
      <div className="rectangle"></div>
      
      <h2 className="loginhead">LOGIN</h2>
   
      <div className="formcontainer">
        <form className="loginform" onSubmit={handleSubmit}>
          <label className="email" htmlFor="email">Email</label>
          <input className="field"
            value={email}
            type="text"
            placeholder="abc@gmail.com"
            id="email"
            name="email"
            onChange={handleEmailChange}
          />
          <label className="password" htmlFor="password">Password</label>
          <input className="field1"
            value={password}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            onChange={handlePassChange}
          />
          <button className="submit" type="submit">Log In</button>
        </form>
        <div className='goo1'>
        <p className="or">
  <span className="or-line"></span>
  <span className="or-text">or</span>
</p>

        <button className="noaccount" onClick={handleRegisterClick}>New User? Register here</button>
        <button className="google1" onClick={handleGoogleLogin}>
          <span className="google-icon1">
          </span>
          Sign in with Google
        </button>
        </div>
      </div>
      {isUserSignedIn && (
<div className="dropdown">
        <img src={profilePictureUrl} alt="Avatar" className="avatar" onClick={toggleDropdown}></img>    
        <div className="welcome-message">
          Welcome, {displayName}!
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            <li>Account</li>
            <li>Settings</li>
            <li onClick={handleSignOut}>Logout</li>
          </ul>
        )}
      </div>
      )}
    </div>
  );
};

export default Login;
