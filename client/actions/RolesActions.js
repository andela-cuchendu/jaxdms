import * as ActionTypes from './ActionTypes';
import {BaseApi} from '../api/BaseApi';

export function GetRolesSuccess(RolesData) {
  return {
    type: ActionTypes.LOAD_ROLES_SUCCESS,
    data: RolesData
  };
}

export function GetRoles() {
  return (dispatch) => {
    const url = '/api/roles?access=1';
    BaseApi(null, 'get', url, (ApiResult) => {
      dispatch(GetRolesSuccess(ApiResult));
    });
  };
}
