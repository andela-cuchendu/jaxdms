import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import NotFound from '../../components/NotFound';

const props = {
  userData: {
    name: {
      firstname: 'firstname',
      lastname: 'lastname',
    },
    username: 'username',
    role: {
      role: 3,
    },
    email: 'email@email.com',
  },
};

describe('<NotFound />', () => {
  let header;

  beforeEach(() => {
    header = mount(<NotFound {...props} />);
  });

  it('Should have three links', () => {
    expect(header.find('a').length).toBe(2);
    expect(header.find('a').first().text()).toBe('Jaxdms');
    expect(header.find('a').last().text()).toBe('menu');    
  });



});