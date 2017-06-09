
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
//import SearchField from './searchField';
import Logout from './Logout';

const Header = ({LogoutEvent, UserStatus, SearchEvent, User}) => {
    return (
      <div>       
  <nav>
    <div className="nav-wrapper custom-black">
      <Link to='/' >
        <div className='logo-name left white-text  left-align'>Jaxdms</div>
      </Link>
      <a href="#" data-activates="mobile-demo" className="button-collapse">
        <i className="material-icons">menu</i></a>
          {UserStatus ? 
              <div className='input-field custom-nav-bar'>
                <input
                  id='search'
                  placeholder='Search'
                  type='search'
                  onKeyPress={SearchEvent}
                  required/>
                <label htmlFor='search'>
                  <i className='material-icons'>search</i></label>
                <i className='material-icons'>close</i>
              </div>
              : ''}          
      <ul className="right hide-on-med-and-down">      
        {UserStatus ?
        <li activeClassName='active'>
      <Link onClick={LogoutEvent} to='#'>
        Logout
      </Link>
    </li>       
        : ''}
      </ul>
            {UserStatus ?
                        <ul className='side-nav' id='mobile-demo'>
              <li>
                <div
                  className='logo-name custom-blue-text  left-align'>
                  Jaxdms
                </div>
              </li>
              <li>
                <div className='user-info-container'>
                  <div>
                    <i className='user-image material-icons'>perm_identity</i>
                  </div>
                  <div className='username-text center-align'>
                    <span>{User.lastname},</span> {User.firstname}
                  </div>
                  <div className='center-align'>{User.username}</div>
                  <div className='custom-blue-text center-align'>{User.email}</div>
                </div>
              </li>
        <li id='MY_DOCUMENTS' className='bold documents'>
          <Link to='/docs'>
            <div className='custom-div waves-effect'>
              <span>My Documents</span>
            </div>
          </Link>
        </li>
        <li id='SHARED_DOCUMENTS' className='bold shared'>
          <Link to='/shar'>
            <div className='custom-div waves-effect'>
              <span>Public Documents</span>
            </div>
          </Link>
        </li>
        <li id='ROLE_DOCUMENTS' className='bold edit'>
          <Link to='/role'>
            <div className='custom-div waves-effect'>
              <span>Role Documents</span>
            </div>
          </Link>
        </li>
        {User.role === 3 ?
        <li id='USERS' className='bold edit'>
          <Link to='/users'>
            <div className='custom-div waves-effect'>
              <span>Users</span>
            </div>
          </Link>
        </li>        
        : ''
        }  
        <li id='LOGOUT' className='bold edit'>
          <Link onClick={LogoutEvent} to='#'>
            <div className='custom-div waves-effect'>
              <span>Logout</span>
            </div>
          </Link>
        </li>                          
            </ul>
            
            : ''
            }
    </div>
  </nav>
  </div>
      /*<div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper custom-black'>
            <Link to='/' >
              <div className='logo-name left white-text  left-align'>Jaxdms</div>
            </Link>
            <Link to='/' data-activates='mobile-demo' className='button-collapse'>
              <i className='material-icons'>menu</i>
            </Link>
            {UserStatus ? 
                <div className='input-field custom-nav-bar'>
                  <input
                    id='search'
                    placeholder='Search'
                    type='search'
                    onKeyPress={SearchEvent}
                    required/>
                  <label htmlFor='search'><
                  i className='material-icons'>search</i></label>
                  <i className='material-icons'>close</i>
                </div>
               : ''}
            <ul className='right'>
              {UserStatus ? 
                <Logout UserStatus={UserStatus} logoutEvent={LogoutEvent}/> : ''}
            </ul>
            {UserStatus ?
                        <ul className='side-nav' id='mobile-demo'>
              <li>
                <div
                  className='logo-name custom-blue-text  left-align'>
                  Jaxdms
                </div>
              </li>
              <li>
                <div className='user-info-container'>
                  <div>
                    <i className='user-image material-icons'>perm_identity</i>
                  </div>
                  <div className='username-text center-align'>
                    <span>{User.lastname},</span> {User.firstname}
                  </div>
                  <div className='center-align'>{User.username}</div>
                  <div className='center-align'>
                    {User.role}
                  </div>
                  <div className='custom-blue-text center-align'>{User.email}</div>
                </div>
              </li>
              <li id='MY_DOCUMENTS' className='bold documents'>
                <Link to='docs'>
                  <div className='custom-div waves-effect'>
                    <i className='sidebar-icon-position material-icons'>description</i>
                    <span>My Documents</span>
                  </div>
                </Link>
              </li>
              <li id='SHARED_DOCUMENTS' className='bold shared'>
                <Link to='/shared-docs'>
                  <div className='custom-div waves-effect'>
                    <i className='sidebar-icon-position material-icons'>group_work</i>
                    <span>Shared Documents</span>
                  </div>
                </Link>
              </li>
              <li id='EDIT_PROFILE' className='bold edit'>
                <Link to='/profile/edit'>
                  <div className='custom-div waves-effect'>
                    <i className='sidebar-icon-position material-icons'>mode_edit</i>
                    <span>Edit Profile</span>
                  </div>
                </Link>
              </li>
            </ul>
            : ''
            }
          </div>
        </nav>
      </div>*/
    );
};

Header.propTypes = {
  clickEvent: PropTypes.func,
  User: PropTypes.object,
  UserStatus: PropTypes.bool,
  signInEvent: PropTypes.func,
  searchActions: PropTypes.object
};

Header.contextTypes = {
  router: PropTypes.object
};

export default Header;



