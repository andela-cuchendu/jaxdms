import React, { PropTypes, Component } from 'react';
import SignUpForm from './common/SignUpForm';

/**
 * Represents Signup
 *
 * @class SignUp
 * @extends {Component}
 */
export class SignUp extends Component {
  /**
   * Creates an instance of SignUp.
   *
   * @memberOf SignUp
   */
  constructor() {
    super();
    this.state = {
      user: {},
      emailError: false,
      confirmPasswordError: false,
      passwordError: false,
      submitResult: false,
    };

    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  /**
   * onChangeEvent - Called when input
   * elemets change
   *
   * @param {Object} event -Dom event
   *
   * @memberOf SignUp
   */
  onChangeEvent(event) {
    this.state.user[event.target.name] = event.target.value;
    this.setState({ user: this.state.user });
  }

  /**
   * toggleSignUp - Toggles between signin
   * and signup pages
   *
   * @param {Object} event -Dom event
   *
   * @memberOf SignUp
   */
  toggleDisplay(event) {
    event.preventDefault();
    this.props.toggleSignUp(this.refs.signUpComponent);
  }

  /**
   * isValidEmail - Checks if the email
   * follows a valid patter
   *
   * @param {string} value - the email
   * to be validated
   * @returns {boolean}
   *
   * @memberOf SignUp
   */
  isValidEmail(value) {
    return /\w+@\w+\.\w+/g.test(value);
  }

  /**
   * isFormValid - Checks if the form
   * is valid
   *
   * @returns {boolean}
   *
   * @memberOf SignUp
   */
  isFormValid() {
    if (!this.state.confirmPasswordError
      && !this.state.emailError
      && !this.state.passwordError) {
      return true;
    }

    return false;
  }

/**
 * validateEmail -Calls isValidEmail
 * to validate email
 *
 * @param {Object} event -Dom
 * @returns {boolean}
 *
 * @memberOf SignUp
 */
  validateEmail(event) {
    const value = event.target.value;

    if (this.isValidEmail(value)) {
      return this.setState({ emailError: false });
    }

    return this.setState({ emailError: true });
  }

  /**
   * confirmPassword -checks the two password
   * inputs
   *
   * @returns {boolean}
   *
   * @memberOf SignUp
   */
  confirmPassword() {
    if (this.state.user.password === this.state.user.confirmPassword) {
      return this.setState({ confirmPasswordError: false });
    }

    return this.setState({ confirmPasswordError: true });
  }

  /**
   * validatePassword - checks to see if
   * is up to 6 characters
   *
   * @param {Object} event
   * @returns {state}
   *
   * @memberOf SignUp
   */
  validatePassword(event) {
    const value = event.target.value;

    this.confirmPassword();
    if (/(\w|\W|\d|\S|\s){6,}/.test(value)) {
      return this.setState({ passwordError: false });
    }

    return this.setState({ passwordError: true });
  }

  /**
   * saveUser - Save the user
   *
   * @param {Object} event
   * @returns {boolean}
   *
   * @memberOf SignUp
   */
  saveUser(event) {
    event.preventDefault();
    if (!this.isFormValid()) {
      return false;
    }

    return this.props.userActions.CreateUserData(this.state.user, event);
  }

  render() {
    const displayLoader = this.props.stateProp.userState.displayLoader;
    const UserError = this.props.stateProp.userState.UserError;
    const roles = this.props.stateProp.roles.roles;
    const NewRoles = [...roles];
    NewRoles.splice(0, 1);
    return (
      <div ref="signUpComponent" className="hide-element signup-container">
        <div className="signup-wrapper">
          <div>Sign up for free</div>
          <div className="small-signup-text">
            Create a free dms account
          </div>
        </div>
        <div className="row">
          <SignUpForm
            changeEvent={this.onChangeEvent}
            saveEvent={this.saveUser}
            emailError={this.state.emailError}
            validEmail={this.validateEmail}
            validPassword={this.validatePassword}
            passwordHasError={this.state.passwordError}
            matchError={this.state.confirmPasswordError}
            errorMessage={UserError}
            showLoader={displayLoader}
            roles={NewRoles}
            matchPassword={this.confirmPassword}
          />
          Existing user?
          <a
            className="btn custom-doc-form custom-blue custom-toggle"
            onClick={this.toggleDisplay}
          >
          Sign in
          </a>
        </div>
      </div>
    );
  }
}
SignUp.defaultProps = {
  stateProp: PropTypes.string,
  roles: PropTypes.string,
};

SignUp.propTypes = {
  toggleSignUp: PropTypes.func.isRequired,
  userActions: PropTypes.string.isRequired,
  stateProp: PropTypes.string,
  roles: PropTypes.string,
};

export default SignUp;
