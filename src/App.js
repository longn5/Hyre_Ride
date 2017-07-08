import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppNavBar from './components/AppNavBar';
import DriverProfile from './components/DriverProfile';
import ThankYou from './components/Thankyou';
import Packages from './components/Packages';
import Landing from './components/Landing';
import ContactUs from './components/ContactUs';
import About from './components/About';
import DriverInfo from './components/DriverInfo';
import Destinations from './components/Destinations';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" component={Navbar} />
            <Route path="/" exact component={Landing} />
            <Route path="/packages" exact component={Packages} />
            <Route path="/profile/:driverid" exact component={DriverProfile} />
            <Route path="/package/:packageid" exact component={Destinations} />
            <Route path="/thankyou/:client" exact component={ThankYou} />
            <Route path="/about" exact component={About} />
            <Route path="/driver" exact component={DriverInfo} />
            <Route path="/contact" exact component={ContactUs} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
