import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import CustomInput from '../../components/common/CustomTextInput';

describe('<CustomInput />', () => {
  let customInput;

  beforeEach(() => {
    customInput = mount(<CustomInput
      name="username"
      type="text"
      id="username"
      label="User Name"
      newClass="s6 form-spacing"
    />);
  });

  it('Should render props correctly', () => {
     const wrapper = customInput.find('input');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('');
    wrapper.simulate('focus');
    wrapper.simulate('change', { target: { value: 'Changed' } });
    expect(wrapper.text()).toBe('');
    expect(wrapper.type()).toBe('input');
  });
});
