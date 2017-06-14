import { combineReducers } from 'redux';
import Roles from './RolesReducer';
import Users from './UserReducer';
import Doc from './DocumentReducer';

const rootReducer = combineReducers({
  Roles,
  Users,
  Doc,
});

export default rootReducer;
