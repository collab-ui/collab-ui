import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { TopbarMobile } from '@momentum-ui/react';
import { prefix } from '../../utils/index';

describe('tests for <TopbarMobile />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TopbarMobile id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one TopbarMobile', () => {
    const container = shallow(<TopbarMobile />);

    expect(container.at(0).find(`.${prefix}-top-bar__mobile`).length).toEqual(1);
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<TopbarMobile className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children', () => {
    const container = shallow(
      <TopbarMobile>
        <div className="testingforTbM" />
      </TopbarMobile>
    );

    expect(
      container
        .at(0)
        .find(`.${prefix}-tb-mobile__nav`)
        .props().children.props.className
    ).toEqual('testingforTbM');
  });

  it('should handle open', () => {
    const container = mount(
      <TopbarMobile />
    );

    expect(container.state().isMobileOpen).toEqual(false);
    container.find('button').first().simulate('click');
    expect(container.state().isMobileOpen).toEqual(true);
  });

  it('should handle close', () => {
    const container = mount(
      <TopbarMobile />
    );

    container.state().isMobileOpen = true;
    expect(container.state().isMobileOpen).toEqual(true);
    container.find('button').last().simulate('click');
    expect(container.state().isMobileOpen).toEqual(false);
  });

  it('should not handle keydown close if not space or enter', () => {
    const container = mount(
      <TopbarMobile />
    );

    container.state().isMobileOpen = true;
    expect(container.state().isMobileOpen).toEqual(true);
    container.find('button').last().simulate('keyDown', { which: 40 });
    expect(container.state().isMobileOpen).toEqual(true);
  });

  it('should handle keydown close on space or enter', () => {
    const container = mount(
      <TopbarMobile />
    );

    container.state().isMobileOpen = true;
    expect(container.state().isMobileOpen).toEqual(true);
    container.find('button').last().simulate('keyDown', { which: 32 });
    expect(container.state().isMobileOpen).toEqual(false);

    container.state().isMobileOpen = true;
    expect(container.state().isMobileOpen).toEqual(true);
    container.find('button').last().simulate('keyDown', { which: 13 });
    expect(container.state().isMobileOpen).toEqual(false);
  });

  it('should pass down handleClose to children if shouldCloseOnClick is false', () => {
    const container = mount(
      <TopbarMobile shouldCloseOnClick={false}>
        <button className='testButton'/>
      </TopbarMobile>
    );

    container.state().isMobileOpen = true;
    expect(container.state().isMobileOpen).toEqual(true);
    container.find('.testButton').simulate('click');
    expect(container.state().isMobileOpen).toEqual(false);
  });
});
