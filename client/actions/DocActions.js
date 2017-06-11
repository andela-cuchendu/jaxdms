import * as ActionTypes from './ActionTypes.js';
import {BaseApi} from '../api/BaseApi';

export function DocumentDeleted() {
  console.log('I deleted you')
  return {
    type: ActionTypes.DOC_DELETE_SUCCESS,
    data: {
      Deleted: true
    }
  };
}

export function DocumentDeletedHandled() {
  console.log('I deleted you and handled')
  return {
    type: ActionTypes.DOC_DELETE_HANDLED,
    data: {
      Deleted: false
    }
  };
}

export function getSharedDocSuccess(sharedDocs) {
  return {
    type: ActionTypes.SHARED_DOCUMENTS,
    data: {
      sharedDocs
    }
  };
}

export function gettingUserDocs() {
  return {
    type: ActionTypes.GETTING_USER_DOCS
  };
}

export function getDocsSuccess(docs) {
  return {
    type: ActionTypes.USER_DOCS_SUCCESS,
    data: {
      docSuccess: true,
      docs: docs,
      editSuccess: false
    }
  };
}

export function savingDoc() {
  return {
    type: ActionTypes.CREATING_DOC,
    data: {
      docSuccess: false
    }
  };
}

export function updateStoreWithNewDoc(docData) {
  return {
    type: ActionTypes.UPDATE_STORE_WITH_NEW_DOC,
    data: {
      newDoc: [docData],
      successState: true
    }
  };
}

export function preparePageForEdit(docData) {
  const editData = {
    title: docData.title,
    content: docData.content,
    access: docData.access
  }
  console.log('prepare for edit',editData)
  return {
    type: ActionTypes.PREPARE_EDIT_PAGE,
    data: {
      editDocumentData: editData
    }
  };
}

export function docDeleted(docsInState) {
  console.log('Doc deleted',docsInState )
  return {
    type: ActionTypes.DELETE_DOC_SUCCESS,
    data: {
      docs: docsInState
    }
  };
}

export function sharedDocsDeleted(docsInState) {
  console.log('sharedDocsDeleted deleted',docsInState )
  return {
    type: ActionTypes.DELETE_DOC_SUCCESS,
    data: {
      sharedDocs: docsInState
    }
  };
}

export function updatingDocData() {
  return {
    type: ActionTypes.UPDATING_DOC_DATA,
    data: {
      editPreLoader: false
    }
  };
}

export function createDocSuccess() {
  return {
    type: ActionTypes.CREATE_DOC_SUCCESS,
    data: {
      docSuccess: true
    }
  };
}

export function updateStoreWithUserData(userData) {
  return {
    type: ActionTypes.UPDATE_STORE_WITH_USER_DATA,
    data: {userData}
  };
}

export function editDocSuccess() {
  return {
    type: ActionTypes.UPDATED_DOCUMENT_DATA,
    data: {
      editPreLoader: true,
      editSuccess: true,
      editDocumentData: {
        title: '',
        content: '',
        access: ''
      }
    }
  };
}

export function updateSearch() {
  return {
    type: ActionTypes.UPDATE_SEARCH_RESULT,
    data: {
      updateSearch: true
    }
  };
}

export function invalidUser() {
  return {
    type: ActionTypes.REDIRECT_USER,
    data: {redirect: true}
  };
}

export function createModalData(selectedDoc) {
  return {
    type: ActionTypes.CREATE_MODAL_FOR_DELETE,
    data: {
      deleteDoc: selectedDoc
    }
  };
}

export function addingMoreDocToStore() {
  return {
    type: ActionTypes.ADDING_MORE_DOC_TO_STORE,
    data: {lazyLoading: true}
  };
}

export function updatedStoreWithMoreDocs(result) {
  return {
    type: ActionTypes.ADD_MORE_DOC_TO_STORE,
    data: {
      docs: result.doc,
      lazyLoading: false
    }
  };
}

export function getsharedDocument(userData,type) {
  console.log('oginidi',type)
  return (dispatch) => {
    dispatch(gettingUserDocs());
    const url = `/api/documents/${userData.id}/${type}`;
    return BaseApi(null, 'get', url, function (apiResult) {
      dispatch(getSharedDocSuccess(apiResult));
      return dispatch(getUserDocs(parseInt(userData.id),type));
    });
  };
}

export function updatedStoreWithSharedDocs(newDocs) {
  console.log('update confused', newDoc)
  return {
    type: ActionTypes.ADD_MORE_SHARED_DOCS,
    data: {
      docs: newDocs.doc,
      lazyLoading: false
    }
  };
}

export function addSharedDocs(offset, userRole) {
  return (dispatch) => {
    dispatch(addingMoreDocToStore());
    const url = '/api/documents?role=' + userRole + '&offset=' + offset;
    return BaseApi(null, 'get', url, function (apiResult) {
      return dispatch(updatedStoreWithSharedDocs(apiResult));
    });
  };
}

export function addOwnedDocs(offset, userId) {
  return (dispatch) => {
    dispatch(addingMoreDocToStore());
    const url = '/api/users/' + parseInt(userId) + '/documents/?offset=' + offset;
    return BaseApi(null, 'get', url, function (apiResult) {
      return dispatch(updatedStoreWithMoreDocs(apiResult));
    });
  };
}

export function deleteDocAction(docId) {
  return (dispatch) => {
    const url = '/api/documents/' + docId;
    return BaseApi(null, 'delete', url, function (apiResult) {
      console.log('apiResult delete ',apiResult)
       dispatch(DocumentDeleted());
       console.log('calling from delete',apiResult)
      return dispatch(getComponentResources({},'own'));
    });
  };
}

export function createDoc(docData, creatorData) {
  console.log('create user', creatorData)
  return (dispatch) => {
    dispatch(savingDoc());
    const url = '/api/documents/';
    docData.creator = creatorData;
    console.log('creator docs', creatorData)
    console.log('create doc', docData)
    return BaseApi(docData, 'post', url, function (apiResult) {
      console.log('save docs', apiResult)
      Materialize.toast('Document Created successfully', 4000);
      dispatch(updateStoreWithNewDoc(apiResult));
    });
  };
}

export function getUserDocs(userId,type) {
  return (dispatch) => {
    dispatch(gettingUserDocs());
    const url = `/api/documents/${userId}/${type}`;
    return BaseApi(null, 'get', url, function (apiResult) {
      dispatch(getDocsSuccess(apiResult));
    });
  };
}

export function prepareStoreForDocDetails(newDocs) {
  return {
    type: ActionTypes.ADD_DOC_DETAILS,
    data: {
      viewDoc: newDocs,
      lazyLoading: false
    }
  };
}

export function upadateDocument(newDocData, docId) {
  return (dispatch) => {
    dispatch(updatingDocData());
    const url = '/api/documents/' + docId;
    return BaseApi(newDocData, 'put', url, function () {
      dispatch(getComponentResources({},'own'));
      dispatch(editDocSuccess());
    });
  };
}

export function validateUser(type) {
  return (dispatch) => {
    const url = '/api/users/data/data';
    return BaseApi(null, 'get', url, function (apiResult) {
      if (apiResult.id) {
        dispatch(updateStoreWithUserData(apiResult));
        return dispatch(getComponentResources(apiResult,type));
      }
      return dispatch(invalidUser());
    });
  };
}

export function updatePageWithEditData(docId) {
  return (dispatch) => {
    const url = '/api/documents/' + docId;
    return BaseApi(null, 'get', url, function (apiResult) {
      console.log('edit doc jhjkhjkhjkh',apiResult)
      return dispatch(preparePageForEdit(apiResult));
    });
  };
}

export function getComponentResources(userData,type) {
  return (dispatch) => {
    if (Object.keys(userData).length) {
      return dispatch(getsharedDocument(userData,type));
    }

    return dispatch(validateUser(type));
  };
}
