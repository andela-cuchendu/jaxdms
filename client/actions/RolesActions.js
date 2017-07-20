import * as ActionTypes from './ActionTypes';
import ApiCall from '../api/BaseApi';

/**
 * getRolesSuccess - Updates store with roles
 *
 * @param {objet} RolesData
 * @returns  {object}
 */
export function getRolesSuccess(RolesData) {
  return {
    type: ActionTypes.LOAD_ROLES_SUCCESS,
    data: RolesData,
  };
}

/**
 * getRoles - Dispatches getRolesSuccess after calling the API for retriving roles
 *
 * @returns {object}
 */
export function getRoles() {
  return (dispatch) => {
    const url = '/api/roles?access=1';
    return ApiCall(null, 'get', url)
    .then((ApiResult) => {
      dispatch(getRolesSuccess(ApiResult));
    });
  };
}
