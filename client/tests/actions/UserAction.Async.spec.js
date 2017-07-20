import configureMockStore from 'redux-mock-store';
import request from 'superagent';
import thunk from 'redux-thunk';
import expect from 'expect';
import enzymify from 'expect-enzyme';
import * as UserAction from '../../actions/UserAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
expect.extend(enzymify());
let originalEnd;

describe('User Actions Spec: ', () => {
  before(() => {
    originalEnd = request.Request.prototype.end;
    request.Request.prototype.end = (callBack) => {
      callBack(null, {
        status: 200,
        body: {
          count: 1,
          rows: [{
            id: 1,
            firstname: 'firstname',
            lastname: 'lastname',
            surname: 'surname',
            email: 'email',
            role: 1,
          }],
        },
      });
    };
  });

  after(() => {
    request.Request.prototype.end = originalEnd;
  });

  it('should dispatch Edit data', () => {
    const expected = [{ data: { editUserData: { firstname: undefined,
      lastname: undefined,
      role: undefined } },
      type: 'EDIT_PAGE',
    }];
    const store = mockStore();

    return store.dispatch(UserAction.editUserData(1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch LOAD_ROLES_SUCCESS', () => {
    const expected = [{ data: { editPreLoader: false },
      type: 'UPDATING_USER_DATA' }, { data: { editPreLoader: true,
        editSuccess: true,
        editUserData: { firstname: '', lastname: '', role: '' } },
        type: 'UPDATED_USER_DATA' }];
    const store = mockStore();

    return store.dispatch(UserAction.upadateUser({}, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should fail creating user with incomplete parameters', () => {
    const expected = [{ data: {
      count: 1,
      rows: [{ email: 'email',
        firstname: 'firstname',
        id: 1,
        lastname: 'lastname',
        role: 1,
        surname: 'surname' }] },
      type: 'CREATE_USER' },
    { data: { UserError: undefined, displayLoader: 'hide-element' },
      type: 'USER_CREATE_FAILED' }];
    const store = mockStore();

    return store.dispatch(UserAction.createUserData({}, 'true'))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch login in user', () => {
    const expected = [{ data: { displayLoader: '' }, type: 'LOGIN_USER' }];
    const store = mockStore();

    return store.dispatch(UserAction.loginUser({}))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch fetch user user', () => {
    const expected = [{ data: { users:
    [{
      id: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      surname: 'surname',
      email: 'email',
      role: 1,
    }],
      usersCount: 1,
    },
      type: 'FETCH_USERS_SUCCESS' }];
    const store = mockStore();

    return store.dispatch(UserAction.fetchUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch delete user', () => {
    const expected = [{ data: { Deleted: true },
      type: 'USER_DELETE_SUCCESS' },
    { data: {
      users: [{
        id: 1,
        firstname: 'firstname',
        lastname: 'lastname',
        surname: 'surname',
        email: 'email',
        role: 1,
      }],
      usersCount: 1,
      },
      type: 'FETCH_USERS_SUCCESS' }];
    const store = mockStore();

    return store.dispatch(UserAction.deleteUserAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});
