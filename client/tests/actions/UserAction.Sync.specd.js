/* eslint-disable global-require */
import expect from 'expect';
import enzymify from 'expect-enzyme';

import * as ActionTypes from '../../actions/ActionTypes';
import * as UserAction from '../../actions/UserAction';

describe('Document: ', () => {
  const users = [{
    id: 1,
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'username',
    role: 1,
  }];

  const user = {
    id: 1,
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'username',
    role: 1,
  };

  const loginFailed = {
    message: 'incorrect login details',
    status: 403,
  };

  expect.extend(enzymify());

  after(() => {

  });

  describe('Sync', () => {

    it('should create user', (done) => {
      const ExpectedResult = {
        type: ActionTypes.CREATE_USER,
        data: user,
      };
      const action = UserAction.createUser(user);
      expect(action).toEqual(ExpectedResult);
      done();
    });
  });

  it('should set user delete success', (done) => {
    const ExpectedResult = {
      type: ActionTypes.USER_DELETE_SUCCESS,
      data: {
        Deleted: true,
      },
    };
    const action = UserAction.UserDeleted();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should set prepare page for edit user', (done) => {
    const editData = {
      firstname: user.firstname,
      lastname: user.lastname,
    };
    const ExpectedResult = {
      type: ActionTypes.EDIT_PAGE,
      data: {
        editUserData: editData,
      },
    };
    const action = UserAction.editPage(user);
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should set edit success', (done) => {
    const ExpectedResult = {
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
    const action = UserAction.editSuccess();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should set edit preloader', (done) => {
    const ExpectedResult = {
      type: ActionTypes.UPDATING_USER_DATA,
      data: {
        editPreLoader: false,
      },
    };
    const action = UserAction.updatingUserData();
    expect(action).toEqual(ExpectedResult);
    done();
  });


  it('should display preloader', (done) => {
    const ExpectedResult = {
      type: ActionTypes.SAVING_USER,
      data: {
        displayLoader: '',
      },
    };
    const action = UserAction.savingUser();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should prepare page for edit', (done) => {
    const ExpectedResult = {
      type: ActionTypes.USER_SUCCESS,
      data: {
        displayLoader: 'hide-element',
        CreateUser: true,
        adminUser: true,
      },
    };
    const action = UserAction.savedUser();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should reset user success data', (done) => {
    const ExpectedResult = {
      type: ActionTypes.USER_SUCCESS,
      data: {
        displayLoader: 'hide-element',
        adminUser: false,
        CreateUser: false,
      },
    };
    const action = UserAction.DefaultUserSuccess();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should set user success', (done) => {
    const ExpectedResult = {
      type: ActionTypes.FETCH_USERS_SUCCESS,
      data: {
        users: users,
      },
    };
    const action = UserAction.UsersSuccess(users);
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should set loader before checking user', (done) => {
    const ExpectedResult = {
      type: ActionTypes.LOGIN_USER,
      data: {
        displayLoader: '',
      },
    };
    const action = UserAction.checkingUser();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should login user', (done) => {
    const ExpectedResult = {
      type: ActionTypes.LOGIN_SUCCESS,
      data: {
        shouldRedirect: true,
        displayLoader: 'hide-element',
        userData: user,
      },
    };
    const action = UserAction.loginSuccess(user);
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should update user data', (done) => {
    const newuser = {
      user,
    };
    const ExpectedResult = {
      type: ActionTypes.UPDATED_USER_DATA,
      data: {
        editPreLoader: true,
        userData: newuser.user,
        AppInfo: 'Updated!!!',
        displayFeedBack: 'block',
        AppInfoColor: '#26a69a',
      },
    };
    const action = UserAction.userUpdated(newuser);
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should update user edit failure', (done) => {
    const ExpectedResult = {
      type: ActionTypes.USER_FAILED,
      data: {
        editPreLoader: true,
        AppInfo: 'Oops!!! An error occured.',
        displayFeedBack: 'block',
        AppInfoColor: '#dd0404',
      },
    };
    const action = UserAction.updateFailed();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should update login failure', (done) => {
    const ExpectedResult = {
      type: ActionTypes.LOGIN_FAIL,
      data: {
        error: loginFailed.message,
        displayLoader: 'hide-element',
      },
    };
    const action = UserAction.loginFailed(loginFailed);
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should update error when user save failed', (done) => {
    const ExpectedResult = {
      type: ActionTypes.USER_CREATE_FAILED,
      data: {
        UserError: 'error occured',
        displayLoader: 'hide-element',
      },
    };
    const action = UserAction.saveUserFailed('error occured');
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should update error when user save failed', (done) => {
    const ExpectedResult = {
      type: ActionTypes.USER_CREATE_FAILED,
      data: {
        UserError: 'error occured',
        displayLoader: 'hide-element',
      },
    };
    const action = UserAction.saveUserFailed('error occured');
    expect(action).toEqual(ExpectedResult);
    done();
  });
});
