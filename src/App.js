import React, { Component } from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import DriverProfile from './components/DriverProfile';

import './App.css';
import * as authActionCreators from './actions/auth';

const PrivateRoute = ({component: ReactComponent, authed, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      authed ? <ReactComponent {...props} /> :
      <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    )
  }
  />
);

class App extends Component {
  state = {
    authed: null
  }

  render() {
    return (
      <div>
        {this.props.user && <Navbar />}
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute authed={!!this.props.user} path="/" exact component={Home} />
            <Route path="/profile" exact component={DriverProfile} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
