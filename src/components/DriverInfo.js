import React from 'react';
import './General.css';
import {withRouter} from 'react-router-dom';
import {addNewDriver} from '../actions/driver';
import {InputField} from './Yourinfo';

class DriverInfo extends React.Component {
  state = {
    name: '',
    number: '',
    vmake: '',
    vmodel: '',
    vyear: '',
    rate: '',
    email: ''
  }

  handleClick = (newDriver) => {
    console.log(addNewDriver);
    addNewDriver(this.state).then((data)=> {
      this.props.history.push('/thankyou/driver');
    })
  }

  saveState = ({id, value}) => {
    this.setState({
      [id]: value
    })
  }

  render() {
    return (
      <div id="driver" style={{position: 'relative'}} className="container-fluid">
        <div className="general container">
          <div className="about-us row">
            <div className="col-xs-12">
              <div className="about-us-title container-fluid">Drive With Us</div>
              <div className="container-fluid" style={{paddingBottom: '10px'}}>Fill out the form below to drive with us</div>
              <div className="about-us-text">
                <InputField
                  label={'Full Name'}
                  id="name"
                  value={this.state.name}
                  saveState={this.saveState} />
                  <InputField
                  label={'Email'}
                  id="email"
                  value={this.state.email}
                  saveState={this.saveState} />
                  <InputField
                  label={'Phone Number'}
                  id="number"
                  value={this.state.number}
                  saveState={this.saveState} />
                  <InputField
                  label={'Vehicle Make'}
                  id="vmake"
                  value={this.state.vmake}
                  saveState={this.saveState} />
                  <InputField
                  label={'Vehicle Model'}
                  id="vmodel"
                  value={this.state.vmodel}
                  saveState={this.saveState} />
                  <InputField
                  label={'Vehicle Year'}
                  id="vyear"
                  value={this.state.vyear}
                  saveState={this.saveState} />
                  <InputField
                  label={'Prefered Hourly Rate'}
                  id="rate"
                  value={this.state.rate}
                  saveState={this.saveState} />
                  <div   style={{marginTop: '40px'}} onClick={this.handleClick} className="contact-button">Submit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
export default DriverInfo;
