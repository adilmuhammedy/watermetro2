import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Home from './Homepage';
import BookTickets from './bookticket';
import Terminals from './terminals';
import Login from './login';
import Register from './register';
import FareDetails from './fare';
import Confirmation from './confirmation';



function App() {
  useEffect(() => {
    document.title = 'Water-Metro'; // Set the desired tab name
  }, []); 
  return (
    <><Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/bookticket" component={BookTickets} />
        <Route path="/terminals" component={Terminals} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/fare" component={FareDetails} />
        <Route path="/confirmation" component={Confirmation}/>
      </Switch>
    </Router>
    </>
    
  );
}

export default App;