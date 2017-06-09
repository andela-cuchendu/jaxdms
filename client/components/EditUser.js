import React, {Component, PropTypes} from 'react';
import {AppWrapper} from './Appwrapper';
import EditUserForm from './EditUserForm';


export class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
    };

    this.submitForm             = this.submitForm.bind(this);
    this.onChangeHandler        = this.onChangeHandler.bind(this);
  }

  componentWillMount() { 
    let seletedUser = this.props.stateProp.userState.editUserData;
    const {firstname, lastname} = seletedUser;
    console.log('user will mount', this.props.params)
    this.props.userActions.updatePageWithEditData(parseInt(this.props.params.id));
    this.setState({firstname, lastname});
  }

  componentWillReceiveProps(nextProps) {
    // const {
    //   editSuccess,
    //   editUserData
    // } = nextProps.stateProp.userState;
const editUserData = nextProps.stateProp.userState.editUserData;
const editSuccess = nextProps.stateProp.userState.editSuccess;
    this.state = {
      firstname: editUserData.firstname,
      lastname: editUserData.lastname
    };

    if (editSuccess) {
      Materialize.toast('User updated', 4000);
      this.context.router.push('/user');
    }
  }


  onChangeHandler(event) {
    const {name, value} = event.target;
    this.state[name] = value;
  }

  submitForm(event) {
    event.preventDefault();
    this.props.userActions.upadateUser(this.state, this.props.params.id);
  }
  render() {
    console.log('tired really',this.props.stateProp.userState.editUserData )
const EditProp = this.props.stateProp.userState.editUserData;  
const firstname =  EditProp.firstname;
const lastname = EditProp.lastname;
  
    const {
      userDocs: {
        editPreLoader
      }
    } = this.props.stateProp;


    return (
      <div>
        <div className='content-container'>
          <div className='header-class'>Edit Document</div> 
        <EditUserForm
            preloader={editPreLoader}
            firstname={firstname}
            lastname={lastname}
            submitAction={this.submitForm}
            changeHandler={this.onChangeHandler}
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
  onChangeHandler: PropTypes.func,
  stateProp: PropTypes.object,
  params: PropTypes.object,
  actions: PropTypes.object,
  logoutEvent: PropTypes.func,
  documentActions: PropTypes.object
};

export default AppWrapper(EditUser);