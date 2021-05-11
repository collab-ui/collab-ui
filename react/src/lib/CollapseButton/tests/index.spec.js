import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { CollapseButton } from '@momentum-ui/react';

describe('tests for <CollapseButton />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CollapseButton/>);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should call onClick callback when the button is clicked', () => {
    const onClick = jest.fn();
    const container = mount(<CollapseButton onClick={onClick} />);
    container.find('.md-button').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('when collapse is true it should display right icon and label', () => {
    const container = mount(<CollapseButton collapse={true} />);
    expect(container.find('Icon').props().name).toEqual('panel-control-right_12');
    expect(container.find('Button').props().ariaLabel).toEqual('expand');
  });

  it('when collapse is false it should display right icon and label', () => {
    const container = mount(<CollapseButton collapse={false} />);
    expect(container.find('Icon').props().name).toEqual('panel-control-left_12');
    expect(container.find('Button').props().ariaLabel).toEqual('collapse');
  });

  describe('should apply correct alignment classes', () => {

    it('when alignment is left', () => {
      const container = shallow(<CollapseButton alignment={'left'} />);
      expect(container.find('.md-collapse-button').hasClass('md-collapse-button--left')).toEqual(true);
    });

    it('when alignment is right', () => {
      const container = shallow(<CollapseButton alignment={'right'} />);
      expect(container.find('.md-collapse-button').hasClass('md-collapse-button--right')).toEqual(true);
    });

    it('when alignment is top', () => {
      const container = shallow(<CollapseButton alignment={'top'} />);
      expect(container.find('.md-collapse-button').hasClass('md-collapse-button--top')).toEqual(true);
    });

    it('when alignment is down', () => {
      const container = shallow(<CollapseButton alignment={'bottom'} />);
      expect(container.find('.md-collapse-button').hasClass('md-collapse-button--bottom')).toEqual(true);
    });
  });

});
