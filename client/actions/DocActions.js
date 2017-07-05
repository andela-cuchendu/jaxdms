import * as ActionTypes from './ActionTypes';
import ApiCall from '../api/BaseApi';

/**
 * DocumentDeleted - Dispatches
 * DocumentDeleted action
 *
 * @returns {object}
 */
export function DocumentDeleted() {
  return {
    type: ActionTypes.DOC_DELETE_SUCCESS,
    data: {
      Deleted: true,
    },
  };
}

/**
 * DocumentDeletedHandled - Dispatches
 * DocumentDeletedHandled action
 *
 * @returns {object}
 */
export function DocumentDeletedHandled() {
  return {
    type: ActionTypes.DOC_DELETE_HANDLED,
    data: {
      Deleted: false,
    },
  };
}

/**
 * getSharedDocSuccess - Dispatches
 * getSharedDocSuccess action
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
 * DocsSuccess - Dispatches
 * DocsSuccess action
 *
 * @param {object} docs
 * @returns {object}
 */
export function DocsSuccess(docs) {
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
 * savingDoc - Dispatches
 * savingDoc action
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
 * DeleteModalData - Dispatches
 * DeleteModalData action
 *
 * @param {object} selectedDoc
 * @returns {object}
 */
export function DeleteModalData(selectedDoc) {
  return {
    type: ActionTypes.MODAL_FOR_DELETE,
    data: {
      deleteDoc: selectedDoc,
    },
  };
}

/**
 * newDoc - Dispatches
 * newDoc action
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
 * editPage - Dispatches
 * editPage action
 *
 * @param {object} docData
 * @returns {object}
 */
export function editPage(docData) {
  const editData = {
    title: docData.title,
    content: docData.content,
    access: docData.access,
  };
  return {
    type: ActionTypes.EDIT_PAGE,
    data: {
      docEdit: editData,
    },
  };
}

/**
 * docDeleted - Dispatches
 * docDeleted action
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
 * updatingDoc - Dispatches
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
 * createDocSuccess - Dispatches
 * createDocSuccess action
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
 * storeUSerData - Dispatches
 * storeUSerData action
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
 * editDocSuccess - Dispatches
 * editDocSuccess action
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
 * Searching - Dispatches
 * Searching action
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
 * voidUser - Dispatches
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
 * DevoidUser - Dispatches
 * DevoidUser action
 *
 * @returns {object}
 */
export function DevoidUser() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.REDIRECT_USER,
      data: { redirect: false },
    });
  };
}

/**
 * getPublicDocument - Dispatches
 * getPublicDocument action
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
    .then(apiResult => dispatch(DocsSuccess(apiResult)));
  };
}

/**
 * updatedSPublicDocs - Dispatches
 * updatedSPublicDocs action
 *
 * @param {object} newDocs
 * @returns {object}
 */
export function updatedSPublicDocs(newDocs) {
  return {
    type: ActionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false,
    },
  };
}

/**
 * validateUser - Dispatches
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
 * getComponentResources - Dispatches
 * getComponentResources action
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
 * deleteDocAction - Dispatches
 * deleteDocAction action
 *
 * @param {number} docId
 * @returns {object}
 */
export function deleteDocAction(docId) {
  return (dispatch) => {
    const url = `/api/documents/${docId}`;
    return ApiCall(null, 'delete', url)
    .then(() => {
      dispatch(DocumentDeleted());
      return dispatch(getComponentResources({}, 'own', 0, 9));
    });
  };
}

/**
 * createDoc - Dispatches
 * createDoc action
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
 * prepareStoreForDocDetails - Dispatches
 * prepareStoreForDocDetails action
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
 * upadateDoc - Dispatches
 * upadateDoc action
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
 * EditData - Dispatches
 * EditData action
 *
 * @param {number} - docId - document ID
 * @returns {object}
 */
export function EditData(docId) {
  return (dispatch) => {
    const url = `/api/documents/${docId}`;
    return ApiCall(null, 'get', url)
    .then(apiResult => dispatch(editPage(apiResult)));
  };
}

