import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActionCreators from '../actions/auth';

class DriverProfile extends React.Component {
  render() {
    return <div>Profile Page</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(DriverProfile);
