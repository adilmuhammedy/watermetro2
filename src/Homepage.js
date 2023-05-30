import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import logo from 'https://www.dropbox.com/s/zckq71jrgnv4yvf/logo.png?dl=0';
import './Homepage.css';
import { getAuth,onAuthStateChanged, signOut } from "firebase/auth";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
//import metroImage from 'https://www.dropbox.com/s/zdgxbfbv6xzdprb/metro.jpg?dl=0';
//import metro1Image from 'https://www.dropbox.com/s/8nfx0x79lmoaq1j/metro1.jpg?dl=0';
//import metro2Image from 'https://www.dropbox.com/s/76kbq7aafv0uec7/metro2.jpg?dl=0';
//import watermetroImage from 'https://www.dropbox.com/s/fw0zjirgm0jjzke/watermetro.webp?dl=0';
//import watermetro1Image from 'https://www.dropbox.com/s/x5goz7s1e3qastc/watermetro1.jpg?dl=0';
//import watermetro2Image from 'https://www.dropbox.com/s/rw3aafar880to65/watermetro2.jpg?dl=0';
//import avatar from 'https://www.dropbox.com/s/uu2hs3juypnf0rd/avatar.png?dl=0';


function Home() {
  //what is this adilllllllllll
  const [displayName, setDisplayName] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

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
        history.push('/');
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
 
  const Slideshow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const images = [
      "https://dl.dropboxusercontent.com/s/zdgxbfbv6xzdprb/metro.jpg?dl=0",
      "https://dl.dropboxusercontent.com/s/8nfx0x79lmoaq1j/metro1.jpg?dl=0",
      "https://dl.dropboxusercontent.com/s/76kbq7aafv0uec7/metro2.jpg?dl=0",
      "https://dl.dropboxusercontent.com/s/fw0zjirgm0jjzke/watermetro.webp?dl=0",
      "https://dl.dropboxusercontent.com/s/rw3aafar880to65/watermetro2.jpg?dl=0",
      "https://dl.dropboxusercontent.com/s/x5goz7s1e3qastc/watermetro1.jpg?dl=0",
    ];
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 2000); // Change image every 2 seconds
  
      return () => {
        clearInterval(interval); // Clean up the interval on component unmount
      };
    }, []);
   
    return (
      <div>
        <img className="slide-container" src={images[currentImageIndex]} alt="Slideshow" />
      </div>
    );
  };

  return (
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
        {isUserSignedIn && (
        <div className="welcome-message">
 
          Welcome, {displayName}!
          
        </div>
      )}
      </header>
      <div className="rectangle"></div>
      <div className="homepagee">
        <h3 className="metro">Kochi Water Metro</h3>
        <h4 className="heading">Kochi became India's first city to have a Water Metro Project</h4>
        <p className="descri">Kochi, Kerala has become India's first city to have a Water Metro Project after the launch of its first boat in December 2021, namely 'Muziris,' among the 23 battery-powered electric boats being manufactured by Cochin Shipyard Limited.</p>
        <h5 className="boat">75+ <br />E-Boats</h5>
        <h5 className="route">15 Routes</h5>
        <h5 className="kms">75+ Kilometers</h5>
      </div>
      <Slideshow />
      <div class="wave-animation">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2140 154">
    <path d="M-42 8.14544C-32.3049 9.57423 -22.3511 11.5782 -11.9375 14.1053C5.48657 18.3335 22.9106 22.5617 40.3347 23.5144C56.321 24.3885 74.54 20.1505 96.0334 15.1507C123.144 8.84437 155.464 1.32615 195.085 1.32615C223.38 1.32615 247.65 6.43882 271.021 11.3622C306.322 18.7986 339.572 25.8032 381.547 14.1053C451.312 -5.33735 495.074 -4.80044 552.788 16.4625C610.502 37.7254 657.531 33.7537 695.919 24.0776C699.637 23.1405 703.318 22.1583 706.972 21.1832C721.542 17.295 735.694 13.5185 750.145 13.1501C770.401 12.5599 790.657 17.9218 810.913 23.2837C826.808 27.4913 842.703 31.6989 858.598 33.0303C878.702 34.7142 898.805 31.7567 918.908 28.7992C934.956 26.4384 951.003 24.0776 967.051 24.0776C983.75 24.0776 1000.45 26.6341 1017.15 29.1905C1036.6 32.1683 1056.05 35.1462 1075.5 34.0836C1092.93 33.1317 1110.35 28.9073 1127.77 24.6829C1146.5 20.1426 1165.23 15.6024 1183.96 15.125C1211.61 14.3193 1235.48 18.7266 1259.3 23.1232C1288.59 28.5295 1317.79 33.9196 1353.81 29.5808C1373.28 27.236 1391.9 23.4467 1410.26 19.7079C1454.08 10.789 1496.48 2.15706 1545.72 14.1053C1563.14 18.3335 1580.57 22.5617 1597.99 23.5144C1617.44 24.5779 1636.89 21.5974 1656.34 18.6169C1691.34 13.2545 1719.51 13.0608 1754.58 18.2253C1774.69 21.1855 1794.79 24.1456 1814.89 22.4602C1830.79 21.1276 1846.68 16.9162 1862.58 12.7049C1906.26 1.13146 1934.76 1.09298 1977.57 13.4995C1981.51 14.6418 1985.61 15.9191 1989.79 17.2229C2004.76 21.8976 2020.84 26.9135 2034.97 27.2741C2142.25 27.2741 2142.22 29.0645 2140.69 114.567C2140.48 126.117 2140.25 139.194 2140.25 154L-42 154V8.14544Z" />
  </svg>
</div>
<div class="wave-animation2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2140 154">
    <path d="M-42 8.14544C-32.3049 9.57423 -22.3511 11.5782 -11.9375 14.1053C5.48657 18.3335 22.9106 22.5617 40.3347 23.5144C56.321 24.3885 74.54 20.1505 96.0334 15.1507C123.144 8.84437 155.464 1.32615 195.085 1.32615C223.38 1.32615 247.65 6.43882 271.021 11.3622C306.322 18.7986 339.572 25.8032 381.547 14.1053C451.312 -5.33735 495.074 -4.80044 552.788 16.4625C610.502 37.7254 657.531 33.7537 695.919 24.0776C699.637 23.1405 703.318 22.1583 706.972 21.1832C721.542 17.295 735.694 13.5185 750.145 13.1501C770.401 12.5599 790.657 17.9218 810.913 23.2837C826.808 27.4913 842.703 31.6989 858.598 33.0303C878.702 34.7142 898.805 31.7567 918.908 28.7992C934.956 26.4384 951.003 24.0776 967.051 24.0776C983.75 24.0776 1000.45 26.6341 1017.15 29.1905C1036.6 32.1683 1056.05 35.1462 1075.5 34.0836C1092.93 33.1317 1110.35 28.9073 1127.77 24.6829C1146.5 20.1426 1165.23 15.6024 1183.96 15.125C1211.61 14.3193 1235.48 18.7266 1259.3 23.1232C1288.59 28.5295 1317.79 33.9196 1353.81 29.5808C1373.28 27.236 1391.9 23.4467 1410.26 19.7079C1454.08 10.789 1496.48 2.15706 1545.72 14.1053C1563.14 18.3335 1580.57 22.5617 1597.99 23.5144C1617.44 24.5779 1636.89 21.5974 1656.34 18.6169C1691.34 13.2545 1719.51 13.0608 1754.58 18.2253C1774.69 21.1855 1794.79 24.1456 1814.89 22.4602C1830.79 21.1276 1846.68 16.9162 1862.58 12.7049C1906.26 1.13146 1934.76 1.09298 1977.57 13.4995C1981.51 14.6418 1985.61 15.9191 1989.79 17.2229C2004.76 21.8976 2020.84 26.9135 2034.97 27.2741C2142.25 27.2741 2142.22 29.0645 2140.69 114.567C2140.48 126.117 2140.25 139.194 2140.25 154L-42 154V8.14544Z" />
  </svg>
</div>
{isUserSignedIn && (
<div className="dropdown">
        <img src="https://dl.dropboxusercontent.com/s/uu2hs3juypnf0rd/avatar.png?dl=0" alt="Avatar" className="avatar" onClick={toggleDropdown}></img>
       
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
}

export default Home;
