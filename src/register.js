import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './register.css';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import 'firebase/compat/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [conpass, setConpass] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const history = useHistory();
  const firebaseConfig = {
    apiKey: "AIzaSyCGRG2r6MT-CoPN1d-UVrbwhbyWhg0VGyU",
    authDomain: "watermetro-69ffe.firebaseapp.com",
    projectId: "watermetro-69ffe",
    storageBucket: "watermetro-69ffe.appspot.com",
    messagingSenderId: "405368155649",
    appId: "1:405368155649:web:1ffea291743d7123c7da00",
    measurementId: "G-CREXXM61GJ"
    // Add your Firebase configuration object here
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
        const profilePictureUrl = user.photoURL;
        setProfilePictureUrl(profilePictureUrl);
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
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // Handle successful login
        const user = result.user;
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
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your registration logic here
  };  
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePassChange = (event) => {
    setPass(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleConpassChange = (event) => {
    setConpass(event.target.value);
  };
  const handleHomeClick = () => {
    history.push('/');
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
  const handleFareDetailsClick = () => {
    history.push('/fare');
  };
  return (
    <div className="Home">
      <img
        src="https://dl.dropboxusercontent.com/s/zckq71jrgnv4yvf/logo.png?dl=0"
        className="logo"
        alt="watermetro"
      />
      <header className="home-header">
        <h4 className="home" onClick={handleHomeClick}>
          HOME
        </h4>
        <h4 className="booktickets" onClick={handleBookTicketsClick}>
          BOOK TICKETS
        </h4>
        <h4 className="terminals" onClick={handleTerminalsClick}>
          TERMINALS
        </h4>
        <h4 className="faredetails" onClick={handleFareDetailsClick}>
          FARE DETAILS
        </h4>
        <h4 className="login" onClick={handleLoginClick}>
          LOGIN
        </h4>
      </header>
      <div className="rectangle"></div>
      <h2 className="registerhead">REGISTER</h2>
      <div className="formcontainer">
        <form className="registerform" onSubmit={handleSubmit}>
          <label className="name" htmlFor="name">
            Full name
          </label>
          <input
            className="field2"
            value={name}
            type="text"
            id="name"
            name="name"
            placeholder="full name"
            onChange={handleNameChange}
          />
          <label className="email1" htmlFor="email">
            Email
          </label>
          <input
            className="field3"
            value={email}
            type="email"
            placeholder="abc@gmail.com"
            id="email"
            name="email"
            onChange={handleEmailChange}
          />
          <label className="password1" htmlFor="password">
            Create Password
          </label>
          <input
            className="field4"
            value={pass}
            type="password"
            placeholder="***********"
            id="password"
            name="password"
            onChange={handlePassChange}
          />
          <label className="conpassword" htmlFor="confirmpassword">
            Confirm Password
          </label>
          <input
            className="passfield2"
            value={conpass}
            type="password"
            placeholder="***********"
            id="confirmpassword"
            name="confirmpassword"
            onChange={handleConpassChange}
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>
        <button className="user" onClick={handleLoginClick}>
          Existing user? Login here
        </button>
        <div className='goo'>
        <p className="or1">
  <span className="or-line1"></span>
  <span className="or-text1">or</span>
</p>
        <button className="google1" onClick={handleGoogleLogin}>
          <span className="google-icon1"></span>
          Sign in with Google
        </button>
      </div>
      </div>
      </div>
  );
};
export default Register;
