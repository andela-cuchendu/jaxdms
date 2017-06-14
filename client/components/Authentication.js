import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RolesActions from '../actions/RolesActions';
import * as UserActions from '../actions/UserAction';
import AuthContent from './AuthContent';

/**
 * Represents the Login and SignUp pages
 *
 * @class Authentication
 * @extends {Component}
 */
export class Authentication extends Component {
  /**
   * Creates an instance of Authentication.
   * and bind the signup toggle
   * @memberOf Authentication
   */
  constructor() {
    super();
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  /**
   * componentWillMount - Ensures we do not
   * need this page if user is already signed
   * in
   *
   * @memberOf Authentication
   */
  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.context.router.push('/docs');
    }
  }

  /**
   * toggleSignUp - Toggles between signin
   * and signup pages
   *
   * @param {any} dom 
   *
   * @memberOf Authentication
   */
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
          <div className="nav-wrapper custom-black">
            <div className="logo-name left white-text  left-align">Jaxmdms</div>
          </div>
        </nav>
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


const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(UserActions, dispatch),
    roleActions: bindActionCreators(RolesActions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    stateProp: {
      userState: state.Users,
      userDocs: null,
      roles: state.Roles,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

