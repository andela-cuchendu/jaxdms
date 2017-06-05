import React from 'react';
import {Link} from 'react-router';
import {AppWrapper} from './Appwrapper';

class Home extends React.Component {
  render() {
    return (
      <div className='info-container'>
        <div className="container" id="hero-text-container">
          <div className="row">
            <div className="col s12 center-align">
              <h1 id="hero-title" itemProp="description">
                <span className="bold" >{'Jaxdms    '}</span>
                <span className="flow-text">
                  is your best electronic filing cabinets that provide a 
                  framework for organizing all documents applying
                  access roles as to who views your document</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="center-align">
                <a className="btn btn-large create-list-link hero-btn custom-blue" href="/auth">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AppWrapper(Home,'/');