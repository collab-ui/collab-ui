import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Select, SelectOption } from '@momentum-ui/react';

describe('tests for <SelectOption />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<SelectOption/>);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one SelectOption', () => {
    const container = mount(<SelectOption />);

    expect(container.find('SelectOption').exists()).toEqual(true);
    expect(container.find('ListItemSection').length).toEqual(2);
    expect(container.find('ListItem').exists()).toEqual(true);
  });

  it('should handle className prop', () => {
    const container = mount(<SelectOption className='menuItem'/>);

    expect(container.find('SelectOption').hasClass('menuItem')).toEqual(true);
  });

  it('should handle label prop', () => {
    const container = mount(<SelectOption label='header' />);

    expect(container.find('ListItemSection').first().text()).toEqual('header');
  });

  it('should handle isMulti from context', () => {
    const container = mount(
      <Select isMulti>
        <SelectOption />
      </Select>
    );

    container.find('button').simulate('click');
    expect(container.find('ListItemSection').length).toEqual(0);
  });

  it('should handle active prop without isMulti', () => {
    const container = mount(<SelectOption active/>);

    expect(container.find('Icon').exists()).toEqual(true);
  });


  it('should handle active prop with isMulti in context', () => {
    const container = mount(
      <Select isMulti>
        <SelectOption active />
      </Select>
    );

    container.find('button').simulate('click');
    expect(container.find('Checkbox').props().checked).toEqual(true);
  });

  it('should pass props to ListItem', () => {
    const customAnchorNode = <div className='custom-class' />;
    const container = mount(<SelectOption customAnchorNode={customAnchorNode} />);

    expect(container.find('.custom-class').length).toEqual(1);
  });

  it('should render children', () => {
    const container = mount(
      <SelectOption>
        <span className='testChildren'>Test</span>
      </SelectOption>
    );

    expect(container.find('span').hasClass('testChildren')).toEqual(true);
  });

  describe('tests for title Prop', () => {
    it('should not have title by default', () => {
      const container = mount(
        <SelectOption />
      );

      expect(container.find('.md-list-item').props().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const container = mount(
        <SelectOption title='testTitle'/>
      );

      expect(container.find('.md-list-item').props().title).toEqual('testTitle');
    });

    it('should handle title if label present', () => {
      const container = mount(
        <SelectOption label='testTitle'/>
      );

      expect(container.find('.md-list-item').props().title).toEqual('testTitle');
    });
  });
});

