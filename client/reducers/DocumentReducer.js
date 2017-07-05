import * as actionTypes from '../actions/ActionTypes';
import { InitialState } from './InitialState';

export default function docReducer(state = InitialState, action) {
  switch (action.type) {
    case actionTypes.DOC_DELETE_SUCCESS:
      return { ...state, ...action.data };
    case actionTypes.DOC_DELETE_HANDLED:
      return { ...state, ...action.data };
    case actionTypes.USER_GETTING_DOCS:
      return Object.assign({}, state);
    case actionTypes.DOC_SUCCESS_CREATE:
      return { ...state, ...action.data };
    case actionTypes.SEARCH_COMPLETED:
      return { ...state, ...action.data };
    case actionTypes.DOCS_USER_SUCCESS:
      return { ...state, ...action.data };
    case actionTypes.DOC_DETAILS_ADD:
      return { ...state, ...action.data };
    case actionTypes.PUBLIC_DOCUMENTS:
      return { ...state, ...action.data };
    case actionTypes.CREATING_DOC:
      return { ...state, ...action.data };
    case actionTypes.EDIT_PAGE:
      return { ...state, ...action.data };
    case actionTypes.UPDATE_STORE_WITH_NEW_DOC:
      return { ...state,
        ...{
          docs: [...action.data.newDoc, ...state.docs],
        },
        ...{
          docSuccess: action.data.successState,
        } };
    case actionTypes.MODAL_FOR_DELETE:
      return { ...state, ...action.data };
    case actionTypes.SEARCHING_DOCUMENT:
      return { ...state, ...action.data };
    case actionTypes.UPDATE_SEARCH_RESULT:
      return { ...state, ...action.data };
    case actionTypes.UPDATING_DOC_DATA:
      return { ...state, ...action.data };
    case actionTypes.UPDATED_DOCUMENT:
      return { ...state, ...action.data };
    case actionTypes.REDIRECT_USER:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
