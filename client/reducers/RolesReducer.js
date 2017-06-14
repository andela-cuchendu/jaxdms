import * as actionTypes from '../actions/ActionTypes';
import { InitialState } from './InitialState';

export default function roleReducer(state = InitialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_ROLES_SUCCESS:
      return Object.assign({}, state, {roles: action.data});
    default:
      return state;
  }
}
