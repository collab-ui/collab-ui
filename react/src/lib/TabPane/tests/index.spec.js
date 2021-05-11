import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { TabPane } from '@momentum-ui/react';

describe('tests for <TabPane />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TabPane />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one TabPane', () => {
    const container = shallow(<TabPane />);

    expect(container.find('.md-tab__pane').length).toEqual(1);
  });

  it('should render inactive by default', () => {
    const container = shallow(<TabPane />);

    expect(container.find('.md-tab__pane').hasClass('active')).toEqual(false);
  });

  it('should render active when passed', () => {
    const container = shallow(<TabPane active />);

    expect(container.find('.md-tab__pane').hasClass('active')).toEqual(true);
  });

  it('should render children', () => {
    const container = shallow(
      <TabPane>
        <div className="testingforTP" />
      </TabPane>
    );

    expect(container.find('.testingforTP').length).toEqual(1);
  });
});
