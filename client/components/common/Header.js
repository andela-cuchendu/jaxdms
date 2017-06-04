
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
//import SearchField from './searchField';
import Logout from './Logout';

const Header = ({LogoutEvent, UserStatus, SearchEvent, User}) => {
    return (
      <div className='navbar-fixed'>
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
      </div>
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


/*import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
        <nav>
          <div className='nav-wrapper custom-black'>
            <div className='logo-name left white-text font-effect-shadow-multiple left-align'>JAXDMS</div>
                <div className='input-field custom-nav-bar'>
      <input
        id='search'
        placeholder='Search'
        type='search'
        required/>
      <label htmlFor='search'><i className='material-icons'>search</i></label>
      <i className='material-icons'>close</i>
    </div>
          </div>
        </nav>






  /*<nav>
    <div className="nav-wrapper custom-black">
      <a href="#!" className="brand-logo">JAXDMS</a>
      <a href="#" data-activates="mobile-demo" className="button-collapse">
        <i className="material-icons">menu</i></a>
        <form className="right">
        <div className="input-field">
          <input id="search" type="search" required></input>
          <label className="label-icon" for="search"><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
        </div>
      </form>
      <ul className="right hide-on-med-and-down">
        <li><a href="sass.html"><i className="material-icons">search</i></a></li>
        <li><a href="sass.html">Profile</a></li>
        <li><a href="mobile.html">Logout</a></li>
      </ul>
        <form className="right">
        <div className="input-field">
          <input id="search" type="search" required></input>
          <label className="label-icon" for="search"><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
        </div>
      </form>      
      <ul className="side-nav" id="mobile-demo">
        <li><a href="sass.html"><i className="material-icons">search</i></a></li>
        <li><a href="sass.html">Profile</a></li>
        <li><a href="mobile.html">Logout</a></li>
      </ul>
    </div>
  </nav>*/

//   );
// };

// export default Header;*/
