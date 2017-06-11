import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import * as RolesActions from '../actions/RolesActions';
import * as UserAction from '../actions/UserAction';
import {AppWrapper} from './Appwrapper';
import UsersCard from './common/UsersCard';
import loader from './common/loader';
import SignUpForm from './common/SignUpForm';

export class Users extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      emailError: false,
      confirmPasswordError: false,
      passwordError: false,
      submitResult: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.getSelectedUserForDelete = this.getSelectedUserForDelete.bind(this);
  }  

    componentWillReceiveProps(nextProps) {
console.log('recieve props',this.props.stateProp.userState)
      const {userSuccess} = this.props.stateProp.userState.userCreated;
      if (userSuccess) $('#createModal').closeModal();
    }
  getSelectedUserForDelete(event) {
    const users = this.props.stateProp.userState.users;
    let userIndex = event.target.id;
    let selectedUserData = users[userIndex];
    this.props.confirmDelete(selectedUserData, 'user');
  }

onChangeHandler(event) {
    this.state.user[event.target.name] = event.target.value;
    this.setState({user: this.state.user});
  }

  isValidEmail(value) {
    return /\w+@\w+\.\w+/g.test(value);
  }

  isFormValid() {
    if (!this.state.confirmPasswordError
      && !this.state.emailError
      && !this.state.passwordError) {
      return true;
    }

    return false;
  }

  validateEmail(event) {
    let value = event.target.value;

    if (this.isValidEmail(value)) {
      return this.setState({emailError: false});
    }

    return this.setState({emailError: true});
  }

  confirmPassword() {
    if (this.state.user.password === this.state.user.confirmPassword) {
      return this.setState({confirmPasswordError: false});
    }

    return this.setState({confirmPasswordError: true});
  }

  validatePassword(event) {
    const value = event.target.value;

    this.confirmPassword();
    if (/(\w|\W|\d|\S|\s){6,}/.test(value)) {
      return this.setState({passwordError: false});
    }

    return this.setState({passwordError: true});
  }

  saveUser(event) {
    event.preventDefault();
    if (!this.isFormValid()) {
      return false;
    }
    console.log('caling save user')
    this.props.userActions.saveUserData(this.state.user, 'true');
  }
  
componentWillMount() {
    this.props.userActions
        .fetchUsers();    
        console.log('User state',this.state)
}  

fabClick(event) {
      event.preventDefault();
      this.props.userActions.DefaultUserSuccess;
      this.setState({
        docData: {
          title: '',
          content: '',
          access: []
        }
      });
      $('#createModal').openModal();
    }
  viewUserEvent(event) {
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];
    selectedDocumentData.index = id;

    this.props.documentActions.prepareStoreForDocDetails(selectedDocumentData);
    $('#editDocModal').openModal();
  }

  prepareStoreForEdit(event) {
    console.log('prepare for edit', this.props.stateProp.userDocs.docs[id])
    const {id} = event.target;
    let selectedDocumentData = this.props.stateProp.userDocs.docs[id];

    $('#editDocModal').closeModal();
    this.context.router.push({
      pathname: '/docs/edit/' + selectedDocumentData.id
    });
  }

  render() {
    console.log('user deleting', this.props)
    const DeleteUserProp = this.props.stateProp.userState.deleteUser;
  const UsersProps = this.props.stateProp.userState.users;
  const createUserError = this.props.stateProp.userState.createUserError;
  const roles = this.props.stateProp.roles.roles;
  console.log('our roles', this.props.stateProp)
  console.log('role prop',roles)
  const displayLoader = this.props.stateProp.userState.displayLoader; 
  let cards;
  if (UsersProps.length) {
    cards = UsersProps.map((eachUser, index) => {
      const {id, firstname, lastname, username, email, role, createdAt} = eachUser;
      return (     
        <UsersCard
          key={id + parseInt(100*Math.random())}
          id={id}
          docIndex={index}
          cardType='users'
          user={eachUser}
          userDate={moment(createdAt).fromNow()}
          confirmDelete={this.getSelectedUserForDelete}/>
      );
    });
  } else {
    cards = (
      <div className='center'>Sorry!!! No user found.</div>
    );
  }
     return (
      <div className='row docs'>
        <div className='content-container'>
          <div className='header-class'>
            Users
          </div> 
          <div style={{clear: 'both', overflow: 'auto'}}>
            {cards}
          </div>                  
        </div>        
        <div className='fab'>
          <a onClick={this.props.fabClick}
            className='btn-floating btn-large waves-effect waves-light'>
            <i className='material-icons'>add</i>
          </a>
        </div>  
        <div id='createModal' className='modal modal-fixed-footer'>
          <div className='modal-content'>        
            <SignUpForm
              changeHandler={this.onChangeHandler}
              saveAction={this.saveUser}
              emailHasError={this.state.emailError}
              emailIsValid={this.validateEmail}
              passwordIsVslid={this.validatePassword}
              passwordHasError={this.state.passwordError}
              matchPasswordError={this.state.confirmPasswordError}
              errorMessage={createUserError}
              showLoader={displayLoader}
              roles={roles}
              matchPassword={this.confirmPassword}/> 
          </div>
        </div>

        <div id='deleteDocModal' className='modal modal-fixed-footer'>
          <div className='modal-content'>
            <h4 className='custom-blue-text'>Are you sure you want to detele: {DeleteUserProp.username}?</h4>
          </div>
          <div className='modal-footer'>
            <a className='close-delete-modal modal-action modal-close waves-effect waves-green btn-flat'>No</a>
            <a onClick={this.props.deleteUser}
              className='delete-doc-modal modal-action waves-effect waves-red btn-flat'>Yes</a>
          </div>
        </div>
              
            

      </div>
    );
  }
}

Users.propTypes = {
  deleteDoc: PropTypes.func,
  onClickCheckbox: PropTypes.func,
  onChangeHandler: PropTypes.func,
  fabClick: PropTypes.func,
  OnchangeTinymce: PropTypes.func,
  confirmDelete: PropTypes.func,
  stateProp: PropTypes.object,
  documentActions: PropTypes.object,
  logoutEvent: PropTypes.func,
  modalSubmitAction: PropTypes.func
};

Users.contextTypes = {
  router: PropTypes.object
};
export default AppWrapper(Users);
