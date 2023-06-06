import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './register.css';
//import logo from 'https://www.dropbox.com/s/zckq71jrgnv4yvf/logo.png?dl=0';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [conpass, setConpass] = useState('');
  const history = useHistory();

  const firebaseConfig = {
    // Add your Firebase configuration object here
    apiKey: "AIzaSyCGRG2r6MT-CoPN1d-UVrbwhbyWhg0VGyU",
    authDomain: "watermetro-69ffe.firebaseapp.com",
    projectId: "watermetro-69ffe",
    storageBucket: "watermetro-69ffe.appspot.com",
    messagingSenderId: "405368155649",
    appId: "1:405368155649:web:1ffea291743d7123c7da00",
    measurementId: "G-CREXXM61GJ"
  };
  firebase.initializeApp(firebaseConfig);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Handle successful registration
      const user = userCredential.user;
      console.log('Registered user:', user);
    })
    .catch((error) => {
      // Handle registration error
      console.error('Registration error:', error);
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
  }

  const handleBookTicketsClick = () => {
    history.push('/bookticket');
  }

  const handleTerminalsClick = () => {
    history.push('/terminals');
  }
  const handleLoginClick = () => {
    history.push('/login');
  }
  const handleFareDetailsClick = () => {
    history.push('/fare');
  }

  return (
    <div className="Home">
      <img src="https://dl.dropboxusercontent.com/s/zckq71jrgnv4yvf/logo.png?dl=0" className="logo" alt="watermetro" />
    <header className="home-header">
    <h4 className="home" onClick={handleHomeClick}>HOME</h4>
        <h4 className="booktickets" onClick={handleBookTicketsClick}>BOOK TICKETS</h4>
        <h4 className="terminals" onClick={handleTerminalsClick}>TERMINALS</h4>
        <h4 className="faredetails" onClick={handleFareDetailsClick}>FARE DETAILS</h4>
        <h4 className="login" onClick={handleLoginClick}>LOGIN</h4>
    </header>
    <div className="rectangle"></div>

    <h2 className="registerhead">REGISTER</h2>
    <div className="formcontainer">
      <form className="registerform" onSubmit={handleSubmit}>
        <label className="name" htmlFor="name">Full name</label>

        <input className="field2" 
          value={name}
          type="text"
          id="name" 
          name="name" 
          placeholder="full name"
          onChange={handleNameChange} />
        <label className="email1" htmlFor="email">Email</label>

        <input className="field3" 
           value={email}
           type="email"
           placeholder="abc@gmail.com" 
           id="email"
           name="email" 
           onChange={handleEmailChange} />
        <label className="password1"  htmlFor="password">Create Password</label>

        <input className="field4"
         value={pass} 
         type="password" 
         placeholder="***********" 
         id="password" 
         name="password"
         onChange={handlePassChange} />

        <label className="conpassword"  htmlFor="confirmpassword">Confirm Password</label>

       <input className="passfield2" 
        value={conpass} 
        type="password" 
        placeholder="***********" 
        id="confirmpassword" 
        name="confirmpassword" 
        onChange={handleConpassChange}/>
        <button className="button" type="submit">Register</button>
      </form>
      <button className="user"onClick={handleLoginClick}>Existing user? Login here</button>
    </div>
   
    
     <p className="or">
     <span className="or-line"></span>
     <span className="or-text">OR</span>
    
   </p>
           <button className="google" onClick={handleGoogleLogin}>
             <span className="google-icon">
             </span>
             Sign in with Google
           </button>
           </div>
        
    
  );
};
export default Register;