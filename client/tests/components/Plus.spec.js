import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import Plus from '../../components/common/Plus';

describe('<Plus />', () => {
  let plus;

  beforeEach(() => {
    plus = mount(<Plus />);
  });

  it('Should render props correctly', () => {
    const wrapper = plus.find('.btn-floating');
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.material-icons').text()).toBe('add');
    expect(wrapper.type()).toBe('a');
  });
});
