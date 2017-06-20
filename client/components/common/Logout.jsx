import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Represents the Logout
 * @param {object} - Object passed as props
 * used in building the logout html tags
 * @return {htmlElements} - Html Elements
 * representing this logout
 */
const Logout = ({ UserStatus, LogoutEvent }) => {
  const text = UserStatus ? 'LOGOUT' : 'SIGN IN';
  return (
    <li activeClassName="active">
      <Link onClick={LogoutEvent} to="#">
        {text}
      </Link>
    </li>
  );
};

Logout.propTypes = {
  UserStatus: PropTypes.bool.isRequired,
  LogoutEvent: PropTypes.func.isRequired,
};

export default Logout;
