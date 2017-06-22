import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import Logout from '../../components/common/Logout';

describe('<Logout />', () => {
  let logout;

  beforeEach(() => {
    logout = mount(<Logout />);
  });

  it('Should render props correctly', () => {
    const wrapper = logout.find('a');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('SIGN IN');
  });
});
