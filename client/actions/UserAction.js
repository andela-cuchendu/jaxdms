import * as ActionTypes from './ActionTypes.js';
import {BaseApi} from '../api/BaseApi.js';

export function createUser(user) {
  return {
    type: ActionTypes.CREATE_USER,
    data: user
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
  return {
    type: ActionTypes.SAVE_USER_SUCCESS,
    data: {
      displayLoader: 'hide-element',
      userCreated: true
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
  console.log('before dispatch',loginData);
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

export function saveUserData(user) {
  return (dispatch) => {
    dispatch(savingUser());
    const url = '/api/users/';
    return BaseApi(user, 'post', url, function (apiResult) {
      dispatch(createUser(apiResult));
      console.log( 'saving user data', apiResult);
      if (apiResult.success) {
        Materialize.toast('Account successfully created', 4000);
        return dispatch(loginUser(user));
      }
      
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
