import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Tab } from '@momentum-ui/react';

describe('tests for <Tab />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Tab heading="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Tab', () => {
    const container = shallow(<Tab heading="test" />);

    expect(container.find('li').length).toEqual(1);
  });

  it('should render TabHeader based on tabType prop', () => {
    const container = mount(<Tab heading="test" />);

    expect(container.find('md-tab-heading').exists()).toEqual(false);
  });

  it('should not be active by default', () => {
    const container = shallow(<Tab heading="test" />);

    expect(container.find('li').hasClass('active')).toEqual(false);
  });

  it('should pass active prop', () => {
    const container = shallow(<Tab heading="test" active />);

    expect(container.find('li').hasClass('active')).toEqual(true);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<Tab heading="test" onPress={countUp} />);

    container.find('a').simulate('click');
    expect(count).toEqual(1);
  });
});
