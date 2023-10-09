import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './userprofile.css';

function Account() {
  
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const history = useHistory();
  const handleHomeClick = () => {
    history.push('/');
  };
  
  const handleBookTicketsClick = () => {
    history.push('/bookticket');
  };
  
  const handleTerminalsClick = () => {
    history.push('/terminals');
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
        {!isUserSignedIn && <h4 className="login">LOGOUT</h4>}
      </header>
      <div className="rectangle"></div>
      <h2 className="book1">MY ACCOUNT</h2>
      <div className="profile">
        <h4 className='nname'>Name</h4>
        <h4 className='eemail'>Email Id</h4>
        <h4 className='pphone'>Mobile Number</h4>
        <h4 className='ppassword'>Password</h4>
      </div>
      
       
    </div>
  );
}

export default Account;
