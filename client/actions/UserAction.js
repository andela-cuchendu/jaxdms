import * as ActionTypes from './ActionTypes.js';
import {BaseApi} from '../api/BaseApi.js';

export function createUser(user) {
  return {
    type: ActionTypes.CREATE_USER,
    data: user
  };
}export function UserDeleted() {
  console.log('I deleted you')
  return {
    type: ActionTypes.USER_DELETE_SUCCESS,
    data: {
      Deleted: true
    }
  };
}
export function updatePageWithEditData(userId) {
  return (dispatch) => {
    const url = '/api/users/' + userId;
    return BaseApi(null, 'get', url, function (apiResult) {
      console.log('edit user data',apiResult)
      return dispatch(preparePageForEdit(apiResult));
    });
  };
}
export function editUserSuccess() {
  return {
    type: ActionTypes.UPDATED_USER_DATA,
    data: {
      editPreLoader: true,
      editSuccess: true,
      editUserData: {
        firstname: '',
        lastname: ''
      }
    }
  };
}
export function upadateUser(newUserData, userId) {
  return (dispatch) => {
    dispatch(updatingUserData());
    const url = '/api/users/' + userId;
    return BaseApi(newUserData, 'put', url, function () {
      dispatch(editUserSuccess());
    });
  };
}
export function preparePageForEdit(userData) {
  const editData = {
    firstname: userData.firstname,
    lastname: userData.lastname
  }
  console.log('user prepare for edit',editData)
  return {
    type: ActionTypes.PREPARE_EDIT_PAGE,
    data: {
      editUserData: editData
    }
  };
}

export function UserDeletedHandled() {
  console.log('I deleted you and handled')
  return {
    type: ActionTypes.USER_DELETE_HANDLED,
    data: {
      Deleted: false
    }
  };
}

export function savingUser() {
  return {
    type: ActionTypes.SAVING_USER,
    data: {
      displayLoader: '',
      userCreated: false
    }
  };
}

export function saveUserSuccess() {
  console.log('Ending save')
  return {
    type: ActionTypes.SAVE_USER_SUCCESS,
    data: {
      displayLoader: 'hide-element',
      adminUser: true
    }
  };
}

export function DefaultUserSuccess() {
  console.log('defult save')
  return {
    type: ActionTypes.SAVE_USER_SUCCESS,
    data: {
      displayLoader: 'hide-element',
      adminUser: false
    }
  };
}

export function UsersSuccess(Users) {
  return {
    type: ActionTypes.FETCH_USERS_SUCCESS,
    data: {
      users: Users
    }
  };
}

export function checkingUser() {
  return {
    type: ActionTypes.CHECKING_USER,
    data: {
      displayLoader: ''
    }
  };
}

export function loginSuccess(loginResult) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    data: {
      shouldRedirect: true,
      displayLoader: 'hide-element',
      userData: loginResult
    }
  };
}

export function activateSubmit() {
  return {
    type: ActionTypes.ACTIVATE_SUBMIT_BUTTON,
    data: {
      editFormState: false
    }
  };
}

export function userUpdataSuccess(newUserData) {
  return {
    type: ActionTypes.UPDATED_USER_DATA,
    data: {
      editPreLoader: true,
      userData: newUserData.user,
      feedBack: 'Updated!!!',
      displayFeedBack: 'block',
      feedBackColor: '#26a69a'
    }
  };
}

export function userUpdateFailed() {
  return {
    type: ActionTypes.UPDATE_FAILED,
    data: {
      editPreLoader: true,
      feedBack: 'Oops!!! An error occured.',
      displayFeedBack: 'block',
      feedBackColor: '#dd0404'
    }
  };
}

export function updatingUserData() {
  return {
    type: ActionTypes.UPDATING_USER_DATA,
    data: {
      editPreLoader: false
    }
  };
}

export function updatedUserData(newUserData, roles) {
  return (dispatch) => {
    if (newUserData.user) {
      newUserData.user.role = roles[newUserData.user.role - 1];
      return dispatch(userUpdataSuccess(newUserData));
    }

    return dispatch(userUpdateFailed());
  };
}

export function loginFailed(loginResult) {
  console.log('Dispached',loginResult)
  return {
    type: ActionTypes.LOGIN_FAIL,
    data: {
      error: loginResult.message,
      displayLoader: 'hide-element'
    }
  };
}

export function saveUserFailed(ErrorMessage) {
  return {
    type: ActionTypes.CREATE_USER_FAILED,
    data: {
      createUserError: ErrorMessage,
      displayLoader: 'hide-element'
    }
  }
}

export function checkLoginResult(loginData) {
  return (dispatch) => {
    if (loginData.message) {
      dispatch(loginFailed(loginData));
    }

    if (loginData.token) {
      window.localStorage.setItem('token', loginData.token);
      dispatch(loginSuccess(loginData.userData));
    }
  };
}

export function updateUserData(newUserData, id, roles) {
  return (dispatch) => {
    dispatch(updatingUserData());
    const url = '/api/users/' + id;
    return BaseApi(newUserData, 'put', url, function (apiResult) {
      dispatch(updatedUserData(apiResult, roles));
    });
  };
}

export function saveUserData(user,login) {
  return (dispatch) => {
    dispatch(savingUser());
    const url = '/api/users/';
    return BaseApi(user, 'post', url, function (apiResult) {
      dispatch(createUser(apiResult));
      if (apiResult.success) {
        Materialize.toast('Account successfully created', 4000);
        if(login === 'true'){
          console.log('is it true now', login)
          return dispatch(saveUserSuccess);
        } else {
          return dispatch(loginUser(user));
        }
      }
      console.log('is it true failed', apiResult)
      return dispatch(saveUserFailed(apiResult.message));
    });
  };
}

export function loginUser(userData) {
  return (dispatch) => {
    dispatch(checkingUser());
    const url = '/api/users/login';
    return BaseApi(userData, 'post', url, function (apiResult) {
      dispatch(checkLoginResult(apiResult));
    });
  };
}
export function fetchUsers() {
  return (dispatch) => {
    const url = '/api/users';
    return BaseApi(null, 'get', url, function (apiResult) {
      dispatch(UsersSuccess(apiResult));
    });
  };
}
export function createModalData(selectedUser) {
  console.log('create modal data', selectedUser)
  return {
    type: ActionTypes.CREATE_MODAL_FOR_DELETE,
    data: {
      deleteUser: selectedUser
    }
  };
}
export function deleteUserAction(userId) {
  return (dispatch) => {
    const url = '/api/users/' + userId;
    return BaseApi(null, 'delete', url, function (apiResult) {
      console.log('apiResult delete ',apiResult)
       dispatch(UserDeleted());
       Materialize.toast('Account successfully deleted', 4000);
      return dispatch(fetchUsers());
    });
  };
}