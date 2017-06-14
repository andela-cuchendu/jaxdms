import React, { PropTypes } from 'react';
import CustomSelect from './CustomSelect';
import CustomTextInput from './CustomTextInput';

/**
 * Represents the Signup Form
 * @param {object} - Object passed as props
 * used in building this
 * @return {htmlElements} - Html Element
 * representing this form
 */
const SignUpForm = ({
  roles,
  changeEvent,
  saveEvent,
  emailError,
  validEmail,
  validPassword,
  passwordHasError,
  matchError,
  matchPassword,
  showLoader,
  errorMessage,
}) => {
  return (
    <form onSubmit={saveEvent} id="sign-up" className="col s12 form-container-space">
      <div className="row">
        <CustomTextInput
          name="firstname"
          type="text"
          id="first_name"
          label="First Name"
          newClass="s6 form-spacing"
          onChangeEvent={changeEvent}
        />
        <CustomTextInput
          name="lastname"
          type="text"
          id="last_name"
          label="Last Name"
          newClass="s6 form-spacing"
          onChangeEvent={changeEvent}
        />
      </div>
      <div className="row">
        <CustomTextInput
          name="email"
          type="email"
          id="email"
          label="Email"
          newClass="s6 form-spacing"
          errorMessage="Invalid email address"
          inputError={emailError}
          validateFunction={validEmail}
          onChangeEvent={changeEvent}
        />
        <CustomSelect
          addedClass="custom-select row"
          name="role"
          size={6}
          selectedValue={3}
          selectData={roles}
          onChangeEvent={changeEvent}
          disabled="Choose your role"
          label="Role"
        />
      </div>
      <div className="row">
        <CustomTextInput
          name="username"
          type="text"
          id="username"
          label="User Name"
          newClass="s6 form-spacing"
          onChangeEvent={changeEvent}
        />
        <CustomTextInput
          name="password"
          type="password"
          id="password"
          label="Password"
          newClass="s6 form-spacing"
          errorMessage="Password must have six or more characters"
          inputError={passwordHasError}
          validateFunction={validPassword}
          onChangeEvent={changeEvent}
        />
      </div>
      <div className="row">
        <CustomTextInput
          name="confirmPassword"
          type="password"
          id="confirm-password"
          label="Confirm Password"
          newClass="s12 form-spacing"
          errorMessage="Password do not match"
          inputError={matchError}
          validateFunction={matchPassword}
          onChangeEvent={changeEvent}
        />
      </div>
      <div className={`${showLoader} custom-loader progress`}>
        <div className="indeterminate" />
      </div>
      <div className="error-span-position error-span">{errorMessage}</div>
      <button
        className="btn waves-effect waves-light custom-blue custom-btn submit-button-spacing"
        name="sign-up"
      >
        SIGN UP
      </button>
    </form>
  );
};

SignUpForm.propTypes = {
  changeEvent: PropTypes.func.isRequired,
  showLoader: PropTypes.string.isRequired,
  saveEvent: PropTypes.func.isRequired,
  emailError: PropTypes.bool.isRequired,
  validEmail: PropTypes.func.isRequired,
  validPassword: PropTypes.func.isRequired,
  passwordHasError: PropTypes.bool.isRequired,
  matchError: PropTypes.bool.isRequired,
  matchPassword: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired
};

export default SignUpForm;
