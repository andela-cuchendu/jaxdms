import React, { PropTypes } from 'react';
import CustomTextInput from './CustomTextInput';

/**
 * Represents the Signin Form
 * @param {object} - Object passed as props
 * used in building this
 * @return {htmlElements} - Html Element
 * representing this form
 */
const SignInForm = ({
  changeEvent,
  signInAction,
  showLoader,
  errorMessage,
}) => {
  return (
    <form
      onSubmit={signInAction}
      className="form-container-space"
    >
      <div className="row">
        <CustomTextInput
          name="username"
          type="text"
          id="username"
          label="Username"
          newClass="s12 form-spacing"
          onChangeEvent={changeEvent}
        />
      </div>
      <div className="row">
        <CustomTextInput
          name="password"
          type="password"
          id="password"
          label="Password"
          newClass="s12 form-spacing"
          onChangeEvent={changeEvent}
        />
      </div>
      <div className={`progress custom-loader ${showLoader}`}>
        <div className="indeterminate" />
      </div>
      <div className="error-span-position error-span">{errorMessage}</div>
      <button
        className="btn waves-effect waves-light custom-blue custom-btn submit-button-spacing"
        name="sign-in"
      >
        SIGN IN
      </button>
    </form>
  );
};

SignInForm.propTypes = {
  changeEvent: PropTypes.func.isRequired,
  signInAction: PropTypes.func.isRequired,
  showLoader: PropTypes.string,
  errorMessage: PropTypes.string,
  displayForm: PropTypes.bool
};

export default SignInForm;
