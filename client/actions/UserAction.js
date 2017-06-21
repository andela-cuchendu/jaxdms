import * as ActionTypes from './ActionTypes';
import { BaseApi } from '../api/BaseApi';

export function createUser(user) {
  return {
    type: ActionTypes.CREATE_USER,
    data: user,
  };
}

export function UserDeleted() {
  return {
    type: ActionTypes.USER_DELETE_SUCCESS,
    data: {
      Deleted: true,
    },
  };
}

export function editPage(userData) {
  const editData = {
    firstname: userData.firstname,
    lastname: userData.lastname,
  };
  return {
    type: ActionTypes.EDIT_PAGE,
    data: {
      editUserData: editData,
    },
  };
}

export function EditData(userId) {
  return (dispatch) => {
    const url = `/api/users/${userId}`;
    return BaseApi(null, 'get', url)
    .then((apiResult) => {
      return dispatch(editPage(apiResult));
    });
  };
}

export function VoidEditSuccess() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATED_USER_DATA,
      data: { editSuccess: false },
    });
  };
}

export function editSuccess() {
  return {
    type: ActionTypes.UPDATED_USER_DATA,
    data: {
      editPreLoader: true,
      editSuccess: true,
      editUserData: {
        firstname: '',
        lastname: '',
      },
    },
  };
}

export function updatingUserData() {
  return {
    type: ActionTypes.UPDATING_USER_DATA,
    data: {
      editPreLoader: false,
    },
  };
}

export function upadateUser(newUserData, userId) {
  return (dispatch) => {
    dispatch(updatingUserData());
    const url = `/api/users/${userId}`;
    return BaseApi(newUserData, 'put', url)
    .then(() => {
      dispatch(editSuccess());
    });
  };
}


export function savingUser() {
  return {
    type: ActionTypes.SAVING_USER,
    data: {
      displayLoader: '',
    },
  };
}

export function savedUser() {
  return {
    type: ActionTypes.USER_SUCCESS,
    data: {
      displayLoader: 'hide-element',
      CreateUser: true,
      adminUser: true,
    },
  };
}

export function saveUserSuccess(dispatch) {
  dispatch(savingUser);
  return {
    type: ActionTypes.USER_SUCCESS,
    data: {
      displayLoader: 'hide-element',
      CreateUser: true,
      adminUser: true,
    },
  };
}

export function DefaultUserSuccess() {
  return {
    type: ActionTypes.USER_SUCCESS,
    data: {
      displayLoader: 'hide-element',
      adminUser: false,
      CreateUser: false,
    },
  };
}

export function UsersSuccess(Users) {
  return {
    type: ActionTypes.FETCH_USERS_SUCCESS,
    data: {
      users: Users.rows,
      usersCount: Users.count,
    },
  };
}

export function checkingUser() {
  return {
    type: ActionTypes.LOGIN_USER,
    data: {
      displayLoader: '',
    },
  };
}

export function loginSuccess(loginResult) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    data: {
      shouldRedirect: true,
      displayLoader: 'hide-element',
      userData: loginResult,
    },
  };
}

export function userUpdated(newUserData) {
  return {
    type: ActionTypes.UPDATED_USER_DATA,
    data: {
      editPreLoader: true,
      userData: newUserData.user,
      AppInfo: 'Updated!!!',
      displayFeedBack: 'block',
      AppInfoColor: '#26a69a',
    },
  };
}

export function updateFailed() {
  return {
    type: ActionTypes.USER_FAILED,
    data: {
      editPreLoader: true,
      AppInfo: 'Oops!!! An error occured.',
      displayFeedBack: 'block',
      AppInfoColor: '#dd0404',
    },
  };
}

export function loginFailed(loginResult) {
  return {
    type: ActionTypes.LOGIN_FAIL,
    data: {
      error: loginResult.message,
      displayLoader: 'hide-element',
    },
  };
}

export function saveUserFailed(ErrorMessage) {
  return {
    type: ActionTypes.USER_CREATE_FAILED,
    data: {
      UserError: ErrorMessage,
      displayLoader: 'hide-element',
    },
  };
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

export function saveUserData(user, login) {
  return (dispatch) => {
    const url = '/api/users/';
    return BaseApi(user, 'post', url)
    .then((apiResult) => {
      dispatch(createUser(apiResult));
      if (apiResult.success) {
        Materialize.toast('Account successfully created', 4000);
        if (login === 'true') {
          dispatch(fetchUsers(0, 9));
          return dispatch(saveUserSuccess(dispatch));
        } else {
          return dispatch(loginUser(user));
        }
      }
      return dispatch(saveUserFailed(apiResult.message));
    });
  };
}

export function loginUser(userData) {
  return (dispatch) => {
    dispatch(checkingUser());
    const url = '/api/users/login';
    return BaseApi(userData, 'post', url)
    .then((apiResult) => {
      dispatch(checkLoginResult(apiResult));
    });
  };
}

export function fetchUsers(offset, limit) {
  return (dispatch) => {
    const url = `/api/users?offset=${offset}&limit=${limit}`;
    return BaseApi(null, 'get', url)
    .then((apiResult) => {
      dispatch(UsersSuccess(apiResult));
    });
  };
}

export function ModalData(selectedUser) {
  return {
    type: ActionTypes.MODAL_FOR_DELETE,
    data: {
      deleteUser: selectedUser,
    },
  };
}

export function deleteUserAction(userId) {
  return (dispatch) => {
    const url = `/api/users/${userId}`;
    return BaseApi(null, 'delete', url)
    .then(() => {
      dispatch(UserDeleted());
      if (global.Materialize !== undefined) {
        Materialize.toast('Account successfully deleted', 4000);
      }
      return dispatch(fetchUsers(0, 9));
    });
  };
}