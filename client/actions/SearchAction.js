import * as ActionTypes from './ActionTypes';
import { BaseApi } from '../api/BaseApi';

export function searchCompleted(query, searchResult) {
  return {
    type: ActionTypes.SEARCH_COMPLETED,
    data: {
      updateSearch: false,
      refreshed: false,
      search: searchResult,
      query,
    },
  };
}

export function searchDoc(query) {
  return (dispatch) => {
    const url = `/api/search/documents?q=${query}`;
    BaseApi(null, 'get', url)
    .then((apiResult) => {
      dispatch(searchCompleted(query, apiResult));
    });
  };
}

export function updatedSearch(newDocs) {
  return {
    type: ActionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false,
    },
  };
}

