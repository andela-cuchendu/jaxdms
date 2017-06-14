import * as ActionTypes from '../actions/ActionTypes';
import { InitialState } from './InitialState';

export default function userReducer(state = InitialState, action) {
  switch (action.type) {
    case ActionTypes.EDIT_PAGE:
      return Object.assign({}, state, action.data);
    case ActionTypes.USER_DELETE_SUCCESS:
      return Object.assign({}, state, action.data);
    case ActionTypes.USER_DELETE_HANDLED:
      return Object.assign({}, state, action.data);
    case ActionTypes.MODAL_FOR_DELETE:
      return Object.assign({}, state, action.data);
    case ActionTypes.DEFAULT_USERS_SUCCESS:
      return Object.assign({}, state, action.data);
    case ActionTypes.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, action.data);
    case ActionTypes.CREATE_USER:
      return Object.assign({}, state, action.data);
    case ActionTypes.SAVING_USER:
      return Object.assign({}, state, action.data);
    case ActionTypes.UPDATED_USER_DATA:
      return Object.assign({}, state, action.data);
    case ActionTypes.LOGIN_USER:
      return Object.assign({}, state, action.data);
    case ActionTypes.UPDATING_USER_DATA:
      return Object.assign({}, state, action.data);
    case ActionTypes.LOGIN_FAIL:
      return Object.assign({}, state, action.data);
    case ActionTypes.USER_SUCCESS:
      return Object.assign({}, state, action.data);
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, action.data);
    case ActionTypes.UPDATING_USER:
      return Object.assign({}, state, action.data);
    case ActionTypes.UPDATE_STORE_WITH_USER_DATA:
      return Object.assign({}, state, action.data);
    case ActionTypes.UPDATE_USER_STORE:
      return Object.assign({}, state, action.data);
    case ActionTypes.USER_FAILED:
      return Object.assign({}, state, action.data);
    case ActionTypes.USER_CREATE_FAILED:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
