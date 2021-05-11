import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Label } from '@momentum-ui/react';

describe('tests for <Label />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(<Label htmlFor="test" label="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should have HTML for attribute', () => {
    const container = shallow(<Label htmlFor="test" label="testLabel" />);

    expect(container.find('label').props().htmlFor).toEqual('test');
  });

  it('should render label', () => {
    const container = shallow(<Label htmlFor="test" label="testLabel" />);

    expect(container.find('span').text()).toEqual('testLabel');
  });

  it('should apply dark theme class', () => {
    const container = shallow(<Label htmlFor="test" label="testLabel" theme="dark" />);

    expect(container.find('.md-label--dark').length).toEqual(1);
  });
});
