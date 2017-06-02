import * as actionTypes from './actionType';
import {ApiRequest} from '../utils/ApiRequest';

export function getDocsSuccess(rolesData) {
  return {
    type: actionTypes.FETCH_ROLES_SUCCESS,
    data: rolesData
  };
}

export function getRoles() {
  return (dispatch) => {
    const url = '/server/role';
    ApiRequest(null, 'get', url, (apiResult) => {
      dispatch(getDocsSuccess(apiResult));
    });
  };
}
