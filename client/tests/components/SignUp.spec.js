import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import SignUpForm from '../../components/common/SignUpForm';
import { SignUp } from '../../components/SignUp';

const props = {
  userState: {
    displayLoader: 'hide-element',
    success: false,
  },
  roles: [],
};

describe('Test the signUpForm component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SignUpForm {...props} />);
  });

  it('Should renders the inputs', () => {
    expect(wrapper.find('input').length).toBe(6);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('Should be stateless', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.state()).toBe(null);
  });

});

describe('Test the sign in functions', () => {
  const secondProp = {
    stateProp: {
      userState: {
        displayLoader: 'hide-element',
        success: false,
      },
      roles: { roles: [] },
    },
    userActions: {
      saveUser: function (userData) {
        return userData;
      },
      saveUserData: function (userData) {
        return userData;
      },      
    },
  };
  let signUp;
  beforeEach(() => {
    signUp = mount(<SignUp {...secondProp} />);
    signUp.find('button').simulate('click');
  });

  it('Should initialize correct state', () => {
    signUp.find('button').simulate('click');
    expect(signUp.state().emailError).toBe(false);
    expect(signUp.state().passwordError).toBe(false);
    expect(signUp.state().user).toEqual({});
  });

  it('Should change state on editform', () => {
    signUp.find('#username').simulate('change',
      { target: {
        value: 'userinput',
        name: 'username',
      },
    });
    signUp.find('#first_name').simulate('change',
      { target: {
        value: 'firstnameinput',
        name: 'firstname',
      },
      });
      expect(signUp.state().user.username).toBe('userinput');
      expect(signUp.state().user.firstname).toBe('firstnameinput');
  });

  it('SHould render form errors', () => {
    let submitSpy = spy(secondProp.userActions, 'saveUser');
    signUp.find('#email').simulate('keyUp',
      {
        target: {
          value: 'invalid@email',
          name: 'email',
        },
      });
    signUp.find('form').simulate('submit');
    expect(signUp.state().emailError).toBe(true);
    expect(submitSpy.callCount).toBe(0);
    submitSpy.restore();
  });

  it('Should submit form on correct input', () => {
    let submitSpy = spy(secondProp.userActions, 'saveUser');
    signUp.find('#username').simulate('change', {
      target: { value: 'usernameinput', name: 'username' } });
    signUp.find('#password').simulate('keyUp', {
      target: { value: 'passwordnput', name: 'password' } });
    signUp.find('#password').simulate('change', {
      target: { value: 'passwordnput', name: 'password' } });
    signUp.find('#first_name').simulate('change', {
      target: { value: 'firstname input', name: 'firstname' } });
    signUp.find('#last_name').simulate('change', {
      target: { value: 'lastname input', name: 'lastname' } });
    signUp.find('#email').simulate('change', { target: {
      value: 'valid@email.com', name: 'email' } });
    signUp.find('#email').simulate('keyUp', {
      target: { value: 'valid@email.com', name: 'email' } });
    signUp.find('#confirm-password').simulate('change', {
      target: { value: 'passwordnput', name: 'confirmPassword' } });
    signUp.find('#confirm-password').simulate('keyUp', {
      target: { value: 'passwordnput', name: 'confirmPassword' } });
    signUp.find('form').simulate('submit');
    expect(signUp.state().emailError).toBe(false);
    expect(signUp.state().confirmPasswordError).toBe(false);
    expect(signUp.state().passwordError).toBe(false);
    submitSpy.restore();
  });
});
