import * as ActionTypes from '../actions/ActionTypes';
import { InitialState } from './InitialState';

export default function userReducer(state = InitialState, action) {
  switch (action.type) {
    case ActionTypes.EDIT_PAGE:
      return { ...state, ...action.data };
    case ActionTypes.VOID_USER_ERROR:
      return { ...state, ...action.data };
    case ActionTypes.USER_DELETE_SUCCESS:
      return { ...state, ...action.data };
    case ActionTypes.USER_DELETE_HANDLED:
      return { ...state, ...action.data };
    case ActionTypes.MODAL_FOR_DELETE:
      return { ...state, ...action.data };
    case ActionTypes.DEFAULT_USERS_SUCCESS:
      return { ...state, ...action.data };
    case ActionTypes.FETCH_USERS_SUCCESS:
      return { ...state, ...action.data };
    case ActionTypes.CREATE_USER:
      return { ...state, ...action.data };
    case ActionTypes.SAVING_USER:
      return { ...state, ...action.data };
    case ActionTypes.UPDATED_USER_DATA:
      return { ...state, ...action.data };
    case ActionTypes.LOGIN_USER:
      return { ...state, ...action.data };
    case ActionTypes.UPDATING_USER_DATA:
      return { ...state, ...action.data };
    case ActionTypes.LOGIN_FAIL:
      return { ...state, ...action.data };
    case ActionTypes.USER_SUCCESS:
      return { ...state, ...action.data };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.data };
    case ActionTypes.UPDATING_USER:
      return { ...state, ...action.data };
    case ActionTypes.UPDATE_STORE_WITH_USER_DATA:
      return { ...state, ...action.data };
    case ActionTypes.UPDATE_USER_STORE:
      return { ...state, ...action.data };
    case ActionTypes.USER_FAILED:
      return { ...state, ...action.data };
    case ActionTypes.USER_CREATE_FAILED:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
