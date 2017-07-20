import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import Header from '../../components/common/Header';

const props = {
  User: {
    id: 4,
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

describe('<Header />', () => {
  let header;

  beforeEach(() => {
    header = mount(<Header {...props} />);
  });

  it('Should have two links', () => {
    expect(header.find('a').length).toBe(2);
    expect(header.find('a').first().text()).toBe('Jaxdms');
    expect(header.find('a').last().text()).toBe('menu');
  });
});
