import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Home from '../../components/Home';

describe(' <Home />', () => {
  const wrapper = mount(<Home />);
  it('Should render text', () => {
    expect(wrapper.find('.flow-text').length).toBe(1);
    const DisplayText = 'is your best electronic filing ' +
    'cabinets that provide a framework for organizing all ' +
    'documents applying access roles as to who views your document';
    expect(wrapper.find('.flow-text').text()).toEqual(DisplayText);
  });
});