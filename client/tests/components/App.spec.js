import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import App from '../../components/App';
import { InitialState } from '../../reducers/InitialState';

describe(' <App />', () => {
  const wrapper = shallow(<App children={InitialState} />);
  it('should render role state', () => {
    expect(wrapper.node.props.children.roles).toEqual([]);
  });

  it('should div type', () => {
    expect(wrapper.node.type).toBe('div');
  });
});