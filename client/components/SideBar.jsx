import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Represents the Side Nav (Menu)
 * @param {object} - Object to build
 * the side nav
 */
const SideBar = ({
  userInfo,
  logout,
  SharedClick,
  RoleClick,
  DocClick,
}) => {
  const firstname = userInfo.firstname;
  const lastname = userInfo.lastname;
  const username = userInfo.username;
  const role = userInfo.role;
  const email = userInfo.email;

  return (
    <ul id="nav-mobile" className="side-nav fixed">
      <li>
        <div
          className="logo-name custom-blue-text left-align"
        >
          Jaxdms
        </div>
      </li>
      <li>
        <div className="user-info-wrapper">
          <div>
            <i className="user-image material-icons">contacts</i>
          </div>
          <div className="username-text center-align">
            <span>{lastname},</span> {firstname}
          </div>
          <div className="center-align">{username}</div>
          <div className="custom-blue-text center-align">{email}</div>
        </div>
      </li>
      <li id="MY_DOCUMENTS" className="bold documents">
        <Link onClick={DocClick} to="/docs">
          <div className="div-neat waves-effect">
            <span>My Documents</span>
          </div>
        </Link>
      </li>
      <li id="SHARED_DOCUMENTS" className="bold shared">
        <Link onClick={SharedClick} to="/public">
          <div className="div-neat waves-effect">
            <span>Public Documents</span>
          </div>
        </Link>
      </li>
      <li id="ROLE_DOCUMENTS" className="bold edit">
        <Link onClick={RoleClick} to="/role">
          <div className="div-neat waves-effect">
            <span>Role Documents</span>
          </div>
        </Link>
      </li>
      {role === 3 ?
        <li id="USERS" className="bold edit">
          <Link to="/users">
            <div className="div-neat waves-effect">
              <span>Users</span>
            </div>
          </Link>
        </li>
      : ''
      }
      <li id="LOGOUT" className="bold edit">
        <Link onClick={logout} to="#">
          <div className="div-neat waves-effect">
            <span>Logout</span>
          </div>
        </Link>
      </li>
    </ul>
  );
};

SideBar.propTypes = {
  userInfo: PropTypes.string.isRequired,
  logout: PropTypes.string.isRequired,
  SharedClick: PropTypes.string.isRequired,
  RoleClick: PropTypes.string.isRequired,
  DocClick: PropTypes.string.isRequired,
};

export default SideBar;
