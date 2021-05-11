import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Button, Popover } from '@momentum-ui/react';

describe('tests for <Popover />', () => {
  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match SnapShot', () => {
    const content = <span key='1'>Hello how are you doing</span>;
    const container = shallow(
      <Popover content={content}>
        <button>Hello</button>
      </Popover>
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Popover on click', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'Click'}>
        <button className='anchor'>Hello</button>
      </Popover>
    );

    container.find('.anchor').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('should fire onClose when closed', () => {
    const onClose = jest.fn();
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'Click'} onClose={onClose}>
        <Button ariaLabel='test' className='anchor' >Hello</Button>
      </Popover>
    );

    container.find('button').simulate('click');
    jest.runAllTimers();
    container.update();
    container.find('button').simulate('click');
    jest.runAllTimers();
    container.update();

    expect(onClose).toHaveBeenCalled();
  });

  it('should fire childs onClick event as well as Popover onClick', () => {
    const onClick = jest.fn();
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'Click'}>
        <Button ariaLabel='test' className='anchor' onClick={onClick}>Hello</Button>
      </Popover>
    );

    container.find('button').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);
    expect(onClick).toHaveBeenCalled();
  });

  it('should fire childs onFocus event as well as Popover onFocus', () => {
    const onFocus = jest.fn();
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'Focus'}>
        <Button ariaLabel='test' className='anchor' onFocus={onFocus}>Hello</Button>
      </Popover>
    );

    container.find('button').simulate('focus');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);
    expect(onFocus).toHaveBeenCalled();
  });

  it('should fire childs onMouseEnter event as well as Popover onMouseEnter', () => {
    const onMouseEnter = jest.fn();
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'MouseEnter'}>
        <Button ariaLabel='test' className='anchor' onMouseEnter={onMouseEnter}>Hello</Button>
      </Popover>
    );

    container.find('button').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);
    expect(onMouseEnter).toHaveBeenCalled();
  });

  it('focus -> mouseEnter -> mouseLeave -> blur, when popover trigger is MouseEnter', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'MouseEnter'}>
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('focus');
    jest.runAllTimers();
    container.update();
    expect(container.find('.md-event-overlay__children').length).toEqual(1);

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('blur');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('focus -> mouseEnter -> blur -> mouseLeave, when popover trigger is MouseEnter', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'MouseEnter'}>
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('focus');
    jest.runAllTimers();
    container.update();
    expect(container.find('.md-event-overlay__children').length).toEqual(1);

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('blur');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);

    container.find('.anchor').simulate('mouseleave');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('should render one Popover on mouseenter', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'MouseEnter'}>
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('should start open and close Popover', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'MouseEnter'} startOpen>
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('should render one Popover and not have Triggers', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );

    const container = mount(
      <Popover content={content} popoverTrigger={'None'} startOpen>
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);
  });

  it('should not render Popover with popoverTrigger(None)', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'None'}>
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('focus');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);

    container.find('button').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('when show and hide with showDelay/hideDelay', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover
        content={content}
        popoverTrigger={'MouseEnter'}
        showDelay={200}
        hideDelay={100}
      >
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runTimersToTime(300);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runTimersToTime(1000);
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('when show and hide with delay', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover content={content} popoverTrigger={'MouseEnter'} delay={100}>
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runTimersToTime(200);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runTimersToTime(99);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    jest.runTimersToTime(1000);
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('should remain open if mouse enters event overlay children prior to 500ms', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover
        content={content}
        popoverTrigger={'MouseEnter'}
      >
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runTimersToTime(300);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runTimersToTime(200);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.md-event-overlay__children').simulate('mouseenter');
    jest.runTimersToTime(1000);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);
  });

  it('should close if mouse enters event overlay children after 500ms', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover
        content={content}
        popoverTrigger={'MouseEnter'}
      >
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runTimersToTime(300);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runTimersToTime(600);
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('should close if mouse enters event overlay children after a custom hover delay', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing!
      </span>
    );
    const container = mount(
      <Popover
        content={content}
        popoverTrigger={'MouseEnter'}
        hoverDelay={200}
      >
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runTimersToTime(100);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runTimersToTime(300);
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('should close if mouse leaves event overlay children after entering', () => {
    const content = (
      <span className='popover-content' key='1'>
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Popover
        content={content}
        popoverTrigger={'MouseEnter'}
      >
        <button tabIndex='0' className='anchor'>
          Hello
        </button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runTimersToTime(300);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runTimersToTime(200);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.md-event-overlay__children').simulate('mouseenter');
    jest.runTimersToTime(100);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.md-event-overlay__children').simulate('mouseleave');
    jest.runTimersToTime(100);
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });
});
