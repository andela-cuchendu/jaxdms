import React, { Component, PropTypes } from 'react';
import { AppWrapper } from './AppWrapper.jsx';
import EditUserForm from './EditUserForm.jsx';

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
    };

    this.submitForm = this.submitForm.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
  }

  /**
   * componentWillMount
   *
   *
   * @memberOf EditUser
   */
  componentWillMount() {
    const seletedUser = this.props.stateProp.userState.editUserData;
    const { firstname, lastname } = seletedUser;
    this.props.userActions.EditData(parseInt(this.props.params.id));
    this.setState({ firstname, lastname });
  }

  /**
   * componentWillReceiveProps
   *
   * @param {any} nextProps - Props from store
   *
   * @memberOf EditUser
   */
  componentWillReceiveProps(nextProps) {
    const editUserData = nextProps.stateProp.userState.editUserData;
    const editSuccess = nextProps.stateProp.userState.editSuccess;
    this.state = {
      firstname: editUserData.firstname,
      lastname: editUserData.lastname,
    };

    if (editSuccess) {
      this.props.userActions.VoidEditSuccess();
      Materialize.toast('User updated', 4000);
      this.context.router.push('/user');
    }
  }

  /**
   * onChangeEvent - Called when input
   * elemets change
   *
   * @param {any} event -Dom event
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
   * @param {any} event -Dom Event
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
  router: PropTypes.object
};

EditUser.propTypes = {
  onChangeEvent: PropTypes.func,
  stateProp: PropTypes.object,
  params: PropTypes.object,
  actions: PropTypes.object,
  logoutEvent: PropTypes.func,
  documentActions: PropTypes.object
};

export default AppWrapper(EditUser);
