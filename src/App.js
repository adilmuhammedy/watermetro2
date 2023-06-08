import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Home from './Homepage';
import BookTickets from './bookticket';
import Terminals from './terminals';
import Login from './login';
import Register from './register';
import FareDetails from './fare';
import Confirmation from './confirmation';
import Map1 from './Map1';
import Map2 from './Map2';
import Map3 from './Map3';
import Map4 from './Map4';

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
        <Route path="/Map1" component={Map1} />
        <Route path="/Map2" component={Map2} />
        <Route path="/Map3" component={Map3} />
        <Route path="/Map4" component={Map4} />
      </Switch>
    </Router>
    </>
  );
}
export default App;