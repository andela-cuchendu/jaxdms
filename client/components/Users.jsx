import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { AppWrapper } from './AppWrapper.jsx';
import UsersCard from './common/UsersCard.jsx';
import SignUpForm from './common/SignUpForm.jsx';

/**
 * Represents the User
 *
 * @class Users
 * @extends {Component}
 */
export class Users extends Component {

/**
 * Creates an instance of Users.
 *
 * @memberOf Users
 */
  constructor() {
    super();
    this.state = {
      user: {},
      emailError: false,
      confirmPasswordError: false,
      passwordError: false,
      submitResult: false,
      current: 1,
    };

    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.getSelectedUserForDelete = this.getSelectedUserForDelete.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * componentWillMount
   *
   * @memberOf Users
   */
  componentWillMount() {
    this.props.userActions.fetchUsers(0, 9);
  }

  /**
   * onChangeEvent - Called when input
   * elemets change
   *
   * @param {any} event -Dom event
   *
   * @memberOf Users
   */
  onChangeEvent(event) {
    this.state.user[event.target.name] = event.target.value;
    this.setState({ user: this.state.user });
  }

  /**
   * -Used for pagination
   *
   * @param {number} page
   *
   * @memberOf Users
   */
  onChange(page) {
    this.setState({
      current: page,
    });
    this.props.userActions.fetchUsers((page * 9) - 9, 9);
  }
  /**
   * getSelectedUserForDelete - Gets the
   * user data to be deleted
   *
   * @param {any} event -Dom event
   *
   * @memberOf Users
   */

  getSelectedUserForDelete(event) {
    const users = this.props.stateProp.userState.users;
    const userIndex = event.target.id;
    const selectedUserData = users[userIndex];
    this.props.confirmDelete(selectedUserData, 'user');
  }

 /**
   * isValidEmail - Checks if the email
   * follows a valid patter
   *
   * @param {string} value - the email
   * to be validated
   * @returns {boolean}
   *
   * @memberOf Users
   */
  isValidEmail(value) {
    return /\w+@\w+\.\w+/g.test(value);
  }

  /**
   * isFormValid - Checks if the form
   * is valid
   *
   * @returns {boolean}
   *
   * @memberOf Users
   */
  isFormValid() {
    if (!this.state.confirmPasswordError
      && !this.state.emailError
      && !this.state.passwordError) {
      return true;
    }

    return false;
  }

/**
 * validateEmail -Calls isValidEmail
 * to validate email
 *
 * @param {any} event -Dom
 * @returns {boolean}
 *
 * @memberOf Users
 */
  validateEmail(event) {
    const value = event.target.value;

    if (this.isValidEmail(value)) {
      return this.setState({ emailError: false });
    }

    return this.setState({ emailError: true });
  }

  /**
   * confirmPassword -checks the two password
   * inputs
   *
   * @returns {boolean}
   *
   * @memberOf Users
   */
  confirmPassword() {
    if (this.state.user.password === this.state.user.confirmPassword) {
      return this.setState({ confirmPasswordError: false });
    }

    return this.setState({ confirmPasswordError: true });
  }

  /**
   * validatePassword - checks to see if
   * is up to 6 characters
   *
   * @param {any} event
   * @returns {state}
   *
   * @memberOf Users
   */
  validatePassword(event) {
    const value = event.target.value;

    this.confirmPassword();
    if (/(\w|\W|\d|\S|\s){6,}/.test(value)) {
      return this.setState({ passwordError: false });
    }

    return this.setState({ passwordError: true });
  }

  /**
   * saveUser - Save the user
   *
   * @param {any} event
   * @returns {boolean}
   *
   * @memberOf Users
   */
  saveUser(event) {
    event.preventDefault();
    if (!this.isFormValid()) {
      return false;
    }
    return this.props.userActions.saveUserData(this.state.user, 'true');
  }

  /**
   * Represents the plus Icon click
   *
   * @param {any} event - contains the icon
   * element and value
   *
   * @memberOf Users
   */
  plusClick(event) {
    event.preventDefault();
    this.props.userActions.DefaultUserSuccess();
    this.setState({
      docData: {
        title: '',
        content: '',
        access: [],
      },
    });
    $('#createModal').openModal();
  }

  /**
   * viewUserEvent - function to view user details
   *
   * @param {any} event -Dom
   *
   * @memberOf Users
   */
  viewUserEvent(event) {
    const { id } = event.target;
    const selectedDocumentData = this.props.stateProp.userDocs.docs[id];
    selectedDocumentData.index = id;

    this.props.documentActions.prepareStoreForDocDetails(selectedDocumentData);
    $('#editDocModal').openModal();
  }

/**
 * prepareStoreForEdit prepares for editing user data
 *
 * @param {any} event -Dom
 *
 * @memberOf Users
 */
  prepareStoreForEdit(event) {
    const { id } = event.target;
    const selectedDocumentData = this.props.stateProp.userDocs.docs[id];

    $('#editDocModal').closeModal();
    this.context.router.push({
      pathname: `/docs/edit/${selectedDocumentData.id}`
    });
  }

  render() {
    const DeleteUserProp = this.props.stateProp.userState.deleteUser;
    const UsersProps = this.props.stateProp.userState.users;
    const UserError = this.props.stateProp.userState.UserError;
    const roles = this.props.stateProp.roles.roles;
    const displayLoader = this.props.stateProp.userState.displayLoader;
    const userSuccess = this.props.stateProp.userState.CreateUser;
    const total = this.props.stateProp.userState.usersCount;
    if (userSuccess) {
      $('#createModal').closeModal();
      this.props.userActions.DefaultUserSuccess();
    }
    let cards;
    if (UsersProps.length) {
      cards = UsersProps.map((eachUser, index) => {
        const { id, createdAt } = eachUser;
        return (
          <UsersCard
            key={id + (100 * Math.random())}
            id={id}
            docIndex={index}
            cardType="users"
            user={eachUser}
            userDate={moment(createdAt).format('MMMM Do YYYY')}
            confirmDelete={this.getSelectedUserForDelete}
          />
        );
      });
    } else {
      cards = (
        <div className="center">Sorry!!! No user found.</div>
      );
    }
    return (
      <div className="row docs">
        <div className="content-container">
          <div className="header-class">
            Users
          </div>
          <div style={{ clear: 'both', overflow: 'auto' }}>
            {cards}
          </div>
          <Pagination
            showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
            onChange={this.onChange}
            current={this.state.current}
            pageSize={9}
            total={total}
          />
        </div>
        <div className="plus">
          <a
            onClick={this.props.plusClick}
            className="btn-floating btn-large waves-effect waves-light"
          >
            <i className="material-icons">add</i>
          </a>
        </div>
        <div id="createModal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <SignUpForm
              changeEvent={this.onChangeEvent}
              saveEvent={this.saveUser}
              emailError={this.state.emailError}
              validEmail={this.validateEmail}
              validPassword={this.validatePassword}
              passwordHasError={this.state.passwordError}
              matchError={this.state.confirmPasswordError}
              errorMessage={UserError}
              showLoader={displayLoader}
              roles={roles}
              matchPassword={this.confirmPassword}
            />
          </div>
        </div>

        <div id="deleteDocModal" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4 className="custom-blue-text">
              Are you sure you want to detele: {DeleteUserProp.username}?
            </h4>
          </div>
          <div className="modal-footer">
            <a
              className="close-delete-modal modal-action
              modal-close waves-effect waves-green btn-flat"
            >
              No
            </a>
            <a
              onClick={this.props.deleteUser}
              className="delete-doc-modal modal-action
              waves-effect waves-red btn-flat"
            >
              Yes
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  deleteDoc: PropTypes.func,
  onChangeEvent: PropTypes.func,
  plusClick: PropTypes.func,
  OnchangeTinymce: PropTypes.func,
  confirmDelete: PropTypes.func,
  stateProp: PropTypes.object,
  documentActions: PropTypes.object,
  logoutEvent: PropTypes.func,
  modalSubmitAction: PropTypes.func
};

Users.contextTypes = {
  router: PropTypes.object,
};
export default AppWrapper(Users);
