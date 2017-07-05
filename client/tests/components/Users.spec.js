import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Users } from '../../components/Users';

const props = {
  userActions: {
    fetchUsers: () => true,
  },
  location: {
    pathname: 'own',
    query: '',
  },

  context: {
    router: {
      push: () => true,
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
      users: [
        {
          username: 'username',
          firstname: 'fn',
          lastname: 'ln',
          email: 'email@email.com',
          role: 2,
          id: 1,
        },
      ],
      deleteUser:
      {
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

describe('User component', () => {
  let users;

  beforeEach(() => {
    users = mount(<Users {...props} />);
  });

  it('Should render six inputs and one user display card', () => {
    expect(users.find('.card').length).toBe(1);
    expect(users.find('input').length).toBe(6);
  });

  it('Should render Signup button for create', () => {
    expect(users.find('button').length).toBe(1);
    expect(users.find('button').text()).toBe('Create Users');
  });

  it('Should render create form form element', () => {
    expect(users.find('form').length).toBe(1);
  });

  it('Should render one header title', () => {
    expect(users.find('.header-class').length).toBe(2);
  });

  it('Should contain a FAB icon', () => {
    expect(users.find('.btn-floating').length).toBe(1);
    expect(users.find('.btn-floating').text()).toBe('add');
  });

});