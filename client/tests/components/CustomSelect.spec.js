import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import CustomSelect from '../../components/common/CustomSelect';

const roles = [
  {
    id: 1,
    access: -1,
    title: 'Public',
  },
  {
    id: 2,
    access: -2,
    title: 'Private',
  },
  {
    id: 3,
    access: 'Role',
    title: 'Role',
  },
];

describe('<CustomSelect />', () => {
  let customSelect;

  beforeEach(() => {
    customSelect = mount(<CustomSelect
      addedClass="custom-select row"
      name="role"
      size={6}
      selectedValue={3}
      selectData={roles}
      disabled="Choose your role"
      label="Role"
    />);
  });

  it('Should render props correctly', () => {
    expect(customSelect.find('.custom-select').length).toBe(1);
    expect(customSelect.find('option').last().text()).toBe('Role');
    expect(customSelect.find('option').first().text()).toBe('Public');
    expect(customSelect.find('option').length).toBe(3);
  });
});
