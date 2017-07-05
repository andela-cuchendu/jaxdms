import * as ActionTypes from './ActionTypes';
import ApiCall from '../api/BaseApi';

/**
 * GetRolesSuccess - Dispatches
 * GetRolesSuccess action
 *
 * @param {objet} RolesData
 * @returns  {object}
 */
export function GetRolesSuccess(RolesData) {
  return {
    type: ActionTypes.LOAD_ROLES_SUCCESS,
    data: RolesData,
  };
}

/**
 * GetRoles - Dispatches
 * GetRoles action
 *
 * @returns {object}
 */
export function GetRoles() {
  return (dispatch) => {
    const url = '/api/roles?access=1';
    return ApiCall(null, 'get', url)
    .then((ApiResult) => {
      dispatch(GetRolesSuccess(ApiResult));
    });
  };
}
