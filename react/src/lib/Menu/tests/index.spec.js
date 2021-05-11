import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Menu, MenuItem, SubMenu } from '@momentum-ui/react';

describe('tests for <Menu />', () => {
  beforeEach(() => {
    document.activeElement.blur();
  });

  it('should render a Menu', () => {
    const wrapper = shallow(
      <Menu>
        <MenuItem label="one" />
      </Menu>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should apply className to Menu', () => {
    const wrapper = mount(
      <Menu className="test">
        <MenuItem label="one" />
      </Menu>
    );

    expect(wrapper.find('.md-menu').hasClass('test')).toEqual(true);
  });

  it('should not focus first if focusFirst={false}', () => {
    const wrapper = mount(
      <Menu focusFirst={false}>
        <MenuItem label="one" eventKey="test-1"/>
        <MenuItem label="two" eventKey="test-2"/>
        <MenuItem label="three" eventKey="test-3"/>
      </Menu>
    );
    const instance = wrapper.find('Menu').instance();

    expect(instance.state.listContext.focus).toEqual('test-1');
    expect(document.hasFocus()).toEqual(false);
  });

  it('should focus first non disabled/ non readOnly menuItem', () => {
    const wrapper = mount(
      <Menu>
        <MenuItem label="one" isHeader eventKey="test-1"/>
        <MenuItem label="two" disabled eventKey="test-2"/>
        <MenuItem label="three" eventKey="test-3"/>
      </Menu>
    , { attachTo: document.body });
    const instance = wrapper.find('Menu').instance();

    expect(instance.state.listContext.focus).toEqual('test-3');
    expect(wrapper.find('[data-md-event-key="test-3"]').props()['aria-current']).toEqual('true');
    expect(document.hasFocus()).toEqual(true);
  });

  it('should open/select the submenu', () => {
    let selectedIndex;
    const onSelect = (e, i) => (selectedIndex = i.eventKey);
    const wrapper = mount(
      <Menu onSelect={onSelect}>
        <SubMenu label="one" eventKey="test-1">
          <MenuItem label="one-one" key="0" eventKey="test-1-1" />
        </SubMenu>
        <MenuItem label="two" eventKey="test-2"/>
        <MenuItem label="three" eventKey="test-3"/>
      </Menu>
    );
    let menuItem = wrapper.find('SubMenu').at(0);
    // click first menu item
    menuItem.find('.md-list-item').simulate('click');
    const instance = wrapper.find('Menu').instance();

    expect(selectedIndex).toEqual('test-1');
    expect(instance.state.listContext.active).toEqual(['test-1']);

    // click on first subMenu Item
    menuItem = wrapper.find('.md-menu-item').at(0);
    menuItem
      .find('.md-event-overlay__children .md-list-item')
      .simulate('click');

    expect(selectedIndex).toEqual('test-1-1');
    expect(instance.state.listContext.active).toEqual(['test-1-1']);

    expect(
      wrapper
        .find('SubMenu')
        .at(0)
        .props().isOpen
    ).toEqual(false);
  });

  it('should handle keyboard keys', () => {
    let selectedIndex;
    const onSelect = (e, i) => (selectedIndex = i.eventKey);
    const wrapper = mount(
      <Menu onSelect={onSelect}>
        <SubMenu label="one" eventKey="test-1">
          <MenuItem label="one-one" key="0" eventKey="test-1-1"/>
        </SubMenu>
        <MenuItem label="two" eventKey="test-2" />
        <MenuItem label="three" eventKey="test-3"/>
      </Menu>
    );
    const instance = wrapper.find('Menu').instance();

    // press down arrow
    let item = wrapper
      .find('SubMenu')
      .at(0)
      .find('.md-list-item');
    item.simulate('keyDown', { which: 40 });

    expect(instance.state.listContext.focus).toEqual('test-2');

    // press up arrow
    item = wrapper
      .find('MenuItem')
      .at(0)
      .find('.md-list-item');
    item.simulate('keyDown', { which: 38 });

    expect(instance.state.listContext.focus).toEqual('test-1');

    // press right arrow
    item = wrapper
      .find('SubMenu')
      .at(0)
      .find('.md-list-item');
    item.simulate('keyDown', { which: 39 });

    expect(selectedIndex).toEqual('test-1');
    expect(instance.state.listContext.focus).toEqual('test-1-1');

    const subMenuItem = wrapper
      .find('SubMenu')
      .at(0)
      .find('.md-event-overlay__children .md-list-item');

    // press left arrow
    subMenuItem.simulate('keyDown', { which: 37 });

    expect(instance.state.listContext.focus).toEqual('test-1');
  });

  it('when children are not MenuItem should throw error', () => {
    try {
      shallow(
        <Menu>
          <div>one</div>
        </Menu>
      );
    } catch (e) {
      expect(e.message).toEqual(
        '[@momentum-ui/react] Menu: children of Menu should be of type MenuItem or SubMenu'
      );
    }
    try {
      mount(
        <Menu>
          <MenuItem>one</MenuItem>
        </Menu>
      );
    } catch (e) {
      expect(e.message).toEqual(
        '[@momentum-ui/react] Menu: children of Menu should be of type MenuItem or SubMenu'
      );
    }
  });
});
