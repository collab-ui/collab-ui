import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import MenuContent from '@momentum-ui/react/MenuContent';


describe('tests for <MenuContent />', () => {
  it('should render a MenuContent', () => {
    const wrapper = shallow(
      <MenuContent>test</MenuContent>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should apply className to MenuContent', () => {
    const wrapper = shallow(
      <MenuContent className="test">test</MenuContent>
    );
    expect(wrapper.find('.md-menu-content').hasClass('test')).toEqual(true);
  });

});
