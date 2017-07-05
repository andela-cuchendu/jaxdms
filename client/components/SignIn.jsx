import React, { PropTypes, Component } from 'react';
import SignInForm from './common/SignInForm';

/**
 * Represents the Signin
 *
 * @class SignIn
 * @extends {Component}
 */
export class SignIn extends Component {
  /**
   * Creates an instance of SignIn.
   *
   * @memberOf SignIn
   */
  constructor() {
    super();
    this.state = {
      displayForm: 'block',
      displayLoader: 'show-element',
      loginData: {},
    };

    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.signIn = this.signIn.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
  }

  /**
   * componentWillReceiveProps
   *
   * @param {object} nextProps - Props from store
   *
   * @memberOf SignIn
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.stateProp.userState.shouldRedirect) {
      this.context.router.push('/docs');
    }
  }

  /**
   * onChangeEvent - Called when input
   * elemets change
   *
   * @param {Object} event -Dom event
   *
   * @memberOf SignIn
   */
  onChangeEvent(event) {
    this.state.loginData[event.target.name] = event.target.value;
    this.setState({ loginData: this.state.loginData });
  }

  /**
   * signIn - Called when signin
   * form has been submitted
   *
   * @param {Object} event -Dom event
   *
   * @memberOf SignIn
   */
  signIn(event) {
    event.preventDefault();
    this.props.userActions.loginUser(this.state.loginData);
  }

  /**
   * toggleSignUp - Toggles between signin
   * and signup pages
   *
   * @param {Object} event -Dom event
   *
   * @memberOf SignIn
   */
  toggleSignIn(event) {
    event.preventDefault();
    this.props.toggleSignUp(this.refs.signInContainer);
  }

  render() {
    const displayLoader = this.props.stateProp.userState.displayLoader;
    const error = this.props.stateProp.userState.error;
    return (
      <div
        ref="signInContainer"
        style={{ display: this.state.displayForm }}
        className="signin-container"
      >
        <div className="signup-wrapper">
          <div>Sign in</div>
          <div className="small-signup-text signin">
            Sign in to create, share and manage documents.
          </div>
        </div>
        <SignInForm
          changeEvent={this.onChangeEvent}
          errorMessage={error}
          signInAction={this.signIn}
          showLoader={displayLoader}
        />
         New user?
        <a
          className="btn custom-doc-form custom-blue custom-toggle"
          id="sigin-toggle"
          onClick={this.toggleSignIn}
        >
        Sign up
        </a>
      </div>
    );
  }
}
SignIn.defaultProps = {
  stateProp: PropTypes.string,
};
SignIn.propTypes = {
  toggleSignUp: PropTypes.func.isRequired,
  userActions: PropTypes.string.isRequired,
  stateProp: PropTypes.string,
};

SignIn.contextTypes = {
  router: PropTypes.object,
};

export default SignIn;
