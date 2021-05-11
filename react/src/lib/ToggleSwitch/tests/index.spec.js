import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { ToggleSwitch } from '@momentum-ui/react';

describe('tests for <ToggleSwitch />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ToggleSwitch htmlId="test123"/>);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ToggleSwitch', () => {
    const container = shallow(<ToggleSwitch htmlId="test123"/>);

    expect(container.find('input').length).toEqual(1);
  });

  it('should render label with two child spans', () => {
    const container = shallow(<ToggleSwitch htmlId="test123" label="test" />);

    expect(container.find('label').length).toEqual(1);
    expect(container.find('label').children().length).toEqual(2);
  });


  it('should handle disabled state', () => {
    const container = shallow(<ToggleSwitch htmlId="test123" disabled />);

    expect(container.find('input').props().disabled).toEqual(true);
  });

  it('should handle onChange event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = shallow(<ToggleSwitch htmlId="test" onChange={countUp} />);

    container.find('input').simulate('change');
    expect(count).toEqual(1);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = shallow(<ToggleSwitch htmlId="test" onChange={countUp} />);

    container.find('input').simulate('click');
    expect(count).toEqual(1);
  });
});
