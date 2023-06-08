import React,  {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './terminals.css';
import { getAuth,onAuthStateChanged, signOut } from "firebase/auth";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import Map1 from './Map1';
import Map2 from './Map2';
import Map3 from './Map3';
import Map4 from './Map4';

const Terminals = () => {
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
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
        history.push('/');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [activeTerminal, setActiveTerminal] = useState('kakkanad');
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
           <img src='https://dl.dropboxusercontent.com/s/7ypxoc0yq704q8f/kakkanad.webp?dl=0' className="imgkakka" alt="kakkanad"/>
           <Map1/>
           <h3 className='nearby'>Nearby Attractions</h3>
           <p className='attractions'>Discover nearby attractions, create memorable experiences, and embark on unforgettable adventures</p>
            <div className="container">
              <div className='cont1'>
           <div className="item">   
    <img src='https://dl.dropboxusercontent.com/s/vrcbago8ldalwzg/kakkanad1.jpg?dl=0' className='h11' alt='k1'/>
    <h5 className='placce1'>Kakkanad</h5>
    <h3 className='locca1'>Kakkanad Info Park</h3>
    <p className='dessc1'>Largest IT park in Kerala</p>
    </div>
    <div className="item">   
    <img src='https://dl.dropboxusercontent.com/s/jakshzs8o2cprxu/kakkanad2.jpg?dl=0' className='h12' alt='k2'/>
    <h5 className='placce2'>Pallikara</h5>
    <h3 className='locca2'>Wonderla</h3>
    <p className='dessc2'>Amusement Parks</p>
    </div>
    <div className="item">   
    <img src='https://dl.dropboxusercontent.com/s/lx7cr3he4axept7/kakkanad3.jpg?dl=0' className='h13' alt='k3'/>
    <h5 className='placce3'>Thrippunithara</h5>
    <h3 className='locca3'>Hill Palace Museum</h3>
    <p className='dessc3'>Museum</p>
    </div>
    <div className="item">   
    <img src='https://dl.dropboxusercontent.com/s/k7ag2bfhay0z3rn/kakkanad4.jpg?dl=0' className='h14' alt='k4'/>
    <h5 className='placce4'>Kochi</h5>
    <h3 className='locca4'>Mangalavanam Bird Sanctuary</h3>
    <p className='dessc4'>Tourist Attraction</p>
    </div>
    <div className="item">   
    <img src='https://dl.dropboxusercontent.com/s/tu60i4xa02d4z9d/kakkanad5.jpg?dl=0' className='h15' alt='k5'/>
    <h5 className='placce5'>Kochi</h5>
    <h3 className='locca5'>Kadambrayar Eco Tourism</h3>
    <p className='dessc5'>Tourist Attraction</p>
    </div>
    <div className="item">   
    <img src='https://dl.dropboxusercontent.com/s/g3huekwstkv3bmd/kakkanad6.jpg?dl=0' className='h16' alt='k6'/>
    <h5 className='placce6'>Kakkanad</h5>
    <h3 className='locca6'>Cochin Special Economic zone</h3>
    <p className='dessc6'>Economic Zone</p>
    </div>
    </div>
    </div>
 </div>
    );
      case 'vyttila':
        return (
          <div className='terminal2'>
            <h3 className='t1'>VYTTILA</h3>
            <p className='kak'>Largest Mobility Hub connecting various forms of transportation</p>
            <p className='loc'>Terminal Location: Vyttila, Kochi</p>
            <p className='descrip'>The name Vyttila is said to be evolved from the word “Vayal Thala” meaning the main part of the paddy field. Once the area including Elamkulam, were paddy fields and paddy cultivation was the main source of income. The paddy field existed from Ernakulam, Girinagar, Panampilly Nagar, Gandhi Nagar, Jawahar Nagar, Kumarananshan Nagar and extended to Kaniyampuzha and Panamkutyy bridge. Some also say that once there existed a bunch of dacoits, who murdered and looted the travelers, hence the name Vytilla evolved from ‘Vazhithala’. Now, Vytilla has evolved into the busiest as well as one of the largest intersections in Kerala, the most important industrial area of Kerala. Vytilla, as the name suggests, was the center of agriculture famous for paddy fields, and has now evolved into a center for mobility. Housing the Vytilla Mobility Hub, it is well connected to the city and other parts of Kerala. It heeds to the hustle and bustle of the city, while resting on a strong foundation of connectivity. The convergence of different modes of transport is the true essence of the location making it a seamless transit experience. Vytilla enables the people of the city to reach their destinations with no hassle.</p>
            <img src='https://dl.dropboxusercontent.com/s/fl5x2cngjqgnypa/vytila.jpg?dl=0' className="imgkakka" alt="vyttila"/>
            <Map2/>
            <h3 className='nearby'>Nearby Attractions</h3>
            <p className='attractions'>Discover nearby attractions, create memorable experiences, and embark on unforgettable adventures</p>
            <div className='container'>
              <div className='cont1'>
    <div className='item'>      
    <img src='https://dl.dropboxusercontent.com/s/xs6xzm2h7rqoy42/vyttila1.jpg?dl=0' className='h11' alt='k11'/>
    <h5 className='placce1'>Edappally</h5>
    <h3 className='locca1'>Lulu Mall</h3>
    <p className='dessc1'>Shopping Mall</p>
    </div> 
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/vzn9j8mzfm6g9ga/vyttila2.jpg?dl=0' className='h12' alt='k2'/>
    <h5 className='placce2'>Vyttila</h5>
    <h3 className='locca2'>Vyttila Mobility Hub</h3>
    <p className='dessc2'>Hub</p>
    </div> 
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/ka9fxw4s7krxppz/vyttila3.jpg?dl=0' className='h13' alt='k3'/>
    <h5 className='placce3'>Kochi</h5>
    <h3 className='locca3'> Fort Kochi</h3>
    <p className='dessc3'>Tourist Attraction</p>
    </div> 
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/2w1mn3ulqr7gnef/vyttila4.jpg?dl=0' className='h14' alt='k4'/>
    <h5 className='placce4'>Thrippunithara</h5>
    <h3 className='locca4'>Hill Palace Museum</h3>
    <p className='dessc4'>Museum</p>
    </div>
    <div className='item'>  
    <img src='https://dl.dropboxusercontent.com/s/vrsajra99i0xejo/vyttila5.jpg?dl=0' className='h15' alt='k5'/>
    <h5 className='placce5'>Kochi</h5>
    <h3 className='locca5'>Marine Drive</h3>
    <p className='dessc5'>Tourist Attraction</p>
    </div> 
    </div>
  </div>
</div>  
        );
      case 'highcourt':
        return (
          <div className="terminal2">
            <h3 className='t1'>HIGHCOURT </h3>
            <p className='kak'>The High Court facilitates the needs of the people, with a neutral outlook not just through law and order but also through connectivity to the remote islands of Kochi.</p>
            <p className='loc1'>Terminal Location: Highcourt, Kochi</p>
            <p className='descrip1'>The present State of Kerala is result of integrating the erstwhile princely kingdoms of Travancore and Cochin with Malabar district and Kasaragod. The present judicial system in Kerala has its roots dating back to the days of the monarchs of the Kingdoms of Travancore and Cochin. The Ram Mohan Palace used to house the High Court of Kerala until 2006. The heritage building in the art deco style, which was current at the time, was built by Chennai-based architects Prynne, Abbott and Davis. In the early 1940s, during World War II, the palace served as the combined military hospital where British and Indian officers of the British Army recuperated from their injuries. It became the High Court building of the Cochin-Travancore State 1949 onward, and in 1956, following Kerala piravi, it became the High Court of Kerala. At present it houses the offices of the Judicial Academy, ADR Centre and the Vigilance Registrar. In 2006, the Kerala High Court moved to the current building. The High Court empowers and protects the people of the city. It facilitates the needs of the people, with a neutral outlook not just through law and order but also through connectivity to the remote islands of Kochi.</p>
            <img src="https://dl.dropboxusercontent.com/s/07g29unxg2j6qjo/high-court.jpg?dl=0"  className="imgkakka" alt="highcourt"/>
            <Map3/>
            <h3 className='nearby'>Nearby Attractions</h3>
            <p className='attractions'>Discover nearby attractions, create memorable experiences, and embark on unforgettable adventures</p>
            <div className="container">
            <div className='cont1'>
            <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/eaq8mi2rmfex6br/highcourt1.jpg?dl=0' className='h11' alt='k1'/>
    <h5 className='placce1'>Marine Drive</h5>
    <h3 className='locca1'>Kerala High Court</h3>
    <p className='dessc1'>Court</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/53qjjf2hsv99azc/high2.jpg?dl=0' className='h12' alt='k2'/>
    <h5 className='placce2'>Kochi</h5>
    <h3 className='locca2'>Marine Drive</h3>
    <p className='dessc2'>Tourist Attraction</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/hcj00uvijhdct3d/high3.jpg?dl=0' className='h13' alt='k3'/>
    <h5 className='placce3'>Bolgatty</h5>
    <h3 className='locca3'>Bolgatty Palace</h3>
    <p className='dessc3'>Palace</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/jux30a9pqamoni8/high4.jpg?dl=0' className='h14' alt='k4'/>
    <h5 className='placce4'>Marine drive</h5>
    <h3 className='locca4'>Rainbow Bridge</h3>
    <p className='dessc4'>Tourist Attraction</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/fixyu3wj2nvbsvm/high5.jpg?dl=0' className='h15' alt='k5'/>
    <h5 className='placce5'>Marine Drive</h5>
    <h3 className='locca5'>Broadway Market</h3>
    <p className='dessc5'>Market</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/sg2u9uezfv6rola/high6.jpg?dl=0' className='h16' alt='k6'/>
    <h5 className='placce6'>Kochi</h5>
    <h3 className='locca6'>Mattancherry</h3>
    <p className='dessc6'>Iconic Place</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/qhy09c0ijmyvivu/high7.jpg?dl=0' className='h17' alt='k7'/>
    <h5 className='placce7'>Fort Kochi</h5>
    <h3 className='locca7'>Chinese Fishing Nets</h3>
    <p className='dessc7'>Tourist Attraction</p>
    </div>
 </div>
</div>
</div> 
        );
      case 'vypin':
        return (
          <div className='terminal2'> 
            <h3 className='t1'>VYPIN</h3>
            <p className='kak'>Vypin is known for its beaches, lagoons, and fishing villages.</p>
            <p className='loc'>Terminal Location: Vypin, Kochi</p>
            <p className='descrip'>The Vypin terminal is located on Vypin Island, which is a popular tourist destination in Kochi. The island is known for its scenic beauty, pristine beaches, and fishing villages. The Vypin terminal is one of the thirty eight terminals that are part of the Phase 1 of the Kochi Water Metro project. The Vypin terminal is expected to provide an efficient and eco-friendly mode of transportation for the residents and visitors of the island. The terminal is expected to have modern facilities such as ticket counters, waiting areas, and other amenities for passengers. The terminal is also expected to have a lift facility for the convenience of passengers. The Vypin terminal is expected to provide seamless connectivity to other modes of transport, such as buses and taxis, to provide a hassle-free travel experience to commuters. The terminal is also expected to have bike rental facilities for visitors who prefer to explore the island on their own. The Vypin terminal is located near several popular tourist destinations on the island, such as the Cherai Beach, the Munambam Fishing Harbor, and the Puthuvype Lighthouse. Visitors can also explore the traditional fishing villages and experience the local culture and lifestyle of the island. The Vypin terminal on the Kochi Water Metro is expected to play a crucial role in promoting sustainable transportation and improving the overall quality of life for the people of Vypin Island.</p>
            <img src='https://dl.dropboxusercontent.com/s/2bqz81uew9ja73l/vypin.webp?dl=0' className="imgkakka" alt="vypin"/>
            <Map4/>
            <h3 className='nearby'>Nearby Attractions</h3>
            <p className='attractions'>Discover nearby attractions, create memorable experiences, and embark on unforgettable adventures</p>
            <div className="container">
            <div className='recttt'>
            <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/q66dfowhcybzse2/vypin1.jpg?dl=0' className='h11' alt='k1'/>
    <h5 className='placce1'>Vypin Island</h5>
    <h3 className='locca1'>Cherai Beach</h3>
    <p className='dessc1'>Beach</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/a6lvtcngsw2ac7v/vypin2.webp?dl=0' className='h12' alt='k2'/>
    <h5 className='placce2'>Puthuvype</h5>
    <h3 className='locca2'>Puthuvype Lighthouse</h3>
    <p className='dessc2'>Light House</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/pnbcjqd5detqyag/vypin3.jpg?dl=0' className='h13' alt='k3'/>
    <h5 className='placce3'>Vypin</h5>
    <h3 className='locca3'>Kuzhupilly Beach</h3>
    <p className='dessc3'>Beach</p>
    </div>
    <div className='item'> 
    <img src='https://dl.dropboxusercontent.com/s/stgki9v81qalb2d/vypin4.jpg?dl=0' className='h14' alt='k4'/>
    <h5 className='placce4'>Vypin</h5>
    <h3 className='locca4'>Chendamangalam Synagogue</h3>
    <p className='dessc4'>Synagogue</p>
    </div>
  </div>
</div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="Home">
      <header className="home-header">
        <img src='https://dl.dropboxusercontent.com/s/zckq71jrgnv4yvf/logo.png?dl=0' className="logo" alt="watermetro" />
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
            <img src='https://dl.dropboxusercontent.com/s/7ypxoc0yq704q8f/kakkanad.webp?dl=0' className="imgkakkanad-img" alt="kakkanad" onClick={() => handleTerminalClick('kakkanad')} />
          {activeTerminal === 'kakkanad' && renderTerminalDetails()}
        <div>
          <h4 className="vyttila">VYTTILA</h4>
            <img src='https://dl.dropboxusercontent.com/s/fl5x2cngjqgnypa/vytila.jpg?dl=0' className="imgvyttila" alt="vyttila" onClick={() => handleTerminalClick('vyttila')} />
          {activeTerminal === 'vyttila' && renderTerminalDetails()}
        </div>
        <div>
          <h4 className="highcourt">HIGHCOURT</h4>
            <img src="https://dl.dropboxusercontent.com/s/07g29unxg2j6qjo/high-court.jpg?dl=0" className="imghighcourt" alt="highcourt" onClick={() => handleTerminalClick('highcourt')}/>
          {activeTerminal === 'highcourt' && renderTerminalDetails()}
        </div>
        <div>
          <h4 className="vypin">VYPIN</h4>
            <img src='https://dl.dropboxusercontent.com/s/2bqz81uew9ja73l/vypin.webp?dl=0' className="imgvypin" alt="vypin" onClick={() => handleTerminalClick('vypin')} />
          {activeTerminal === 'vypin' && renderTerminalDetails()}
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
}
export default Terminals;