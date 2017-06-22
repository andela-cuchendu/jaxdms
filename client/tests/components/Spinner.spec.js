import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import Spinner from '../../components/common/Spinner';

describe('<Spinner />', () => {
  let spinner;

  beforeEach(() => {
    spinner = mount(<Spinner />);
  });

  it('Should render props correctly', () => {
    const wrapper = spinner.find('.preloader-wrapper');
    expect(wrapper.length).toBe(1);
    expect(wrapper.type()).toBe('div');
  });
});
