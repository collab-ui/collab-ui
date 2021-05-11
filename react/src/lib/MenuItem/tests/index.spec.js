import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import MenuItem from '@momentum-ui/react/MenuItem';
import SelectableContext from '../../SelectableContext';

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('tests for <MenuItem />', () => {
  const context = {
    parentKeyDown: jest.fn(),
    parentOnSelect: jest.fn()
  };

  it('should render a MenuItem', () => {
    const wrapper = shallow(
      <MenuItem label="one"/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call handleClick function of context when ListItem is clicked', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <SelectableContext.Provider value={context}>
        <MenuItem onClick={onClick} label="one"/>
      </SelectableContext.Provider>
    );

    const listItem = wrapper.find('ListItem').first();
    listItem.simulate('click');
    expect(onClick).toHaveBeenCalled();
    expect(context.parentOnSelect.mock.calls.length).toBe(1);
  });

  it('should pass value to onClick handler', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <SelectableContext.Provider value={context}>
        <MenuItem onClick={onClick} label="one" value="test"/>
      </SelectableContext.Provider>
    );

    const listItem = wrapper.find('ListItem').first();
    listItem.simulate('click');
    expect(context.parentOnSelect.mock.calls.length).toBe(1);
    expect(onClick.mock.calls[0][1].value).toBe("test");
  });

  it('should call handleKeyDown function of context when keyDown is fired on ListItem', () => {
    const onKeyDown = jest.fn();

    const wrapper = mount(
      <SelectableContext.Provider value={context}>
        <MenuItem onKeyDown={onKeyDown} label="one" value="test"/>
      </SelectableContext.Provider>
    );

    const listItem = wrapper.find('ListItem').first();
    listItem.simulate('keydown');
    expect(context.parentKeyDown.mock.calls.length).toBe(1);
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should apply class for isHeader prop', () => {
    const container = mount(
      <MenuItem isHeader />
    );

    expect(container.find('.md-menu-item__header').exists()).toEqual(true);
  });

  describe('tests for title Prop', () => {
    it('should not have title by default', () => {
      const container = mount(
        <MenuItem />
      );

      expect(container.find('.md-list-item').props().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const container = mount(
        <MenuItem title='testTitle'/>
      );

      expect(container.find('.md-list-item').props().title).toEqual('testTitle');
    });
  });
});
