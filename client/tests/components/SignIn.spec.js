import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { SignIn } from '../../components/SignIn';
import SignInForm from '../../components/common/SignInForm';

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

describe('Signin form component', () => {
  let signIn;

  beforeEach(() => {
    signIn = mount(<SignInForm {...props} />);
  });

  it('Should render two input elements and one button', () => {
    expect(signIn.find('input').length).toBe(2);
    expect(signIn.find('button').length).toBe(1);
    expect(signIn.find('button').text()).toBe('SIGN IN');
  });
});

describe('Signin component', () => {
  let sign;

  beforeEach(() => {
    sign = mount(<SignIn {...props} />);
  });

  it('Should render signup link', () => {
    expect(sign.find('a').length).toBe(1);
    expect(sign.find('a').text()).toBe('New user? Sign up');
  });

  it('Should change prop state', () => {
    sign.find('#username-sigin').simulate('change', {
      target: {
        value: 'usernameinput',
        name: 'username' } });
    sign.find('#password-signin').simulate('change', {
      target: {
        value: 'userpassword',
        name: 'password' } });
    expect(sign.state().loginData.username).toBe('usernameinput');
    expect(sign.state().loginData.password).toBe('userpassword');
  });

  it('Should submit form', () => {
    let loginSpy = spy(props.userActions, 'loginUser');
    sign.find('#username-sigin').simulate('change', {
      target: { value: 'tobolowoski', name: 'username' } });
    sign.find('#password-signin').simulate('change', {
      target: { value: '123456', name: 'password' } });
    sign.find('form').simulate('submit');
    expect(loginSpy.called).toBe(true);
    loginSpy.restore();
  });
});
