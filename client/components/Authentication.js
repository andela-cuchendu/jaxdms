import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RolesActions from '../actions/RolesActions';
import * as UserActions from '../actions/UserAction';
// import * as documentActions from '../actions/documentAction';
import AuthContent from './AuthContent.js';

export class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      docData: {
        title: '',
        content: '',
        access: []
      },
      searchTerm: ''
    };    
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
    console.log('bbbbbb',this.props.stateProp)
    return (
      <div>
        <nav>
          <div className="nav-wrapper custom-black">
            <div className='logo-name left white-text  left-align'>Jaxmdms</div>
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
      // documentActions: bindActionCreators(documentActions, dispatch),
      // searchActions: bindActionCreators(searchActions, dispatch),
      roleActions: bindActionCreators(RolesActions, dispatch)
    };
  };

  const mapStateToProps = (state) => {
    return {
      stateProp: {
        userState: state.Users,
        userDocs: null,
        roles: state.Roles
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

