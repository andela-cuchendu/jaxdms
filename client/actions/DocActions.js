import * as ActionTypes from './ActionTypes';
import { BaseApi } from '../api/BaseApi';

export function DocumentDeleted() {
  return {
    type: ActionTypes.DOC_DELETE_SUCCESS,
    data: {
      Deleted: true,
    },
  };
}

export function DocumentDeletedHandled() {
  return {
    type: ActionTypes.DOC_DELETE_HANDLED,
    data: {
      Deleted: false,
    },
  };
}

export function getSharedDocSuccess(publicDocs) {
  return {
    type: ActionTypes.PUBLIC_DOCUMENTS,
    data: {
      publicDocs,
    },
  };
}

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

export function savingDoc() {
  return {
    type: ActionTypes.CREATING_DOC,
    data: {
      docSuccess: false,
    },
  };
}

export function ModalData(selectedDoc) {
  return {
    type: ActionTypes.MODAL_FOR_DELETE,
    data: {
      deleteDoc: selectedDoc,
    },
  };
}


export function newDoc(docData) {
  return {
    type: ActionTypes.UPDATE_STORE_WITH_NEW_DOC,
    data: {
      newDoc: [docData],
      successState: true,
    },
  };
}

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

export function docDeleted(docsInState) {
  return {
    type: ActionTypes.DOC_DELETE_SUCCESS,
    data: {
      docs: docsInState,
    },
  };
}

export function updatingDoc() {
  return {
    type: ActionTypes.UPDATING_DOC_DATA,
    data: {
      editPreLoader: false,
    },
  };
}

export function createDocSuccess() {
  return {
    type: ActionTypes.DOC_SUCCESS_CREATE,
    data: {
      docSuccess: true,
    },
  };
}

export function storeUSerData(userInfo) {
  return {
    type: ActionTypes.UPDATE_STORE_WITH_USER_DATA,
    data: { userInfo },
  };
}

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

export function Searching() {
  return {
    type: ActionTypes.UPDATE_SEARCH_RESULT,
    data: {
      updateSearch: true,
    },
  };
}

export function voidUser() {
  return {
    type: ActionTypes.REDIRECT_USER,
    data: { redirect: true },
  };
}

export function DevoidUser() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.REDIRECT_USER,
      data: { redirect: false },
    });
  };
}

export function getPublicDocument(userInfo, type, offset, limit) {
  return (dispatch) => {
    const url = `/api/documents/${userInfo.id}/${type}?offset=${offset}&limit=${limit}`;
    return BaseApi(null, 'get', url)
    .then((apiResult) => {
      return dispatch(DocsSuccess(apiResult));
    });
  };
}

export function updatedSPublicDocs(newDocs) {
  return {
    type: ActionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false,
    },
  };
}

export function validateUser(type) {
  return (dispatch) => {
    const url = '/api/users/data/data';
    return BaseApi(null, 'get', url)
    .then((apiResult) => {
      if (apiResult.id) {
        dispatch(storeUSerData(apiResult));
        return dispatch(getComponentResources(apiResult, type, 0, 9));
      }
      return dispatch(voidUser());
    });
  };
}

export function getComponentResources(userInfo, type, offset, limit) {
  return (dispatch) => {
    if (Object.keys(userInfo).length) {
      return dispatch(getPublicDocument(userInfo, type, offset, limit));
    }
    return dispatch(validateUser(type));
  };
}


export function deleteDocAction(docId) {
  return (dispatch) => {
    const url = `/api/documents/${docId}`;
    return BaseApi(null, 'delete', url)
    .then(() => {
      dispatch(DocumentDeleted());
      return dispatch(getComponentResources({}, 'own', 0, 9));
    });
  };
}

export function createDoc(docData, creatorData) {
  console.log(' new doc', docData)
  return (dispatch) => {
    dispatch(savingDoc());
    const url = '/api/documents/';
    docData.creator = creatorData;
    return BaseApi(docData, 'post', url)
    .then((apiResult) => {
      if (global.Materialize !== undefined) {
        global.Materialize.toast('Document Created successfully', 4000);
      }
      dispatch(newDoc(apiResult));
    });
  };
}

export function prepareStoreForDocDetails(newDocs) {
  return {
    type: ActionTypes.DOC_DETAILS_ADD,
    data: {
      viewDoc: newDocs,
      lazyLoading: false,
    },
  };
}

export function upadateDoc(newDocData, docId) {
  return (dispatch) => {
    dispatch(updatingDoc());
    const url = `/api/documents/${docId}`;
    return BaseApi(newDocData, 'put', url)
    .then(() => {
      dispatch(getComponentResources({}, 'own', 0, 9));
      dispatch(editDocSuccess());
    });
  };
}


export function EditData(docId) {
  return (dispatch) => {
    const url = `/api/documents/${docId}`;
    return BaseApi(null, 'get', url)
    .then((apiResult) => {
      return dispatch(editPage(apiResult));
    });
  };
}

