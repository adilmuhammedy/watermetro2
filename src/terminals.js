import React,  {useState, useEffect  } from 'react';
import { useHistory } from 'react-router-dom';
import './terminals.css';
import { getAuth,onAuthStateChanged, signOut } from "firebase/auth";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import Map from './Map';


//AIzaSyCfnir-sY46pnn-2hNoU05STZBLi8mokFU
const Terminals = () => {
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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


  const [activeTerminal, setActiveTerminal] = useState(null);

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

  const handleTerminalClick = (terminal) => {
    setActiveTerminal(terminal);
  };

  const renderTerminalDetails = () => {
    switch (activeTerminal) {
      case 'kakkanad':
        return (
          <div className='terminal2'>
            <h3 className='t1'>KAKKANAD </h3>
            <p className='kak'>Kakkanad is a rapidly developing city known for its IT and industrial parks</p>
            <p className='loc'>Terminal Location: Kakkanad, Kochi</p>
            <p className='descrip'>Kakkanad is located near Thrikkakara, the capital of the mythical King Mahabali. The old name of Kakkanad is Kakkanad-Thrikkakara. Bali succeeded Virochana as the king of the Asuras, and his reign over the realm was characterized by peace and prosperity. It is especially notable for its significance in the festival of Onam, and in the tale associated with it linked to the famous Thrikkakara temple. Kakkanad traces it’s history back to the rule of King Mahabali, under who’s rule everyone was equal and prospered. This is true for Kakkanad even today. Being the IT hub of Kochi, it has contributed to the economic progress and development of the city. With young energetic crowd that aspires for a modern lifestyle, Kakkanad is an upcoming hot spot for modern cafés and cosmopolitan culture. Despite the abundance of high rise buildings, the lush green landscape around provides an escape from the monotony of IT life
            </p>
           <img src="https://dl.dropboxusercontent.com/s/30586dblko3okqs/kakkanad.webp?dl=0" className="imgkakka" alt="kakkanad"/>
           <Map/>
          </div>
        );
      case 'vyttila':
        return (
          <div className='terminal2'>
            <h3 className='t1'>VYTTILA</h3>
            <p className='kak'>Largest Mobility Hub connecting various forms of transportation</p>
            <p className='loc'>Terminal Location: Vyttila, Kochi</p>

            <p className='descrip'>The name Vyttila is said to be evolved from the word “Vayal Thala” meaning the main part of the paddy field. Once the area including Elamkulam, were paddy fields and paddy cultivation was the main source of income. The paddy field existed from Ernakulam, Girinagar, Panampilly Nagar, Gandhi Nagar, Jawahar Nagar, Kumarananshan Nagar and extended to Kaniyampuzha and Panamkutyy bridge. Some also say that once there existed a bunch of dacoits, who murdered and looted the travelers, hence the name Vytilla evolved from ‘Vazhithala’. Now, Vytilla has evolved into the busiest as well as one of the largest intersections in Kerala, the most important industrial area of Kerala. Vytilla, as the name suggests, was the center of agriculture famous for paddy fields, and has now evolved into a center for mobility. Housing the Vytilla Mobility Hub, it is well connected to the city and other parts of Kerala. It heeds to the hustle and bustle of the city, while resting on a strong foundation of connectivity. The convergence of different modes of transport is the true essence of the location making it a seamless transit experience. Vytilla enables the people of the city to reach their destinations with no hassle.</p>
          </div>
        );
      case 'highcourt':
        return (
          <div className="terminal2">
            <h3 className='t1'>HIGHCOURT </h3>
            <p className='kak'>The High Court facilitates the needs of the people, with a neutral outlook not just through law and order but also through connectivity to the remote islands of Kochi.</p>
            <p className='loc1'>Terminal Location: Highcourt, Kochi</p>
            <p className='descrip'>The present State of Kerala is result of integrating the erstwhile princely kingdoms of Travancore and Cochin with Malabar district and Kasaragod. The present judicial system in Kerala has its roots dating back to the days of the monarchs of the Kingdoms of Travancore and Cochin. The Ram Mohan Palace used to house the High Court of Kerala until 2006. The heritage building in the art deco style, which was current at the time, was built by Chennai-based architects Prynne, Abbott and Davis. In the early 1940s, during World War II, the palace served as the combined military hospital where British and Indian officers of the British Army recuperated from their injuries. It became the High Court building of the Cochin-Travancore State 1949 onward, and in 1956, following Kerala piravi, it became the High Court of Kerala. At present it houses the offices of the Judicial Academy, ADR Centre and the Vigilance Registrar. In 2006, the Kerala High Court moved to the current building. The High Court empowers and protects the people of the city. It facilitates the needs of the people, with a neutral outlook not just through law and order but also through connectivity to the remote islands of Kochi.</p>
          </div>
        );
      case 'vypin':
        return (
          <div className='terminal2'> 
            <h3 className='t1'>VYPIN</h3>
            <p className='kak'>Vypin is known for its beaches, lagoons, and fishing villages.</p>
            <p className='loc'>Terminal Location: Vypin, Kochi</p>
            <p className='descrip'>The Vypin terminal is located on Vypin Island, which is a popular tourist destination in Kochi. The island is known for its scenic beauty, pristine beaches, and fishing villages. The Vypin terminal is one of the thirty eight terminals that are part of the Phase 1 of the Kochi Water Metro project. The Vypin terminal is expected to provide an efficient and eco-friendly mode of transportation for the residents and visitors of the island. The terminal is expected to have modern facilities such as ticket counters, waiting areas, and other amenities for passengers. The terminal is also expected to have a lift facility for the convenience of passengers. The Vypin terminal is expected to provide seamless connectivity to other modes of transport, such as buses and taxis, to provide a hassle-free travel experience to commuters. The terminal is also expected to have bike rental facilities for visitors who prefer to explore the island on their own. The Vypin terminal is located near several popular tourist destinations on the island, such as the Cherai Beach, the Munambam Fishing Harbor, and the Puthuvype Lighthouse. Visitors can also explore the traditional fishing villages and experience the local culture and lifestyle of the island. The Vypin terminal on the Kochi Water Metro is expected to play a crucial role in promoting sustainable transportation and improving the overall quality of life for the people of Vypin Island.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="Home">
      <header className="home-header">
        <img src="https://dl.dropboxusercontent.com/s/zckq71jrgnv4yvf/logo.png?dl=0" className="logo" alt="watermetro" />
        <h4 className="home" onClick={handleHomeClick}>HOME</h4>
        <h4 className="booktickets" onClick={handleBookTicketsClick}>BOOK TICKETS</h4>
        <h4 className="terminals" onClick={handleTerminalsClick}>TERMINALS</h4>
        <h4 className="faredetails" onClick={handleFareDetailsClick}>FARE DETAILS</h4>
        {!isUserSignedIn && (
        <h4 className="login" onClick={handleLoginClick} >LOGIN</h4>
        )}
      </header>
      <div className="rectangle"></div>
      <h2 className="book1">TERMINALS</h2>

      <div className="rect2">
        
          <h4 className="kakkanad">KAKKANAD</h4>
            <img src="https://dl.dropboxusercontent.com/s/30586dblko3okqs/kakkanad.webp?dl=0" className="imgkakkanad-img" alt="kakkanad" onClick={() => handleTerminalClick('kakkanad')} />

          {activeTerminal === 'kakkanad' && renderTerminalDetails()}

        <div>
          <h4 className="vyttila">VYTTILA</h4>
            <img src="https://dl.dropboxusercontent.com/s/xk3fy1w1ig2q0q0/vytila.jpg?dl=0" className="imgvyttila" alt="vyttila" onClick={() => handleTerminalClick('vyttila')} />
          {activeTerminal === 'vyttila' && renderTerminalDetails()}
        </div>

        <div>
          <h4 className="highcourt">HIGHCOURT</h4>
            <img src="https://dl.dropboxusercontent.com/s/2h28zn63y1j2i2o/high-court.jpg?dl=0" className="imghighcourt" alt="highcourt" onClick={() => handleTerminalClick('highcourt')}/>
          {activeTerminal === 'highcourt' && renderTerminalDetails()}
        </div>

        <div>
          <h4 className="vypin">VYPIN</h4>
            <img src="https://dl.dropboxusercontent.com/s/4k7aonwojyr2b6w/vypin.webp?dl=0" className="imgvypin" alt="vypin" onClick={() => handleTerminalClick('vypin')} />
          {activeTerminal === 'vypin' && renderTerminalDetails()}
        </div>
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
};

export default Terminals;