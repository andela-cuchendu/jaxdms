import expect from 'expect';
import enzymify from 'expect-enzyme';
import * as ActionTypes from '../../actions/ActionTypes';
import RolesReducer from '../../reducers/RolesReducer';

expect.extend(enzymify());

describe('Role reducer', () => {
  it('should get initial state', () => {
    expect(RolesReducer([], {
      type: '',
    })).toEqual([]);
  });
  it('should get initial state', () => {
    const roles = [{
      id: 1,
      title: 'admin',
    }];
    const expected = {
      roles: [{
        id: 1,
        title: 'admin',
      }],
    };
    expect(RolesReducer([], {
      type: ActionTypes.LOAD_ROLES_SUCCESS,
      data: roles,
    })).toEqual(expected);
  });
});
