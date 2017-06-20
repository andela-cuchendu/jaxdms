import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { SignIn } from '../../components/SignIn';

const props = {
  stateProp: {
    userState: {
      user: {
        error: '',
        displayLoader: 'hide-element',
      },
    },
    roles: {
      roles: [],
    },
  },
  toggleSignUp: function () {
    return true;
  },
  userActions: {
    loginUser: function (userData) {
      return userData;
    },
  },
};

describe('Signin component', () => {
  let signIn;

  beforeEach(() => {
    signIn = mount(<SignIn {...props} />);
  });

  it('Should render two input elements and one button', () => {
    expect(signIn.find('input').length).toBe(2);
    expect(signIn.find('button').length).toBe(1);
    expect(signIn.find('button').text()).toBe('SIGN IN');
  });

  it('Should render signup link', () => {
    expect(signIn.find('a').length).toBe(1);
    expect(signIn.find('a').text()).toBe('New user? Sign up');
  });

  it('Should change prop state', () => {
    signIn.find('#username').simulate('change', {
      target: {
        value: 'usernameinput',
        name: 'username' } });
    signIn.find('#password').simulate('change', {
      target: {
        value: 'userpassword',
        name: 'password' } });
    expect(signIn.state().loginData.username).toBe('usernameinput');
    expect(signIn.state().loginData.password).toBe('userpassword');
  });

  it('Should submit form', () => {
    let loginSpy = spy(props.userActions, 'loginUser');
    signIn.find('#username').simulate('change', {
      target: { value: 'tobolowoski', name: 'username' } });
    signIn.find('#password').simulate('change', {
      target: { value: '123456', name: 'password' } });
    signIn.find('form').simulate('submit');
    expect(loginSpy.called).toBe(true);
    loginSpy.restore();
  });
});
