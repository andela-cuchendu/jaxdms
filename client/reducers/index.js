import {combineReducers} from 'redux';
import Roles from './RolesReducer';
import Users from './UserReducer';
import Doc from './DocumentReducer';

const rootReducer = combineReducers({
  // short hand property names
Roles,
Users,
Doc
})

export default rootReducer;