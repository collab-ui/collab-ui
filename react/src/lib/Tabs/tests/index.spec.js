import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  Tab,
  TabContent,
  TabList,
  TabPane,
  Tabs,
} from '@momentum-ui/react';

describe('tests for <Tabs />', () => {
  it('should match SnapShot', () => {
    const container = shallow(
      <Tabs>
        <div />
      </Tabs>
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Tabs', () => {
    const container = shallow(
      <Tabs>
        <div />
      </Tabs>
    );

    expect(container.find('div').length).toEqual(2);
  });

  it('should render tabType prop (pills)', () => {
    const container = mount(
      <Tabs>
        <TabList>
          <Tab heading='First Tab'/>
        </TabList>
        <TabContent>
          <TabPane>
            First tab pane
          </TabPane>
        </TabContent>
      </Tabs>
    );

    expect(container.find('.md-tab').hasClass('md-tab--pills')).toEqual(true);
  });

  it('should render justified prop', () => {
    const container = mount(
      <Tabs justified>
        <TabList>
          <Tab heading='First Tab'/>
        </TabList>
        <TabContent>
          <TabPane>
            First tab pane
          </TabPane>
        </TabContent>
      </Tabs>
    );
    expect(container.find('.md-tab').hasClass('md-tab--justified')).toEqual(true);
  });

  it('should handle onSelect event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <Tabs onSelect={countUp}>
        <TabList>
          <Tab className="clickMe" heading='test'/>
          <Tab className="clickMee" heading='test'/>
        </TabList>
        <TabContent>
          <TabPane>Hi</TabPane>
          <TabPane>Hi</TabPane>
        </TabContent>
      </Tabs>
    );
    container.find('.clickMe > a').at(0).simulate('click');
    expect(count).toEqual(0);

    container.find('.clickMee > a').at(0).simulate('click');
    expect(count).toEqual(1);
  });

  it('should use focusIndex to focus onLoad, and also handle navigation keys', () => {
    const container = mount(
      <Tabs focus={1}>
        <TabList>
          <Tab className="one" heading='test1'/>
          <Tab className="two" heading='test2'/>
          <Tab className="three" heading='test3'/>
          <Tab className="four" disabled heading='test4'/>
        </TabList>
        <TabContent>
          <TabPane>1</TabPane>
          <TabPane>2</TabPane>
          <TabPane>3</TabPane>
          <TabPane>4</TabPane>
        </TabContent>
      </Tabs>
    );
    expect(container.find('.two.active').length).toEqual(1);
    container.find('.two.active > a').simulate('keyDown', { which: 40, charCode: 40, key: 'Right' });
    expect(container.state().focus).toEqual(2);
    container.find('.three > a').simulate('keyDown', { which: 40, charCode: 40, key: 'Right' });
    expect(container.state().focus).toEqual(0);
  });

  it('when focused index is disabled', () => {
    const container = mount(
      <Tabs focus={0}>
        <TabList>
          <Tab className="one" disabled heading='test'/>
        </TabList>
        <TabContent>
          <TabPane>Hi</TabPane>
        </TabContent>
      </Tabs>
    );
    expect(container.find('.active').length).toEqual(0);
    expect(container.state().focus).toEqual(null);
  });

});
