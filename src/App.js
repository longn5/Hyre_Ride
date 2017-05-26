import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import DriverProfile from './components/DriverProfile';
import ThankYou from './components/Thankyou';
import Package from './components/Package';
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
            <Route path="/" exact component={Home} />
            <Route path="/profile/:driverid" exact component={DriverProfile} />
            <Route path="/package/:packageid/:driverid" exact component={Package} />
            <Route path="/thankyou" exact component={ThankYou} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
