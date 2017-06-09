import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

const SideBar = ({
  userData, 
  logout, 
  SharedClick,
  RoleClick,
  DocClick
}) => {
     const firstname = userData.firstname
      const lastname = userData.lastname
      const username = userData.username
      const role = userData.role
      const email = userData.email
    
    return (
      <ul id='nav-mobile' className='side-nav fixed'>
        <li>
          <div
            className='logo-name custom-blue-text left-align'>
            Jaxdms
          </div>
        </li>
        <li>
          <div className='user-info-container'>
            <div>
              <i className='user-image material-icons'>perm_identity</i>
            </div>
            <div className='username-text center-align'>
              <span>{lastname},</span> {firstname}
            </div>
            <div className='center-align'>{username}</div>
            <div className='custom-blue-text center-align'>{email}</div>
          </div>
        </li>
        <li id='MY_DOCUMENTS' className='bold documents'>
          <Link onClick={DocClick} to='/docs'>
            <div className='custom-div waves-effect'>
              <span>My Documents</span>
            </div>
          </Link>
        </li>
        <li id='SHARED_DOCUMENTS' className='bold shared'>
          <Link onClick={SharedClick} to='/shar'>
            <div className='custom-div waves-effect'>
              <span>Public Documents</span>
            </div>
          </Link>
        </li>
        <li id='ROLE_DOCUMENTS' className='bold edit'>
          <Link onClick={RoleClick} to='/role'>
            <div className='custom-div waves-effect'>
              <span>Role Documents</span>
            </div>
          </Link>
        </li>
        {role === 3 ?
        <li id='USERS' className='bold edit'>
          <Link to='/user'>
            <div className='custom-div waves-effect'>
              <span>Users</span>
            </div>
          </Link>
        </li>        
        : ''
        } 
        <li id='LOGOUT' className='bold edit'>
          <Link onClick={logout} to='#'>
            <div className='custom-div waves-effect'>
              <span>Logout</span>
            </div>
          </Link>
        </li>              
      </ul>
    );
};

SideBar.propTypes = {
  userData: PropTypes.object.isRequired
};

export default SideBar;
