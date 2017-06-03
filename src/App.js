import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import DriverProfile from './components/DriverProfile';
import ThankYou from './components/Thankyou';
import Packages from './components/Packages';
import Destinations from './components/Destinations';
import './App.css';

class App extends Component {
  state = {
    authed: null
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" component={Navbar} />
            <Route path="/" exact component={Packages} />
            <Route path="/profile/:driverid" exact component={DriverProfile} />
            <Route path="/package/:packageid" exact component={Destinations} />
            <Route path="/thankyou" exact component={ThankYou} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
