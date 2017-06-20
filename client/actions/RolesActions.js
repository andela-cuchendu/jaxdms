import * as ActionTypes from './ActionTypes';
import { BaseApi } from '../api/BaseApi';

export function GetRolesSuccess(RolesData) {
  return {
    type: ActionTypes.LOAD_ROLES_SUCCESS,
    data: RolesData,
  };
}

export function GetRoles() {
  return (dispatch) => {
    const url = '/api/roles?access=1';
    return BaseApi(null, 'get', url)
    .then((ApiResult) => {
      dispatch(GetRolesSuccess(ApiResult));
    });
  };
}
