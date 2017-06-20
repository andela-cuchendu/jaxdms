import configureMockStore from 'redux-mock-store';
import request from 'superagent';
import thunk from 'redux-thunk';
import expect from 'expect';
import enzymify from 'expect-enzyme';
import * as DocActions from '../../actions/DocActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
expect.extend(enzymify());
let originalEnd;

describe('DocActions Spec: ', () => {
  before(() => {
    originalEnd = request.Request.prototype.end;
    request.Request.prototype.end = function (cb) {
      cb(null, {
        status: 200,
        body: {
          docs: [{
            id: 1,
            title: 'title',
            content: 'content',
            access: 1,
            UserId: 1,
          }],
        },
      });
    };
  });

  after(() => {
    request.Request.prototype.end = originalEnd;
  });

  it('it should dispatch public documents', () => {
    const expected = [
      {
        data: {
          publicDocs: {
            docs: [{
              id: 1,
              title: 'title',
              content: 'content',
              access: 1,
              UserId: 1,
            }],
          },
        },
        type: 'PUBLIC_DOCUMENTS',
      },
      {
        data: {
          docSuccess: true,
          docs: {
            docs: [{
              id: 1,
              title: 'title',
              content: 'content',
              access: 1,
              UserId: 1,
            }],
          },
          editSuccess: false,
        },
        type: 'DOCS_USER_SUCCESS',
      },
    ];
    const UserInfo = {
      id: 1,
    };
    const store = mockStore();

    return store.dispatch(DocActions.getPublicDocument(UserInfo, 'shar'))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should invalidate user', () => {
    const expected = [{ data: { redirect: true }, type: 'REDIRECT_USER' }];
    const store = mockStore();

    return store.dispatch(DocActions.validateUser())
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should dispatch document delete', () => {
    const expected = [{ data: { Deleted: true }, type: 'DOC_DELETE_SUCCESS' },
      { data: { redirect: true }, type: 'REDIRECT_USER' }];
    const store = mockStore();

    return store.dispatch(DocActions.deleteDocAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should create a doc', () => {
    const expected = [{
      data: { docSuccess: false }, type: 'CREATING_DOC' },
    { data: { newDoc: [{
      docs: [{
        id: 1,
        title: 'title',
        content: 'content',
        access: 1,
        UserId: 1,
      }]
      ,
    }],
      successState: true },
      type: 'UPDATE_STORE_WITH_NEW_DOC' }];

    const store = mockStore();

    return store.dispatch(DocActions.createDoc({}, 'owner'))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should update document', () => {
    const expected = [{ data: { editPreLoader: false },
      type: 'UPDATING_DOC_DATA' }, { data: { docEdit: {
        access: '', content: '', title: '' },
        editPreLoader: true,
        editSuccess: true },
        type: 'UPDATED_DOCUMENT' }, {
          data: { redirect: true }, type: 'REDIRECT_USER' }];

    const store = mockStore();

    return store.dispatch(DocActions.upadateDoc({}, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should edit document', () => {
    const expected = [{ data: { docEdit: { access: undefined,
      content: undefined,
      title: undefined } },
      type: 'EDIT_PAGE' }];

    const store = mockStore();

    return store.dispatch(DocActions.EditData(1))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});
