import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router-dom';
import * as authActionCreators from '../actions/auth';
import './Login.css';

class Login extends React.Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.user) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-page">
        <div className="buttonContainer">
          <div className="loginPageButton">
            <div className="loginPageLoginStuff">
              <div><h3>Ride with us</h3></div>
              <div><h3>Book ahead of time and save</h3></div>
            </div>
            <button
              onClick={this.props.authActions.facebookLogin}
              className="loginBtn loginBtn--facebook">
                Login with Facebook
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return ({
    user: state.auth.user
  });
};

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
