import * as ActionTypes from '../actions/ActionTypes';
import { InitialState } from './InitialState';

export default function roleReducer(state = InitialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_ROLES_SUCCESS:
      return { ...state, roles: action.data };
    default:
      return state;
  }
}
