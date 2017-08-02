import React from 'react';
import './General.css';
import {withRouter} from 'react-router-dom';
import {addComments} from '../actions/driver';
import {InputField} from './Yourinfo';

class ContactUs extends React.Component {
  state = {
    name: '',
    number: '',
    email: '',
    comment: ''
  }

  handleClick = (newDriver) => {
    addComments(this.state).then((data)=> {
      this.props.history.push('/thankyou/form');
    })
  }

  saveState = ({id, value}) => {
    this.setState({
      [id]: value
    })
  }

  render() {
    return (
      <div id="contact" className="general container-fluid">
            <div className="about-us row">
              <div className ="col-xs-12">
              <div className="about-us-title container-fluid">Contact Us</div>
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
                  <div style={{marginRight: '20px', fontSize: '18px'}}>
                    Comments:
                  </div>
                  <textarea
                  className="form-control textarea-style"
                  //rows="10"
                  //cols="18"
                  maxLength="500"
                  // style={{
                  //   paddingLeft: '15px',
                  //   fontSize: '18px',
                  //   color: 'black',
                  //   position: 'relative'
                  // }}
                  onChange={(event)=> this.setState({comment: event.target.value})}
                  value={this.state.comment} />
                  <div onClick={this.handleClick}
                  style={{marginTop: '20px'}}
                  className="contact-button">Submit</div>
                </div>
              </div>
            </div>
          </div>

    );
  }
}
export default ContactUs;
