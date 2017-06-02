import React from 'react';
import {Link} from 'react-router';

/**
 * 
 * This class represents Page Not Found.
 * @class PageNotFound
 * @extends {React.Component}
 */
class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <div className='nav-wrapper custom-black'>
            <Link to='/'>
              <div className='logo-name left white-text left-align'>Jaxdms</div>
            </Link>
          </div>
        </nav>
        <div className='not-found'>We are Sorry!!! We did not find the page you are looking for</div>
      </div>
    );
  }
}

export default PageNotFound;