import expect from 'expect';
import enzymify from 'expect-enzyme';
import * as ActionTypes from '../../actions/ActionTypes';
import UserReducer from '../../reducers/UserReducer';

expect.extend(enzymify());

describe('Role reducer', () => {
  it('should get initial state', () => {
    expect(UserReducer([], {
      type: '',
    })).toEqual([]);
  });

  it('should handle CREATE_USER', () => {
    const user = {
      id: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      surname: 'surname',
      email: 'email',
      role: 1,
    };
    expect(UserReducer([], {
      type: ActionTypes.CREATE_USER,
      data: user,
    })).toEqual(user);
  });

  it('should handle USER_DELETE_SUCCESS', () => {
    const data = {
      Deleted: true,
    };
    expect(UserReducer([], {
      type: ActionTypes.USER_DELETE_SUCCESS,
      data,
    })).toEqual(data);
  });

  it('should handle UPDATED_USER_DATA', () => {
    const data = {
      editPreLoader: true,
      editSuccess: true,
      editUserData: {
        firstname: '',
        lastname: '',
      },
    };
    expect(UserReducer([], {
      type: ActionTypes.UPDATED_USER_DATA,
      data,
    })).toEqual(data);
  });

  it('should handle UPDATING_USER_DATA', () => {
    const data = {
      editPreLoader: false,
    };
    expect(UserReducer([], {
      type: ActionTypes.UPDATING_USER_DATA,
      data,
    })).toEqual(data);
  });
});
