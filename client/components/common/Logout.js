import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Logout = ({UserStatus, LogoutEvent}) => {
  let text = UserStatus ? 'LOGOUT' : 'SIGN IN';
  return (
    <li activeClassName='active'>
      <Link onClick={LogoutEvent} to='#'>
        {text}
      </Link>
    </li>
  );
};

Logout.propTypes = {
  status: PropTypes.bool.isRequired,
  logoutEvent: PropTypes.func.isRequired
};

export default Logout;
