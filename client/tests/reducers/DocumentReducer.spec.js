import expect from 'expect';
import enzymify from 'expect-enzyme';
import * as ActionTypes from '../../actions/ActionTypes';
import DocumentReducer from '../../reducers/DocumentReducer';

expect.extend(enzymify());

describe('Role reducer', () => {
  it('should get initial state', () => {
    expect(DocumentReducer([], {
      type: '',
    })).toEqual([]);
  });

  it('should handle DOC_DELETE_SUCCESS', () => {
    const data = {
      Deleted: true,
    };
    expect(DocumentReducer([], {
      type: ActionTypes.DOC_DELETE_SUCCESS,
      data,
    })).toEqual(data);
  });

  it('should handle DOC_DELETE_HANDLED', () => {
    const data = {
      Deleted: false,
    };
    expect(DocumentReducer([], {
      type: ActionTypes.DOC_DELETE_HANDLED,
      data,
    })).toEqual(data);
  });

  it('should handle CREATING_DOC', () => {
    const data = {
      docSuccess: false,
    };
    expect(DocumentReducer([], {
      type: ActionTypes.CREATING_DOC,
      data,
    })).toEqual(data);
  });

  it('should handle UPDATING_DOC_DATA', () => {
    const data = {
      editPreLoader: false,
    };
    expect(DocumentReducer([], {
      type: ActionTypes.UPDATING_DOC_DATA,
      data,
    })).toEqual(data);
  });
});
