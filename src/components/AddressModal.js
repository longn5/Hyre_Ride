import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-simple-datepicker';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import 'react-simple-datepicker/dist/index.css';
import * as authActionCreators from '../actions/auth';
import './Address.css';

class AddressModal extends React.Component {
  state = {
    address: '',
    city: '',
    zip: '',
    number: '',
    state: 'OR',
    states: [
      {value: 'OR', display: 'Oregon'},
      {value: 'WA', display: 'Washington'},
      {value: 'NV', display: 'Nevada'},
      {value: 'CA', display: 'California'}
    ]
  }
  saveInfo = () => {
    let data = {
      address: this.state.address,
      city: this.state.city,
      zip: this.state.zip,
      number: this.state.number,
      state: this.state.state
    };

    if (data.address) {
      this.props.onSave(data);
    }
  }

  onSelectChange = (event) => {
    this.setState({
      state: event.target.value
    });
  }

  render() {
    return (
      <div className="addressmodal-container">
        <div className="addressmodal">
        <div className="addressDatePicker">
        <span style={{color: 'white', marginTop: '8px'}}>Select Pickup Date: </span>
        <DatePicker date={new Date()} />
        <span style={{color: 'white', marginLeft: '10px', marginTop: '8px'}}>Select Pickup Time: </span>
        <TimePicker/>
        </div>
        <div className="addressmodalContent">
          <div className="addressBottomMargin">
            <span className="addressLeftPadding">Address:</span>
            <span>
            <input
              value={this.state.address}
              onChange={event => this.setState({address: event.target.value})} />
              </span>
          </div>
          <div  className="addressBottomMargin">
          <span className="addressLeftPadding">State:</span>
          <span className="addressLeftPadding" >
            <select value={this.state.state} onChange={this.onSelectChange}>
              {this.state.states.map(state => (
                <option key={state.value} value={state.value}>{state.display}</option>)
              )}
            </select>
          </span>
          <span className="addressLeftPadding">City:</span>
          <span className="addressLeftPadding">
            <input
              value={this.state.city}
              onChange={event => this.setState({city: event.target.value})} />
          </span>
          </div>
          <div  className="addressBottomMargin">
          <span className="addressLeftPadding">Zip Code:</span>
          <span className="addressLeftPadding">
            <input
              value={this.state.zip}

              maxLength="5"
              onChange={event => this.setState({zip: event.target.value})} />
          </span>
          {this.props.number &&
            <span>
              <span className="addressLeftPadding" >Phone Number:</span>
              <span>
                <input

                  value={this.state.number}
                  maxLength="10"
                  onChange={event => this.setState({number: event.target.value})} />
              </span>
              </span>
          }
          </div>
        </div>
          <div>
            <div className="address-buttons">
              <span onClick={this.props.onClose} className="address-button" >Cancel</span>
              <span style={{marginRight: '10px'}}  className="address-button" onClick={this.saveInfo}>Done</span>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressModal);
