import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router-dom';
import * as authActionCreators from '../actions/auth';

class Login extends React.Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.user) {
      return <Redirect to={from} />;
    }

    return <div onClick={this.props.authActions.facebookLogin}>LOGIN HERE</div>;
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
