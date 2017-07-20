import * as ActionTypes from './ActionTypes';
import ApiCall from '../api/BaseApi';

/**
 * documentDeleted - Dispatches action
 * when a document has been deleted successfully
 *
 * @returns {object}
 */
export function documentDeleted() {
  return {
    type: ActionTypes.DOC_DELETE_SUCCESS,
    data: {
      Deleted: true,
    },
  };
}

/**
 * documentDeletedHandled - Dispatches data to
 * inform the store to reset to pre delete document
 * state
 *
 * @returns {object}
 */
export function documentDeletedHandled() {
  return {
    type: ActionTypes.DOC_DELETE_HANDLED,
    data: {
      Deleted: false,
    },
  };
}

/**
 * getSharedDocSuccess - Dispatches action when to
 * store public documents in the store
 *
 * @param {object} publicDocs
 * @returns {object}
 */
export function getSharedDocSuccess(publicDocs) {
  return {
    type: ActionTypes.PUBLIC_DOCUMENTS,
    data: {
      publicDocs,
    },
  };
}

/**
 * docsSuccess - Dispatches action when
 * document has been loadded succsesfully
 *
 * @param {object} docs
 * @returns {object}
 */
export function docsSuccess(docs) {
  return {
    type: ActionTypes.DOCS_USER_SUCCESS,
    data: {
      docSuccess: true,
      docs: docs.rows,
      docCount: docs.count,
      editSuccess: false,
    },
  };
}

/**
 * savingDoc - Dispatches action getting the store
 * ready to save new document to the database
 *
 * @returns {object}
 */
export function savingDoc() {
  return {
    type: ActionTypes.CREATING_DOC,
    data: {
      docSuccess: false,
    },
  };
}

/**
 * deleteModalData - Dispatches actions on
 * deleting document data on the modal form
 *
 * @param {object} selectedDoc
 * @returns {object}
 */
export function deleteModalData(selectedDoc) {
  return {
    type: ActionTypes.MODAL_FOR_DELETE,
    data: {
      deleteDoc: selectedDoc,
    },
  };
}

/**
 * newDoc - Dispatches this action when a new
 * document has been created
 *
 * @param {object} docData
 * @returns {object}
 */
export function newDoc(docData) {
  return {
    type: ActionTypes.UPDATE_STORE_WITH_NEW_DOC,
    data: {
      newDoc: [docData],
      successState: true,
    },
  };
}

/**
 * editPage - Prepares the store for
 * document editing
 *
 * @param {object} docData
 * @returns {object}
 */
export function editPage(docData) {
  const editDocData = {
    title: docData.title,
    content: docData.content,
    access: docData.access,
  };
  return {
    type: ActionTypes.EDIT_PAGE,
    data: {
      docEdit: editDocData,
    },
  };
}

/**
 * docDeleted - informs the store that the
 * document was successfully deleted
 *
 * @param {object} docsInState
 * @returns {object}
 */
export function docDeleted(docsInState) {
  return {
    type: ActionTypes.DOC_DELETE_SUCCESS,
    data: {
      docs: docsInState,
    },
  };
}

/**
 * updateStoreUserData - Update store with user data after editing
 *
 * @param {object} - storeUSerData
 * @returns {object}
 */
export function updateStoreUSerData(userInfo) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_STORE_WITH_USER_DATA,
      data: { userInfo },
    });
  };
}

/**
 * updatingDoc - Prepares store for document editing
 * updatingDoc action
 *
 * @returns {object}
 */
export function updatingDoc() {
  return {
    type: ActionTypes.UPDATING_DOC_DATA,
    data: {
      editPreLoader: false,
    },
  };
}

/**
 * createDocSuccess - Dispatches actions indicating creation
 * of new document
 *
 * @returns {object}
 */
export function createDocSuccess() {
  return {
    type: ActionTypes.DOC_SUCCESS_CREATE,
    data: {
      docSuccess: true,
    },
  };
}

/**
 * storeUSerData - Updates store with user data
 *
 * @param {object} - storeUSerData
 * @returns {object}
 */
export function storeUSerData(userInfo) {
  return {
    type: ActionTypes.UPDATE_STORE_WITH_USER_DATA,
    data: { userInfo },
  };
}

/**
 * editDocSuccess - Resets document state after document
 * has been edited successfully.
 *
 * @returns {object}
 */
export function editDocSuccess() {
  return {
    type: ActionTypes.UPDATED_DOCUMENT,
    data: {
      editPreLoader: true,
      editSuccess: true,
      docEdit: {
        title: '',
        content: '',
        access: '',
      },
    },
  };
}

/**
 * Searching - Tells store to update with search result
 *
 * @returns {object}
 */
export function Searching() {
  return {
    type: ActionTypes.UPDATE_SEARCH_RESULT,
    data: {
      updateSearch: true,
    },
  };
}

/**
 * voidUser - Void user authentification. Redirect user
 * to login page.
 * voidUser action
 *
 * @returns {object}
 */
export function voidUser() {
  return {
    type: ActionTypes.REDIRECT_USER,
    data: { redirect: true },
  };
}

/**
 * devoidUser - Devoid user authentification
 *
 * @returns {object}
 */
export function devoidUser() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.REDIRECT_USER,
      data: { redirect: false },
    });
  };
}

/**
 * getPublicDocument - Gets public document and update store
 * with the documents
 * @export
 * @param {object} userInfo
 * @param {string} type
 * @param {number} offset
 * @param {number} limit
 * @returns {object}
 */
export function getPublicDocument(userInfo, type, offset, limit) {
  return (dispatch) => {
    const url = `/api/documents/${userInfo.id}/${type}?offset=${offset}&limit=${limit}`;
    return ApiCall(null, 'get', url)
    .then(apiResult => dispatch(docsSuccess(apiResult)));
  };
}

/**
 * updatedPublicDocs - Dispatches action informing
 * the store that document has been updated
 *
 * @param {object} newDocs
 * @returns {object}
 */
export function updatedPublicDocs(newDocs) {
  return {
    type: ActionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false,
    },
  };
}

/**
 * validateUser - Validates User authentification
 * then redirect user to login if not validated
 * validateUser action
 *
 * @param {string} type
 * @returns {object}
 */
export function validateUser(type) {
  return (dispatch) => {
    const url = '/api/users/data/data';
    return ApiCall(null, 'get', url)
    .then((apiResult) => {
      if (apiResult.id) {
        dispatch(storeUSerData(apiResult));
        return dispatch(getComponentResources(apiResult, type, 0, 9));
      }
      return dispatch(voidUser());
    });
  };
}

/**
 * getComponentResources - Gets all documents for the component (User)
 * This action dispatches getPublicDocument
 *
 * @param {object} userInfo
 * @param {string} type
 * @param {number} offset
 * @param {number} limit
 * @returns {object}
 */
export function getComponentResources(userInfo, type, offset, limit) {
  return (dispatch) => {
    if (Object.keys(userInfo).length) {
      return dispatch(getPublicDocument(userInfo, type, offset, limit));
    }
    return dispatch(validateUser(type));
  };
}

/**
 * deleteDocAction - Deletes document by calling the right API, this
 * action dispatches document deleted and getComponent resources
 *
 * @param {number} docId
 * @returns {object}
 */
export function deleteDocAction(docId) {
  return (dispatch) => {
    const url = `/api/documents/${docId}`;
    return ApiCall(null, 'delete', url)
    .then(() => {
      dispatch(documentDeleted());
      return dispatch(getComponentResources({}, 'own', 0, 9));
    });
  };
}

/**
 * createDoc - Creates new document. This action dispatches newDocument action
 *
 * @param {object} docData
 * @param {string} creatorData
 * @returns {object}
 */
export function createDoc(docData, creatorData) {
  return (dispatch) => {
    dispatch(savingDoc());
    const url = '/api/documents/';
    const newDocData = docData;
    newDocData.creator = creatorData;
    return ApiCall(newDocData, 'post', url)
    .then((apiResult) => {
      if (global.Materialize !== undefined) {
        global.Materialize.toast('Document Created successfully', 4000);
      }
      dispatch(newDoc(apiResult));
    });
  };
}

/**
 * prepareStoreForDocDetails - Prepares store for viewing document
 *
 * @export
 * @param {object} newDocs
 * @returns {object}
 */
export function prepareStoreForDocDetails(newDocs) {
  return {
    type: ActionTypes.DOC_DETAILS_ADD,
    data: {
      viewDoc: newDocs,
      lazyLoading: false,
    },
  };
}

/**
 * upadateDoc - This action updates document by calling the API,
 * then dispatches getComponentResources and editDocSuccess
 *
 * @param {object} - newDocData
 * @param {nmber} = document ID
 * @returns {object}
 */
export function upadateDoc(newDocData, docId) {
  return (dispatch) => {
    dispatch(updatingDoc());
    const url = `/api/documents/${docId}`;
    return ApiCall(newDocData, 'put', url)
    .then(() => {
      dispatch(getComponentResources({}, 'own', 0, 9));
      dispatch(editDocSuccess());
    });
  };
}

/**
 * editDocData - Edits a document by calling the API
 * then dispatching editPage action
 *
 * @param {number} - docId - document ID
 * @returns {object}
 */
export function editDocData(docId) {
  return (dispatch) => {
    const url = `/api/documents/${docId}`;
    return ApiCall(null, 'get', url)
    .then(apiResult => dispatch(editPage(apiResult)));
  };
}

