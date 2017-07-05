/* global $ */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RolesActions from '../actions/RolesActions';
import * as UserActions from '../actions/UserAction';
import * as DocActions from '../actions/DocActions';
import * as SearchActions from '../actions/SearchAction';
import SideBar from './SideBar';
import Header from './common/Header';


/**
 *
 * Represents the AppWrapper. This
 * wrapps the connect feature
 * for other components to connect.
 *
 * @param {Component} - React component that conncts
 * to the store via this wrapper
 */
export const AppWrapper = (ChildComponent) => {
  /**
   *
   * @class AppContainer
   * @extends {Component}
   *
   * @description -sets the state with empty data
   */
  class AppContainer extends Component {
    constructor() {
      super();
      this.state = {
        docData: {
          title: '',
          content: '',
          access: -1,
        },
        query: '',
      };

      this.plusClick = this.plusClick.bind(this);
      this.deleteDoc = this.deleteDoc.bind(this);
      this.confirmDelete = this.confirmDelete.bind(this);
      this.OnchangeTinymce = this.OnchangeTinymce.bind(this);
      this.onChangeEvent = this.onChangeEvent.bind(this);
      this.modalSubmitAction = this.modalSubmitAction.bind(this);
      this.searchDoc = this.searchDoc.bind(this);
      this.SharedClick = this.SharedClick.bind(this);
      this.RoleClick = this.RoleClick.bind(this);
      this.logout = this.logout.bind(this);
      this.DocClick = this.DocClick.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
    }

    /**
     * componentWillMount - Called when the app
     * is about to mount. Here, we call the document action
     *
     * @memberOf AppContainer
     */
    componentWillMount() {
      if (!window.localStorage.getItem('token')) {
        this.context.router.push('/auth');
      }
    }

    /**
     * componentWillReceiveProps - Called
     * when the compoenent is reciving props.
     * @param {Object} nextProps - Props from the store
     *
     * @memberOf AppContainer
     */
    componentWillReceiveProps(nextProps) {
      const { docSuccess } = this.props.stateProp.userDocs;
      if (!docSuccess) $('#createModal').closeModal();
      if (nextProps.stateProp.userDocs.redirect) {
        this.props.documentActions.DevoidUser();
        window.localStorage.removeItem('token');
        this.context.router.push('/auth');
      }
    }

    /**
     * Input change event
     *
     * @param {Object} event - contains the calling
     * element and value
     *
     * @memberOf AppContainer
     */
    onChangeEvent(event) {
      event.preventDefault();
      const { name, value } = event.target;
      this.state.docData[name] = value;
    }

    /**
     * Delete document event
     *
     * @param {Object} event - contains the delete
     * element and value
     *
     * @memberOf AppContainer
     */
    deleteDoc(event) {
      event.preventDefault();
      const { id: docId } = this.props.stateProp.userDocs.deleteDoc;
      this.props.documentActions.deleteDocAction(docId);
      $('#deleteDocModal').closeModal();
    }

    /**
     * Delete User event
     *
     * @param {Object} event - contains the delete
     * element and value
     *
     * @memberOf AppContainer
     */
    deleteUser(event) {
      event.preventDefault();
      const userId = this.props.stateProp.userState.deleteUser.id;
      this.props.userActions.deleteUserAction(userId);
      $('#deleteDocModal').closeModal();
    }

    /**
     * Called when the own document
     * link is clicked. Calls action to get own documents
     *
     * @memberOf AppContainer
     */
    DocClick() {
      this.props.documentActions
        .getComponentResources(this.props.stateProp.userState.userInfo, 'own', 0, 9);
      this.context.router.push('/docs');
    }

    /**
     * Called when the logout
     * link is clicked.
     *
     * @param {Object} event
     *
     * @memberOf AppContainer
     */
    logout(event) {
      event.preventDefault();
      window.localStorage.removeItem('token');
      window.localStorage.clear();
      window.location.reload();
      this.context.router.push('/auth');
    }
    /**
     * Called when the Role document
     * link is clicked. Calls action to get role documents
     *
     * @memberOf AppContainer
     */
    RoleClick() {
      this.props.documentActions
        .getComponentResources(this.props.stateProp.userState.userInfo, 'role', 0, 9);
      this.context.router.push('/role');
    }

    /**
     * Called when the search query
     * is submitted.
     *
     * @param {Object} event - contains the search
     * element and value
     *
     * @memberOf AppContainer
     */
    searchDoc(event) {
      const searchValue = event.target.value;
      const roleId = this.props.stateProp.userState.userInfo.role;
      if (event.key === 'Enter') {
        if (searchValue.length < 1) {
          if (global.Materialize !== undefined) {
            global.Materialize.toast('No search value entered', 1000);
          }
        } else {
          const myUrl = this.props.location.pathname;
          let myPath = '/docs';
          if (myUrl.includes('users')){
            this.props.searchActions.searchUsers(searchValue, myUrl);
            myPath = '/users';
          } else {
            this.props.searchActions.searchDoc(searchValue, roleId, myUrl);
          }
          this.context.router.push({
            pathname: myPath,
            query: {
              q: searchValue,
            },
          });
        }
      }
    }

    /**
     * Called when the Public document
     * link is clicked. Calls action to get public document
     *
     * @memberOf AppContainer
     */
    SharedClick() {
      this.props.documentActions
        .getComponentResources(this.props.stateProp.userState.userInfo, 'shar', 0, 9);
      this.context.router.push('/public');
    }

    /**
     * Called when user is deleting document
     *
     * @param {Object} selectedDocumentData -Document data to
     * be deleted
     * @param {Object} user - Specifying user action
     *
     * @memberOf AppContainer
     */
    confirmDelete(selectedDocumentData, user) {
      if (user !== undefined) {
        this.props.userActions.DeleteModalData(selectedDocumentData);
      } else {
        this.props.documentActions.DeleteModalData(selectedDocumentData);
      }
      $('#deleteDocModal').openModal();
    }

    /**
     * Represents tinymce change
     * is submitted.
     *
     * @param {Object} event - contains tinymce
     * element and value
     *
     * @memberOf AppContainer
     */
    OnchangeTinymce(event) {
      const value = event.target.getContent();
      this.state.docData.content = value;
    }

    /**
     * Called when user creation modal
     * is submitted
     *
     * @param {Object} event - contains form
     * element and value
     *
     * @memberOf AppContainer
     */
    modalSubmitAction(event) {
      event.preventDefault();
      const { docData } = this.state;
      const username = this.props.stateProp.userState.userInfo.username;
      this.setState({
        docData: {
          title: '',
          content: '',
          access: -1,
        },
      });

      this.props.documentActions.createDoc(docData, username);
      event.currentTarget.reset();
    }

    /**
     * Represents the plus Icon click
     *
     * @param {Object} event - contains the icon
     * element and value
     *
     * @memberOf AppContainer
     */
    plusClick(event) {
      event.preventDefault();
      this.setState({
        docData: {
          title: '',
          content: '',
          access: -1,
        },
      });
      $('#createModal').openModal();
    }

    render() {
      const User = this.props.stateProp.userState.userInfo;
      const status = (Object.keys(User).length > 0);
      return (
        <div >
          <Header
            LogoutEvent={this.logout}
            UserStatus={status}
            SearchEvent={this.searchDoc}
            User={User}
          />
          <SideBar
            userInfo={User}
            SharedClick={this.SharedClick}
            RoleClick={this.RoleClick}
            DocClick={this.DocClick}
            logout={this.logout}
          />
          <ChildComponent
            deleteDoc={this.deleteDoc}
            onChangeEvent={this.onChangeEvent}
            confirmDelete={this.confirmDelete}
            OnchangeTinymce={this.OnchangeTinymce}
            modalSubmitAction={this.modalSubmitAction}
            plusClick={this.plusClick}
            deleteUser={this.deleteUser}
            {...this.props}
          />
        </div>
      );
    }
  }

  AppContainer.contextTypes = {
    router: PropTypes.object,
  };

  AppContainer.propTypes = {
    stateProp: PropTypes.object.isRequired,
    documentActions: PropTypes.object,
    userActions: PropTypes.object,
    searchActions: PropTypes.object,
    searchDoc: PropTypes.func,
    searchUsers: PropTypes.func,
    pathname: PropTypes.string,
    location: PropTypes.string,
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      documentActions: bindActionCreators(DocActions, dispatch),
      userActions: bindActionCreators(UserActions, dispatch),
      searchActions: bindActionCreators(SearchActions, dispatch),
      roleActions: bindActionCreators(RolesActions, dispatch),
    };
  };

  const mapStateToProps = (state) => {
    return {
      stateProp: {
        userState: state.Users,
        userDocs: state.Doc,
        roles: state.Roles,
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AppContainer);
};
