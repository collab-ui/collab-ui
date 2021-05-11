import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  Tab,
  TabList,
} from '@momentum-ui/react';

describe('tests for <TabList />', () => {
  it('should match SnapShot', () => {
    const context = { focus: 0, onFocus: () => {}, onActivate: () => {} };
    const container = shallow(<TabList id="test"><Tab heading="one"/></TabList>, { context });

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render children', () => {
    const context = { focus: 0, onFocus: () => {}, onActivate: () => {} };
    const container = mount(
      <TabList>
        <Tab heading="one"/>
      </TabList>, { context }
    );

    expect(container.find('.md-tab__item').length).toEqual(1);
  });
});
