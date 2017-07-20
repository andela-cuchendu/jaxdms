import * as ActionTypes from './ActionTypes';
import CallApi from '../api/BaseApi';

/**
 * createUser - Updates store with new user information
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
 * voidUserError - Updates store by clearing user error
 *
 * @returns {object}
 */
export function voidUserError() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VOID_USER_ERROR,
      data: { error: null,
        displayLoader: 'hide-element',
        UserError: null,
      },
    });
  };
}
/**
 * userDeleted - Informs the store that user delete was successful
 *
 * @returns {object}
 */
export function userDeleted() {
  return {
    type: ActionTypes.USER_DELETE_SUCCESS,
    data: {
      Deleted: true,
    },
  };
}

/**
 * editPage - Prepares page for userdata editing
 * editPage action
 *
 * @param {object} userData
 * @returns {object}
 */
export function editPage(userData) {
  const editUsersData = {
    firstname: userData.firstname,
    lastname: userData.lastname,
    role: userData.role,
  };
  return {
    type: ActionTypes.EDIT_PAGE,
    data: {
      editUserData: editUsersData,
    },
  };
}

/**
 * editUserData - Edits User data and then dispatches editPage
 * editPage action
 *
 * @param {object} userId
 * @returns {object}
 */
export function editUserData(userId) {
  return (dispatch) => {
    const url = `/api/users/${userId}`;
    return CallApi(null, 'get', url)
    .then(apiResult => dispatch(editPage(apiResult)));
  };
}

/**
 * voidEditSuccess - Updates the store with data pre editSuccess action
 *
 * @returns {object}
 */
export function voidEditSuccess() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATED_USER_DATA,
      data: { editSuccess: false },
    });
  };
}

/**
 * editSuccess - UPdates store with data after User editing was successful
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
 * updatingUserData - Prepares store before updating the user
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
 * upadateUser - Updates user by calling update API
 * then dispatches editSuccess action
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
 * savingUser - Updates store with
 * state needed before saving user
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
 * savedUser - Updates store after user creation was successful
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
 * saveUserSuccess - Dispatches savingUser Action
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
 * DefaultUserSuccess - Defaults the store with
 * state before user was saved
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
 * usersSuccess - Updates store with users after
 * successful API call
 *
 * @param {object} Users
 * @returns {object}
 */
export function usersSuccess(Users) {
  return {
    type: ActionTypes.FETCH_USERS_SUCCESS,
    data: {
      users: Users.rows,
      usersCount: Users.count,
    },
  };
}

/**
 * checkingUser - Sets state before user validation.
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
 * loginSuccess - Updates store with login details
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
 * userUpdated - Updates store with user updated data
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
 * updateFailed - Updates store with user update error
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
 * loginFailed - Updates store with user login error
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
 * saveUserFailed - Updates store with save user error
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
 * checkLoginResult - Validates login result
 * and dispatches appropriate action
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
 * createUserData - Creates a user and updates store with the user date
 *
 * @param {object} user
 * @param {string} login
 * @returns {object}
 */
export function createUserData(user, login) {
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
 * loginUser - Login user and validate
 * login result by dispatching checkLoginResult
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
 * fetchUsers - Fetches users from server and dispatches usersSuccess
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
      dispatch(usersSuccess(apiResult));
    });
  };
}

/**
 * deleteModalData - Dispatches actions on
 * deleting user data on the modal form
 *
 * @param {object} selectedUser
 * @returns {object}
 */
export function deleteModalData(selectedUser) {
  return {
    type: ActionTypes.MODAL_FOR_DELETE,
    data: {
      deleteUser: selectedUser,
    },
  };
}

/**
 * deleteUserAction - Deletes user and dispatches userDeleted and fetchUsers
 *
 * @param {number} userId
 * @returns {object}
 */
export function deleteUserAction(userId) {
  return (dispatch) => {
    const url = `/api/users/${userId}`;
    return CallApi(null, 'delete', url)
    .then(() => {
      dispatch(userDeleted());
      if (global.Materialize !== undefined) {
        global.Materialize.toast('Account successfully deleted', 4000);
      }
      return dispatch(fetchUsers(0, 9));
    });
  };
}
