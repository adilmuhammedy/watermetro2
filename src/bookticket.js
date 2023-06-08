import React, {useState, useEffect  } from 'react';
import './bookticket.css';
import { useHistory } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { getAuth,onAuthStateChanged, signOut } from "firebase/auth";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookTicket = (props) => {
  const history = useHistory();
  const [qrCodeData, setQRCodeData] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState("SELECT");
  const [selectedTo, setSelectedTo] = useState("SELECT");
  const [selectedType, setSelectedType] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [date, setDate] = useState("");
  const [displayName, setDisplayName] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
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
    };

    firebase.initializeApp(firebaseConfig);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsUserSignedIn(true);
        const displayName = user.displayName;
        const profilePictureUrl = user.photoURL;
        setDisplayName(displayName);
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
  const handleBookTicketsClick = () => {
    history.push(props.match.path);
  }
  const handleFareDetailsClick = () => {
    history.push('/fare');
  }
  const handleLoginClick = () => {
    history.push('/login');
  }
  const handleFromChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFrom(selectedValue);
  };
  const handleToChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTo(selectedValue);
  };
  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
  };
  const handlePassengerCountChange = (event) => {
    const count = event.target.value;
    setPassengerCount(count);
  };
  const handleSubmit = async (event) => {
    if(!isUserSignedIn){
      alert('Please login to book tickets');
      history.push('/login');
      return
    }
    event.preventDefault();
    const requestBody = {
      from: selectedFrom,
      to: selectedTo,
      ticketType: selectedType,
      nopass: passengerCount,
      date: selectedDateString
    };
    var from=requestBody.from;
    var to=requestBody.to;
    var ticketType=requestBody.ticketType;
    var nopass=requestBody.nopass;
    let isValid = true;
    if(from==='SELECT' ||to==='SELECT' || ticketType==='' || nopass===''){
      alert("Please fill all the fields");
      isValid = false;
    }
    else if(from===to){
      alert('Please select different stations' );
      isValid = false;
    }
    else if(!(
      (from==="Kakkanad" && to==="Vyttila")||
      (from==="Vyttila" && to==="Kakkanad")||
      (from==="Highcourt" && to==="Vypin")||
      (from==="Vypin" && to==="Highcourt"))){
      alert( 'Selected route is not available, sorry!');
      isValid = false;
    }
    else if (parseInt(passengerCount) < 1) {
      alert('Number of passengers cannot be negative or zero');
      isValid = false;
    }
    else{
    history.push({
      pathname: '/confirmation',
      state: {
        from: selectedFrom,
        to: selectedTo,
        ticketType: selectedType,
        nopass: passengerCount,
        date: selectedDateString
      }
    });
    try {
      // Make API call to the backend
      const response = await fetch('http://localhost:4000/bookticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      console.log("Response:", response);
      // Reset the form
      setSelectedFrom("SELECT");
      setSelectedTo("SELECT");
      setSelectedType("");
      setPassengerCount("");
      setDate("");
      // Redirect to the current location
      history.push(props.match.path);
            // Parse the response JSON
           console.log("Response:", response);
           const responseData = await response.json();
            // Set the QR code data
            setQRCodeData(responseData.qrCode);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
      history.push('/confirmation');
  }
  }
  const CustomCalendarContainer = ({ children }) => (
    <div className="calendar-container">{children}</div>
  );
  const selectedDateString = selectedDate ? selectedDate.toLocaleDateString() : "";
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
      <h2 className="book1">BOOK TICKETS</h2>
      <div className="bookfrom">
        <form action="#" onSubmit={handleSubmit}>
          <h4 className="from">From</h4>
          <div className='selectfrom'>
            <select value={selectedFrom} onChange={handleFromChange} className="selectfrom">
              <option value="SELECT">----SELECT----</option>
              <option value="Kakkanad">KAKKANAD</option>
              <option value="Vyttila">VYTTILA</option>
              <option value="Highcourt">HIGHCOURT</option>
              <option value="Vypin">VYPIN</option>
            </select>
          </div>
          <h4 className="to">To</h4>
          <div className='selectto'>
            <select value={selectedTo} onChange={handleToChange} className="selectto">
              <option value="SELECT">----SELECT----</option>
              <option value="Kakkanad">KAKKANAD</option>
              <option value="Vyttila">VYTTILA</option>
              <option value="Highcourt">HIGHCOURT</option>
              <option value="Vypin">VYPIN</option>
            </select>
          </div>
          <h4 className="tickettype">Ticket-type</h4>
          <div className='typ'>
            <select value={selectedType}  className="selecttype" onChange={handleTypeChange}>
             <option value="">SELECT</option>
              <option value="One-way">One-way</option>
              <option value="Two-way">Two-way</option>
            </select>
          </div>
          <h4 className="nopass">No.of Passengers</h4>
            <input 
              type="number"
              placeholder="No.of Passengers"
              className="nopasslist"
              value={passengerCount}
              onChange={handlePassengerCountChange}
            />
            <h4 className="sdate">Date</h4>
            <DatePicker className='dateselect'
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        calendarContainer={CustomCalendarContainer}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        value={selectedDateString}
      />
          <button type="submit" className="submit1">Submit</button>
        </form>
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
      <div className="background-video">
      <video autoPlay loop muted>
        <source src="https://dl.dropboxusercontent.com/s/iqlgvwcjhawdl3t/wmetro.mp4?dl=0" type="video/mp4" />
      </video>
    </div>
    </div>
  );
};

export default BookTicket;
