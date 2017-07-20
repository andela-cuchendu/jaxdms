/* global Materialize */
import React, { Component, PropTypes } from 'react';
import { AppWrapper } from './AppWrapper';
import EditUserForm from './EditUserForm';

/**
 * Represents the Edit User
 *
 * @class EditUser
 * @extends {Component}
 */
export class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      role: '',
    };

    this.submitForm = this.submitForm.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
  }

  /**
   * componentDidMount
   *
   *
   * @memberOf EditUser
   */
  componentDidMount() {
    const seletedUser = this.props.stateProp.userState.editUserData;
    const { firstname, lastname, role } = seletedUser;
    this.props.userActions.editUserData(parseInt(this.props.params.id, 10));
    this.setState({ firstname, lastname, role });
  }

  /**
   * componentWillReceiveProps
   *
   * @param {Object} nextProps - Props from store
   *
   * @memberOf EditUser
   */
  componentWillReceiveProps(nextProps) {
    const editUserData = nextProps.stateProp.userState.editUserData;
    const editSuccess = nextProps.stateProp.userState.editSuccess;
    this.state = {
      firstname: editUserData.firstname,
      lastname: editUserData.lastname,
      role: editUserData.role,
    };

    if (editSuccess) {
      this.props.userActions.voidEditSuccess();
      Materialize.toast('User updated', 4000);
      this.props.documentActions.validateUser('own');
      if (this.props.stateProp.userState.userInfo.role < 3) {
        const UserInfo = this.props.stateProp.userState.userInfo;
        const editDocumentData = this.props.stateProp.userState.editUserData;
        UserInfo.firstname = editDocumentData.firstname;
        UserInfo.lastname = editDocumentData.lastname;
        UserInfo.role = editDocumentData.role;
        this.props.documentActions.updateStoreUSerData(UserInfo);
        this.context.router.push('/docs');
      } else {
        this.context.router.push('/users');
      }
    }
  }

  /**
   * onChangeEvent - Called when input
   * elemets change
   *
   * @param {Object} event -Dom event
   *
   * @memberOf EditUser
   */
  onChangeEvent(event) {
    const { name, value } = event.target;
    this.state[name] = value;
  }

  /**
   * submitForm - Called when the edit
   * document form is submited
   *
   * @param {Object} event -Dom Event
   *
   * @memberOf EditUser
   */
  submitForm(event) {
    event.preventDefault();
    this.props.userActions.upadateUser(this.state, this.props.params.id);
  }

  render() {
    const EditProp = this.props.stateProp.userState.editUserData;
    const firstname = EditProp.firstname;
    const lastname = EditProp.lastname;
    const selectedRole = EditProp.role;
    const roles = this.props.stateProp.roles.roles;
    const {
      userDocs: {
        editPreLoader,
      },
    } = this.props.stateProp;

    return (
      <div>
        <div className="content-container">
          <div className="header-class">Edit User</div>
          <EditUserForm
            preloader={editPreLoader}
            firstname={firstname}
            lastname={lastname}
            roles={roles}
            selectedRole={selectedRole}
            submitAction={this.submitForm}
            changeEvent={this.onChangeEvent}
            formDefaultData={EditProp}
          />
        </div>
      </div>
    );
  }
}

EditUser.contextTypes = {
  router: PropTypes.object,
};
EditUser.propTypes = {
  stateProp: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  userActions: PropTypes.string.isRequired,
  editUserData: PropTypes.string.isRequired,
};

export default AppWrapper(EditUser);
