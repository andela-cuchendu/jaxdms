import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Documents } from '../../components/Documents';

const props = {
  documentActions: {
    editDocSuccess: (() => true),
    getComponentResources: (() => true),
  },
  location: {
    pathname: 'own',
    query: '',
  },

  context: {
    router: {
      push: (() => true),
    },
  },
  stateProp: {
    userState: {
      userInfo: {
        username: 'username',
        firstname: 'fn',
        lastname: 'ln',
        email: 'email@email.com',
        role: 2,
        id: 1,
      },

    },
    userDocs: {
      viewDoc: {
        id: 1,
        title: 'title',
        content: 'content',
        UserId: 2,
        createdAt: '',
      },
      deleteDoc: {
        id: '',
        title: '',
        content: '',
        UserId: '',
        createdAt: '',
      },
      docs: [{
        id: 1,
        title: 'title',
        content: 'content',
        UserId: 2,
        createdAt: '',
      }],
    },
    roles: {
      roles: [
        {
          id: 1,
          title: 'Facilitator',
          role: 2,
        },
      ],
    },
  },
};

describe('Document component', () => {
  let docs;

  beforeEach(() => {
    docs = mount(<Documents {...props} />);
  });

  it('Should render input and one card display', () => {
    expect(docs.find('.card').length).toBe(1);
    expect(docs.find('input').length).toBe(1);
  });

  it('Should render create button', () => {
    expect(docs.find('button').length).toBe(1);
    expect(docs.find('button').text()).toBe('Create');
  });

  it('Should render create form form element', () => {
    expect(docs.find('form').length).toBe(1);
  });

  it('Should render two header title, for for search', () => {
    expect(docs.find('.header-class').length).toBe(2);
  });

  it('Should contain a FAB icon', () => {
    expect(docs.find('.btn-floating').length).toBe(1);
    expect(docs.find('.btn-floating').text()).toBe('add');
  });

});