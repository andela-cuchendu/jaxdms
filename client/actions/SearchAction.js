import * as ActionTypes from './ActionTypes';
import {BaseApi} from '../api/BaseApi';

export function searchCompleted(searchTerm, searchResult) {
  return {
    type: ActionTypes.SEARCH_COMPLETED,
    data: {
      updateSearch: false,
      refreshed: false,
      search: searchResult,
      searchTerm: searchTerm
    }
  };
}

export function searchDocument(searchTerm) {
  console.log('api search doc', searchTerm)
  return (dispatch) => {
    const url = '/api/search/documents?q=' + searchTerm;

    BaseApi(null, 'get', url, (apiResult) => {
      console.log('api search res', apiResult)
      dispatch(searchCompleted(searchTerm, apiResult));
    });
  };
}

export function addingMoreDocToStore() {
  return {
    type: ActionTypes.ADDING_MORE_DOC_TO_STORE,
    data: {lazyLoading: true}
  };
}

export function updatedStoreWithSearchedDocs(newDocs) {
  return {
    type: ActionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false
    }
  };
}

export function addMoreSearchResult(exisitingDocs, userRole, searchTerm) {
  return (dispatch) => {
    dispatch(addingMoreDocToStore());
    const url = '/api/documents?q=' + searchTerm + '&role=' +
      userRole + 'offset=' + exisitingDocs;
    return apiRequest(null, 'get', url, function (apiResult) {
      return dispatch(updatedStoreWithSearchedDocs(apiResult));
    });
  };
}
