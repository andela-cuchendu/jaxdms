import React, {Component, PropTypes} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import HomeContent from './Content.jsx';
import {DocController} from '../common/documentController';

export class Homepage extends Component {
  constructor() {
    super();

    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.context.router.push('/docs');
    }
  }

  toggleSignUp(dom) {
    $(dom).slideUp('slow', function () {
      if (dom.className === 'signin-container') {
        return $('.signup-container').slideDown('fast');
      }

      return $('.signin-container').slideDown('fast');
    });
  }

  render() {
    return (
      <div>
        <nav>
          <div className='nav-wrapper custom-black'>
            <div className='logo-name left white-text left-align'>Jaxdms</div>
          </div>
        </nav>
        <HomeContent
          {...this.props}
          toggleSignUp={this.toggleSignUp}
        />
        <Footer/>
      </div>
    );
  }
}
Homepage.contextTypes = {
  router: PropTypes.object
};

export default DocController(Homepage);
