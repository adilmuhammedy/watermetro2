import React, { useState, useEffect } from 'react';
import './fare.css';
import { useHistory } from 'react-router-dom';
import { getAuth,onAuthStateChanged, signOut } from "firebase/auth";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const FareDetails = (props) => {
  const history = useHistory();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [isSymbolHovered, setIsSymbolHovered] = useState(false);
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);
  const [isClockFast, setIsClockFast] = useState(false);
  const [isComfortGiven, setIsComfortGiven] = useState(false);
  const [isEMobility, setIsEMobility] = useState(false);
  const [fare, setFare] = useState(0);
  const [displayName, setDisplayName] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [submitted,setSubmitted] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  
  useEffect(() => {
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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const displayName = user.displayName;
        setDisplayName(displayName);
        setIsUserSignedIn(true);
        const profilePictureUrl = user.photoURL;
        setProfilePictureUrl(profilePictureUrl);
      } else {
        setIsUserSignedIn(false);
        setDisplayName('');
      }
    });
  }, []);
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsUserSignedIn(false);
        setDisplayName('');
        console.log('User signed out successfully');
        alert('User signed out successfully');
        history.push('/');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleHomeClick = () => {
    history.push('/');
  }
  const handleTerminalsClick = () => {
    history.push('/terminals');
  }
  const handleSymbolMouseEnter = () => {
    setIsSymbolHovered(true);
  };
  const handleSymbolMouseLeave = () => {
    setIsSymbolHovered(false);
  };
  const ecofriendlyon = () => {
    setIsEcoFriendly(true);
  };
  const ecofriendlyoff = () => {
    setIsEcoFriendly(false);
  };
  const clockon = () => {
    setIsClockFast(true);
  };
  const clockoff = () => {
    setIsClockFast(false);
  };
  const comforton = () => {
    setIsComfortGiven(true);
  };
  const comfortoff = () => {
    setIsComfortGiven(false);
  };
  const eon = () => {
    setIsEMobility(true);
  };
  const eoff = () => {
    setIsEMobility(false);
  };
  const handleBookTicketsClick = () => {
    history.push('/bookticket');
  }
  const handleFareDetailsClick = () => {
    history.push('/fare');
  }
  const handleLoginClick = () => {
    history.push('/login');
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('From is', from);
    console.log('To is', to); 
    console.log('Ticket type is', ticketType);
    let isValid = true;
    if (from === 'SELECT' || to === 'SELECT' || ticketType === '') {
      alert('Please fill all the fields');
      isValid = false;
    } else if (from === to) {
      alert('Please select different stations');
      isValid = false;
    } else if (
      !(
        (from === 'Kakkanad' && to === 'Vyttila') ||
        (from === 'Vyttila' && to === 'Kakkanad') ||
        (from === 'Highcourt' && to === 'Vypin') ||
        (from === 'Vypin' && to === 'Highcourt')
      )
    ) {
      alert('Selected route is not available, sorry!');
      isValid = false;
    }
    if (isValid) {
      // Calculate the fare based on the selected options
      if (from === "Kakkanad" && to === "Vyttila" && ticketType === "One-way") {
        setFare("30");
      }
      else if (from === "Kakkanad" && to === "Vyttila" && ticketType === "Two-way") {
          setFare("60");
        }
       else if (from === "Vyttila" && to === "Kakkanad" && ticketType === "One-way") {
        setFare("30");
      } else if (from === "Vyttila" && to === "Kakkanad" && ticketType === "Two-way") {
        setFare("60");
      } else if (from === "Highcourt" && to === "Vypin" && ticketType === "One-way") {
        setFare("20");
      } else if (from === "Highcourt" && to === "Vypin" && ticketType === "Two-way") {
        setFare("40");
      } else if (from === "Vypin" && to === "Highcourt" && ticketType === "One-way") {
        setFare("20");
      } else if (from === "Vypin" && to === "Highcourt" && ticketType === "Two-way") {
        setFare("40");
      } else {
        setFare("0"); // Reset the fare if none of the conditions match
      }
      setSubmitted(true);
    }
  };
  return (
    <>
      <div className="Home">
      <img src="https://dl.dropboxusercontent.com/s/zckq71jrgnv4yvf/logo.png?dl=0" className="logo" alt="watermetro" />
        <header className="home-header">
          <h4 className="home" onClick={handleHomeClick}>HOME</h4>
          <h4 className="booktickets" onClick={handleBookTicketsClick}>BOOK TICKETS</h4>
          <h4 className="terminals" onClick={handleTerminalsClick}>TERMINALS</h4>
          <h4 className="faredetails" onClick={handleFareDetailsClick}>FARE DETAILS</h4>
          {!isUserSignedIn && (
        <h4 className="login" onClick={handleLoginClick} >LOGIN</h4>
        )}
        </header>
        <div className="rectangle"></div>
      </div>
      <div className="faredata">
      <h2 className="fare">FARE DETAILS</h2>
      <div className="rect">
        <form onSubmit={handleSubmit}>
          <h2 className="calcu">FARE CALCULATOR</h2>
          <h4 className="from1">FROM</h4>
          <div className='selectf'>
            <select value={from} className="selectfrom1" onChange={(e) => setFrom(e.target.value)}>
            <option value="SELECT">----SELECT----</option>
              <option value="Kakkanad">KAKKANAD</option>
              <option value="Vyttila">VYTTILA</option>
              <option value="Highcourt">HIGHCOURT</option>
              <option value="Vypin">VYPIN</option>
            </select>
          </div>
          <h4 className="to1">TO</h4>
          <div className='selectt'>
            <select value={to} className="selectto1" onChange={(e) => setTo(e.target.value)}>
            <option value="SELECT">----SELECT----</option>
              <option value="Kakkanad">KAKKANAD</option>
              <option value="Vyttila">VYTTILA</option>
              <option value="Highcourt">HIGHCOURT</option>
              <option value="Vypin">VYPIN</option>
            </select>
          </div>
          <h4 className="tickettype1">TICKET-TYPE</h4>
          <div className='typ'>
            <select value={ticketType} className="type1" onChange={(e) => setTicketType(e.target.value)}>
              <option value="">SELECT</option>
              <option value="One-way">One-way</option>
              <option value="Two-way">Two-way</option>
            </select>
          </div>
          <button className="button1"type="submit">Submit</button>
        </form>
        {submitted && (
        <div className="recta">
               <h4 className='metro9' >Kochi Water Metro</h4>
               <img src="https://dl.dropboxusercontent.com/s/d95qgh8emiabc32/logo1.png?dl=0" className="logo1" alt="watermetro1" />
               <p className='place' >{from}</p>
               <p className='place1'>{to}</p>
               <p className='ttype'>Ticket Type: {ticketType}</p>
               <img src="https://dl.dropboxusercontent.com/s/3mlket8ojgqlz51/symbol.png?dl=0" className="symbolll" alt="symbol1"/>

               <p className='time'>Time taken for your journey:20 minutes</p>
        <h3 className="rupee">₹{fare}</h3>
        <div className="icons">
          <div>
          <img
          src={isSymbolHovered ? "https://dl.dropboxusercontent.com/s/tybfl625ng9iokp/symbol-hover.png" : "https://dl.dropboxusercontent.com/s/tybfl625ng9iokp/symbol-hover.png"}
          className={`symbol ${isSymbolHovered ? 'hovered' : ''}`}
          alt="symbol"
            onMouseEnter={handleSymbolMouseEnter}
            onMouseLeave={handleSymbolMouseLeave}
          />
          </div>
          {isSymbolHovered && (
            <p className="related-text">Disable-Friendly</p>
          )}
          <div>
            <img
              src={isEcoFriendly ? "https://dl.dropboxusercontent.com/s/b2c82s75rm4vi7i/ecoFriendly.png?dl=0" : "https://dl.dropboxusercontent.com/s/b2c82s75rm4vi7i/ecoFriendly.png?dl=0"}
              className={`symbol1 ${isEcoFriendly ? 'eco' : ''}`}
              alt="symbol"
              onMouseEnter={ecofriendlyon}
              onMouseLeave={ecofriendlyoff}
            />
          </div>
          {isEcoFriendly && (
            <p className="related-text1">Eco-Friendly</p>
          )}
          <div>
            <img
              src={isClockFast ? "https://dl.dropboxusercontent.com/s/k4mjbcxy07o4o3h/clock.png?dl=0" : "https://dl.dropboxusercontent.com/s/k4mjbcxy07o4o3h/clock.png?dl=0"}
              className={`symbol2 ${isClockFast ? 'fast' : ''}`}
              alt="symbol"
              onMouseEnter={clockon}
              onMouseLeave={clockoff}
            />
          </div>
          {isClockFast && (
            <p className="related-text2">Faster way of travel</p>
          )}
          <div>
            <img
              src={isComfortGiven ? "https://dl.dropboxusercontent.com/s/cjmgdpac34cfhat/comfort.png?dl=0" : "https://dl.dropboxusercontent.com/s/cjmgdpac34cfhat/comfort.png?dl=0"}
              className={`symbol3 ${isComfortGiven ? 'comfort' : ''}`}
              alt="symbol"
              onMouseEnter={comforton}
              onMouseLeave={comfortoff}
            />
          </div>
          {isComfortGiven && (
            <p className="related-text3">Comfort</p>
          )}
          <div>
            <img
              src={isEMobility ? "https://dl.dropboxusercontent.com/s/yli52l2a10chb7s/e-mobility.png?dl=0" : "https://dl.dropboxusercontent.com/s/yli52l2a10chb7s/e-mobility.png?dl=0"}
              className={`symbol4 ${isEMobility ? 'mobility' : ''}`}
              alt="symbol"
              onMouseEnter={eon}
              onMouseLeave={eoff}
            />
          </div>
          {isEMobility && (
            <p className="related-text4">E-Mobility</p>
          )}
        </div>
        </div>
           )}
        {isUserSignedIn && (
          <div className="dropdown1">
            <img src={profilePictureUrl} alt="Avatar" className="avatar1" onClick={toggleDropdown} />
            <div className="welcome-message1">
              Welcome, {displayName}!
            </div>
            {isOpen && (
              <ul className="dropdown-menu1">
                <li>Account</li>
                <li>Settings</li>
                <li onClick={handleSignOut}>Logout</li>
              </ul>
            )}
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default FareDetails;