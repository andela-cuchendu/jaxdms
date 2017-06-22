import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import DocDisplay from '../../components/common/DocDisplay';

describe('<DocDisplay />', () => {
  let docDisplay;

  beforeEach(() => {
    docDisplay = mount(<DocDisplay
      key={1}
      id={2}
      docIndex={3}
      cardType="own"
      cardCorver={''}
      cardTitle={'Doc Title'}
      cardCreator={'creator'}
      cardUserID={5}
      currentUserId={5}
      cardContent={'content'}
    />);
  });

  it('Should render props correctly', () => {
    const wrapper = docDisplay.find('.card');
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.card-title').first().text()).toBe('Doc Title');
    expect(wrapper.find('.e2eedit').text()).toBe('edit');
    expect(wrapper.find('.e2edelete').text()).toBe('delete');
  });
});
