import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActionCreators from '../actions/auth';
import './Package.css';

class Package extends React.Component {
  render() {
    return (
      <div className="package-container">
        <div className="package">
          <img
            width={250}
           src="http://www.terlatovineyards.com/sites/default/files/slideshow/vineyard-grapes-home-slideshow.jpg" />
           <div>
            Some description about the winery here.
           </div>
           <div>
              Select this winery for the tour
              <input type="checkbox" />
           </div>

           <div>
           <span>Done</span>
           <span>Cancel</span>
           </div>
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Package);
