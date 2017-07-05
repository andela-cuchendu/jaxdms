import configureMockStore from 'redux-mock-store';
import request from 'superagent';
import thunk from 'redux-thunk';
import expect from 'expect';
import enzymify from 'expect-enzyme';
import * as RolesActions from '../../actions/RolesActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
expect.extend(enzymify());
let originalEnd;

describe('Roles Actions Spec: ', () => {
  before(() => {
    originalEnd = request.Request.prototype.end;
    request.Request.prototype.end = (callBack) => {
      callBack(null, {
        status: 200,
        body: {
          roles: [{
            id: 1,
            title: 'admin',
          }],
        },
      });
    };
  });

  after(() => {
    request.Request.prototype.end = originalEnd;
  });

  it('should dispatch LOAD_ROLES_SUCCESS', () => {
    const expected = [
      {
        type: 'LOAD_ROLES_SUCCESS',
        data: {
          roles: [{
            id: 1,
            title: 'admin',
          }],
        },
      },
    ];
    const store = mockStore();

    return store.dispatch(RolesActions.GetRoles())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});
