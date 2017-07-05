import * as ActionTypes from './ActionTypes';
import CallApi from '../api/BaseApi';

/**
 * createUser - Dispatches
 * createUser action
 *
 * @param {object} user
 * @returns {object}
 */
export function createUser(user) {
  return {
    type: ActionTypes.CREATE_USER,
    data: user,
  };
}

/**
 * UserDeleted - Dispatches
 * UserDeleted action
 *
 * @returns {object}
 */
export function UserDeleted() {
  return {
    type: ActionTypes.USER_DELETE_SUCCESS,
    data: {
      Deleted: true,
    },
  };
}

/**
 * editPage - Dispatches
 * editPage action
 *
 * @param {object} userData
 * @returns {object}
 */
export function editPage(userData) {
  const editData = {
    firstname: userData.firstname,
    lastname: userData.lastname,
    role: userData.role,
  };
  return {
    type: ActionTypes.EDIT_PAGE,
    data: {
      editUserData: editData,
    },
  };
}

/**
 * EditData - Dispatches
 * editPage action
 *
 * @param {object} userId
 * @returns {object}
 */
export function EditData(userId) {
  return (dispatch) => {
    const url = `/api/users/${userId}`;
    return CallApi(null, 'get', url)
    .then(apiResult => dispatch(editPage(apiResult)));
  };
}

/**
 * VoidEditSuccess - Dispatches
 * VoidEditSuccess action
 *
 * @returns {object}
 */
export function VoidEditSuccess() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATED_USER_DATA,
      data: { editSuccess: false },
    });
  };
}

/**
 * editSuccess - Dispatches
 * editSuccess action
 *
 * @returns {object}
 */
export function editSuccess() {
  return {
    type: ActionTypes.UPDATED_USER_DATA,
    data: {
      editPreLoader: true,
      editSuccess: true,
      editUserData: {
        firstname: '',
        lastname: '',
        role: '',
      },
    },
  };
}

/**
 * updatingUserData - Dispatches
 * updatingUserData action
 *
 * @returns {object}
 */
export function updatingUserData() {
  return {
    type: ActionTypes.UPDATING_USER_DATA,
    data: {
      editPreLoader: false,
    },
  };
}

/**
 * upadateUser - Dispatches
 * upadateUser action
 *
 * @param {object} - newUserData
 * @param {number} - userId
 * @returns {object}
 */
export function upadateUser(newUserData, userId) {
  return (dispatch) => {
    dispatch(updatingUserData());
    const url = `/api/users/${userId}`;
    return CallApi(newUserData, 'put', url)
    .then(() => {
      dispatch(editSuccess());
    });
  };
}

/**
 * savingUser - Dispatches
 * savingUser action
 *
 * @returns {object}
 */
export function savingUser() {
  return {
    type: ActionTypes.SAVING_USER,
    data: {
      displayLoader: '',
    },
  };
}

/**
 * savedUser - Dispatches
 * savedUser action
 *
 * @returns {object}
 */
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

/**
 * saveUserSuccess - Dispatches
 * saveUserSuccess action
 *
 * @param {object} dispatch
 * @returns {object}
 */
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

/**
 * DefaultUserSuccess - Dispatches
 * DefaultUserSuccess action
 *
 * @returns {object}
 */
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

/**
 * UsersSuccess - Dispatches
 * UsersSuccess action
 *
 * @param {object} Users
 * @returns {object}
 */
export function UsersSuccess(Users) {
  return {
    type: ActionTypes.FETCH_USERS_SUCCESS,
    data: {
      users: Users.rows,
      usersCount: Users.count,
    },
  };
}

/**
 * checkingUser - Dispatches
 * checkingUser action
 *
 * @returns {object}
 */
export function checkingUser() {
  return {
    type: ActionTypes.LOGIN_USER,
    data: {
      displayLoader: '',
    },
  };
}

/**
 * loginSuccess - Dispatches
 * loginSuccess action
 *
 * @param {object} loginResult
 * @returns {object}
 */
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

/**
 * userUpdated - Dispatches
 * userUpdated action
 *
 * @param {object} newUserData
 * @returns {object}
 */
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

/**
 * updateFailed - Dispatches
 * updateFailed action
 *
 * @returns {object}
 */
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

/**
 * loginFailed - Dispatches
 * loginFailed action
 *
 * @param {object} loginResult
 * @returns {object}
 */
export function loginFailed(loginResult) {
  return {
    type: ActionTypes.LOGIN_FAIL,
    data: {
      error: loginResult.message,
      displayLoader: 'hide-element',
    },
  };
}

/**
 * saveUserFailed - Dispatches
 * saveUserFailed action
 *
 * @param {string} ErrorMessage
 * @returns {object}
 */
export function saveUserFailed(ErrorMessage) {
  return {
    type: ActionTypes.USER_CREATE_FAILED,
    data: {
      UserError: ErrorMessage,
      displayLoader: 'hide-element',
    },
  };
}

/**
 * checkLoginResult - Dispatches
 * checkLoginResult action
 *
 * @param {object} loginData
 * @returns {object}
 */
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

/**
 * CreateUserData - Dispatches
 * CreateUserData action
 *
 * @param {object} user
 * @param {string} login
 * @returns {object}
 */
export function CreateUserData(user, login) {
  return (dispatch) => {
    const url = '/api/users/';
    return CallApi(user, 'post', url)
    .then((apiResult) => {
      dispatch(createUser(apiResult));
      if (apiResult.success) {
        global.Materialize.toast('Account successfully created', 4000);
        if (login === 'true') {
          dispatch(fetchUsers(0, 9));
          return dispatch(saveUserSuccess(dispatch));
        } else {
          dispatch(loginUser(user));
        }
      }
      return dispatch(saveUserFailed(apiResult.message));
    });
  };
}

/**
 * loginUser - Dispatches
 * loginUser action
 *
 * @param {object} userData
 * @returns {object}
 */
export function loginUser(userData) {
  return (dispatch) => {
    dispatch(checkingUser());
    const url = '/api/users/login';
    return CallApi(userData, 'post', url)
    .then((apiResult) => {
      dispatch(checkLoginResult(apiResult));
    });
  };
}

/**
 * fetchUsers - Dispatches
 * fetchUsers action
 *
 * @param {number} offset
 * @param {number} limit
 * @returns {object}
 */
export function fetchUsers(offset, limit) {
  return (dispatch) => {
    const url = `/api/users?offset=${offset}&limit=${limit}`;
    return CallApi(null, 'get', url)
    .then((apiResult) => {
      dispatch(UsersSuccess(apiResult));
    });
  };
}

/**
 * DeleteModalData - Dispatches
 * DeleteModalData action
 *
 * @param {object} selectedUser
 * @returns {object}
 */
export function DeleteModalData(selectedUser) {
  return {
    type: ActionTypes.MODAL_FOR_DELETE,
    data: {
      deleteUser: selectedUser,
    },
  };
}

/**
 * deleteUserAction - Dispatches
 * deleteUserAction action
 *
 * @param {number} userId
 * @returns {object}
 */
export function deleteUserAction(userId) {
  return (dispatch) => {
    const url = `/api/users/${userId}`;
    return CallApi(null, 'delete', url)
    .then(() => {
      dispatch(UserDeleted());
      if (global.Materialize !== undefined) {
        global.Materialize.toast('Account successfully deleted', 4000);
      }
      return dispatch(fetchUsers(0, 9));
    });
  };
}
