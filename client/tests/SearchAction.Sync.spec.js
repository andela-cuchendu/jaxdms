import expect from 'expect';
import enzymify from 'expect-enzyme';
import * as SearchAction from '../actions/SearchAction';
import * as ActionTypes from '../actions/ActionTypes';

expect.extend(enzymify());

describe('Search Actions Spec: ', () => {

  it('should update state with search completed', (done) => {
    const ExpectedResult = {
      type: ActionTypes.SEARCH_COMPLETED,
      data: {
        updateSearch: false,
        refreshed: false,
        search: [],
        query: 'this',
      },
    };
    const action = SearchAction.searchCompleted('this', []);
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should update state with search completed', (done) => {
    const ExpectedResult = {
      type: ActionTypes.ADD_MORE_SHARED_DOCS,
      data: {
        docs: [],
        lazyLoading: false,
      },
    };
    const action = SearchAction.updatedSearch({ doc: [] });
    expect(action).toEqual(ExpectedResult);
    done();
  });
});
