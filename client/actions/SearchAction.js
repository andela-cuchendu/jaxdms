import * as ActionTypes from './ActionTypes';
import ApiCall from '../api/BaseApi';

/**
 * searchCompleted - Dispatches
 * searchCompleted action
 *
 * @param {string} query
 * @param {object} searchResult
 * @param {string} myUrl
 * @returns {object}
 */
export function searchCompleted(query, searchResult, myUrl) {
  return {
    type: ActionTypes.SEARCH_COMPLETED,
    data: {
      updateSearch: false,
      refreshed: false,
      search: searchResult,
      query,
      searchUrl: myUrl,
    },
  };
}

/**
 * searchDoc - Dispatches
 * searchDoc action
 *
 * @param {string} query
 * @param {number} RoleId
 * @param {string} myUrl
 * @returns {object}
 */
export function searchDoc(query, RoleId, myUrl) {
  return (dispatch) => {
    const url = `/api/search/documents?q=${query}`;
    ApiCall(null, 'get', url)
    .then((apiResult) => {
      dispatch(searchCompleted(query, apiResult, myUrl));
    });
  };
}

/**
 * searchUsers - Dispatches
 * searchUsers action
 *
 * @param {string} query
 * @param {string} myUrl
 * @returns {object}
 */
export function searchUsers(query, myUrl) {
  return (dispatch) => {
    const url = `/api/search/users?q=${query}`;
    ApiCall(null, 'get', url)
    .then((apiResult) => {
      dispatch(searchCompleted(query, apiResult, myUrl));
    });
  };
}

/**
 * updatedSearch - Dispatches
 * updatedSearch action
 *
 * @param {object} newDocs
 * @returns {object}
 */
export function updatedSearch(newDocs) {
  return {
    type: ActionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false,
    },
  };
}

