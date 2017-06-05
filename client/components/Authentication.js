import React, {Component, PropTypes} from 'react';
import AuthContent from './AuthContent.js';
import {AppWrapper} from './Appwrapper';

export class Authentication extends Component {
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
    const bb = this.props;
    return (
      <div>
        <AuthContent
          {...this.props}
          toggleSignUp={this.toggleSignUp}
        />
      </div>
    );
  }
}
Authentication.contextTypes = {
  router: PropTypes.object
};

export default AppWrapper(Authentication,'/auth');
