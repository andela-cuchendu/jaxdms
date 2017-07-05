import React, { PropTypes } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const LoginImage = require('../images/auth.jpg');

/**
 * This represents the the signin/signup page
 * @param {function} toggleSignUp - function that toggles the
 * signup and signin
 * @param {object} userActions - Object that represents the
 * user actions
 * @param {object} stateProp - Object that represents the state
 * of the component.
 * @return {ReactElement}
 */
const AuthContent = ({ toggleSignUp, userActions, stateProp }) => {
  return (
    <div className="info-wrapper">
      <div className="form-container">
        <SignUp
          userActions={userActions}
          stateProp={stateProp}
          toggleSignUp={toggleSignUp}
        />
        <SignIn
          userActions={userActions}
          stateProp={stateProp}
          toggleSignUp={toggleSignUp}
        />
      </div>
      <div className="login-image">
        <div className="card">
          <div className="card-image">
            <img alt="login" src={LoginImage} />
            <span className="card-title">Jaxified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
AuthContent.defaultProps = {
  userActions: PropTypes.string,
  stateProp: PropTypes.string,
  toggleSignUp: PropTypes.string,
};
AuthContent.propTypes = {
  userActions: PropTypes.string,
  stateProp: PropTypes.string,
  toggleSignUp: PropTypes.string,
};

export default AuthContent;
