import React from 'react';
import './confirmation.css';
import { useHistory } from 'react-router-dom';
//import logo from 'https://dl.dropboxusercontent.com/s/zckq71jrgnv4yvf/logo.png?dl=0';
import { useLocation } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
//import symbol1 from 'https://dl.dropboxusercontent.com/s/3mlket8ojgqlz51/symbol.png?dl=0';




    const Confirmation = (props) => {
    const history = useHistory();
    const [fare, setFare] = useState(null);
    const [error, setError] = useState(null);
    const [qrCodeData, setQRCodeData] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [confirmed, setConfirmed] = useState(false);


    
    const location = useLocation();
const { from, to, ticketType, nopass } = location.state  || {};
console.log('Form Values in confirm page:', from, to, ticketType, nopass);

useEffect(() => {
  const fetchFareData = async () => {
    try {
      const response = await fetch('http://localhost:4000/confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ from, to, ticketType, nopass })
      });

      if (response.ok) {
        const data = await response.json();
        const { fare } = data;
        setFare(fare);
      } else {
        console.error('Error fetching fare data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching fare data:', error);
    }
  };

  fetchFareData();
}, []);

console.log('Fare:', fare);


const handleClick = async () => {
  const data = {
    from,
    to,
    ticketType,
    nopass,
    fare
  };

  setQRCodeData(JSON.stringify(data));
  setShowQRCode(true);
  setConfirmed(true);

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
    const handleFareDetailsClick = () => {
      history.push('/fare');
    }
    const handleLoginClick = () => {
      history.push('/login');
    }
// Parse JSON request bodies
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
        <div className="rectangle" ></div>
        <div className="rectan" style={{ display: confirmed ? 'none' : 'block' }}>
        <h2 className="ticket">TICKET DETAILS</h2>
        <h4 className="boarding" id="depart">📍 {from}</h4>
        <h4 className="destination" id="arrive">📍{to}</h4>  
       <h4 className="type">Ticket Type: {ticketType}</h4>
        <h4 className="pass">Total passengers:{nopass}</h4>
        <h4 className="fares">Ticket Fare: {fare} rs</h4>
        <button type="submit" className="sub" onClick={ handleClick}>Confirm</button>
  
      </div>
    
      {confirmed && showQRCode && qrCodeData &&(
        <>
      <QRCode className="qrcode" value={qrCodeData} />
      <div className="finalticket">
      <h4 className="fboarding" id="depart"> {from}</h4>
      <img src="https://dl.dropboxusercontent.com/s/3mlket8ojgqlz51/symbol.png?dl=0" className="symbol8" alt="symbol1"/>
        <h4 className="fdestination" id="arrive">{to}</h4>  
       <h4 className="ftype">Ticket Type: {ticketType}</h4>
        <h4 className="fpass">Total passengers:{nopass}</h4>
        <h4 className="ffares">Ticket Fare: {fare} rs</h4>
        <h5 className="wishes">----Happy Journey----</h5>
      </div>
      </>
    )}

    
    </div>
    );

}                                                                      

export default Confirmation;
