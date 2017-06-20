/* eslint-disable global-require */
import expect from 'expect';
import enzymify from 'expect-enzyme';

import * as ActionTypes from '../../actions/ActionTypes';
import * as DocActions from '../../actions/DocActions';

describe('Document: ', () => {
  const docs = [{
    id: 1,
    title: 'title',
    content: 'content',
    access: -1,
    UserId: 5,
  }];

  const doc = {
    id: 1,
    title: 'title',
    content: 'content',
    access: -1,
    UserId: 5,
  };
  expect.extend(enzymify());

  after(() => {

  });

  describe('Sync', () => {

    it('should set Deleted to true after doc deletion', (done) => {
      const ExpectedResult = {
        type: ActionTypes.DOC_DELETE_SUCCESS,
        data: {
          Deleted: true,
        },
      };
      const action = DocActions.DocumentDeleted();
      expect(action).toEqual(ExpectedResult);
      done();
    });
  });


  it('should prepare store for edit', (done) => {
    const ExpectedResult = {
      type: ActionTypes.DOC_DETAILS_ADD,
      data: {
        viewDoc: {},
        lazyLoading: false,
      },
    };
    const action = DocActions.prepareStoreForDocDetails({});
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should reset delete to false', (done) => {
    const ExpectedResult = {
      type: ActionTypes.DOC_DELETE_HANDLED,
      data: {
        Deleted: false,
      },
    };
    const action = DocActions.DocumentDeletedHandled();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should set documments success', (done) => {
    const ExpectedResult = {
      type: ActionTypes.DOCS_USER_SUCCESS,
      data: {
        docSuccess: true,
        docs,
        editSuccess: false,
      },
    };
    const action = DocActions.DocsSuccess(docs);
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should reset documments success', (done) => {
    const ExpectedResult = {
      type: ActionTypes.CREATING_DOC,
      data: {
        docSuccess: false,
      },
    };
    const action = DocActions.savingDoc();
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should set modal data for deleting', (done) => {
    const ExpectedResult = {
      type: ActionTypes.MODAL_FOR_DELETE,
      data: {
        deleteDoc: doc,
      },
    };
    const action = DocActions.ModalData(doc);
    expect(action).toEqual(ExpectedResult);
    done();
  });


  it('should be able to set new doc', (done) => {
    const ExpectedResult = {
      type: ActionTypes.UPDATE_STORE_WITH_NEW_DOC,
      data: {
        newDoc: [doc],
        successState: true,
      },
    };
    const action = DocActions.newDoc(doc);
    expect(action).toEqual(ExpectedResult);
    done();
  });

  it('should prepare page for edit', (done) => {
    const editData = {
      title: doc.title,
      content: doc.content,
      access: doc.access,
    };
    const ExpectedResult = {
      type: ActionTypes.EDIT_PAGE,
      data: {
        docEdit: editData,
      },
    };
    const action = DocActions.editPage(doc);
    expect(action).toEqual(ExpectedResult);
    done();
  });
});