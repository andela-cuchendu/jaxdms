import React, {PropTypes} from 'react';

/**
 * Represents a Button
 * @param {string} name - Name of the button
 * @param {string} text - Tesxt on the button
 * @param {function} action - The onclick action
 * @param {string} newClass - Style class name
 * @return {ReactElemet}
 */
const Button = ({name, text, action, newClass}) => {
  return (
    <button
      className={`btn waves-effect waves-light ${newClass}`}
      type='submit' onClick={action}
      name={name}>
      {text}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  newClass: PropTypes.string
};

export default Button;