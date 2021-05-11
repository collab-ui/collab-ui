import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { TabHeader } from '@momentum-ui/react';

describe('tests for <TabHeader />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TabHeader heading="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one TabHeader', () => {
    const container = shallow(<TabHeader heading="test" />);

    expect(container.find('md-tab-heading').length).toEqual(1);
  });

  it('should render subheading', () => {
    const container = shallow(
      <TabHeader heading="test" subHeading="subtest" />
    );

    expect(container.find('div').text()).toEqual('subtest');
  });
});
