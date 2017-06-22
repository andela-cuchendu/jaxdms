import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import UsersCard from '../../components/common/UsersCard';

describe('<UsersCard />', () => {
  let usersCard;
  const users = {
    id: 1,
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'username',
    surname: 'surname',
    email: 'email',
    role: 1,
  };

  beforeEach(() => {
    usersCard = mount(<UsersCard
      key={1}
      id={2}
      docIndex={3}
      cardType="users"
      user={users}
    />);
  });

  it('Should render props correctly', () => {
    const wrapper = usersCard.find('.card');
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.card-title').text()).toBe('username');
    expect(wrapper.find('.e2eeditu').text()).toBe('edit');
    expect(wrapper.find('.e2edeleteu').text()).toBe('delete');
  });
});
