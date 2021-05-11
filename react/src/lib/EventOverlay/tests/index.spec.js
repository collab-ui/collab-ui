import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  Button,
  EventOverlay,
  Popover
} from '@momentum-ui/react';

describe('tests for <EventOverlay />', () => {

  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match text SnapShot', () => {
    const props = {
      anchorNode: <div />
    };

    const container = shallow(
      <EventOverlay {...props}>
        <span>Test</span>
      </EventOverlay>
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  describe('should set classes for', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );

    it('top-center direction', () => {
      const container = mount(
        <Popover
          direction="top-center"
          showArrow
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      );

      container.find('.anchor').simulate('mouseenter');
      jest.runAllTimers();
      container.update();
      expect(container.find('.md-event-overlay--top').length).toEqual(1);
      expect(container.find('.md-event-overlay--arrow').length).toEqual(1);
    });

    it('bottom-center direction', () => {
      const container = mount(
        <Popover
          direction="bottom-center"
          showArrow
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      );

      container.find('.anchor').simulate('mouseenter');
      jest.runAllTimers();
      container.update();
      expect(container.find('.md-event-overlay--bottom').length).toEqual(1);
    });

    it('left-center direction', () => {
      const container = mount(
        <Popover
          direction="left-center"
          showArrow
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      );

      container.find('.anchor').simulate('mouseenter');
      jest.runAllTimers();
      container.update();
      expect(container.find('.md-event-overlay--left').length).toEqual(1);
    });

    it('right-center direction', () => {
      const container = mount(
        <Popover
          direction="right-center"
          showArrow
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      );

      container.find('.anchor').simulate('mouseenter');
      jest.runAllTimers();
      container.update();
      expect(container.find('.md-event-overlay--right').length).toEqual(1);
    });
  });

  it('on click outside, should close the popover', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );

    const container = mount(
      <div className="wrapper">
        <Popover
          allowClickAway
          direction="top-center"
          showArrow
          content={content}
          popoverTrigger={'Click'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      </div>
    );

    container.find('button').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.md-event-overlay--top').length).toEqual(1);

    // making a click outside
    container.childAt(0).childAt(1).instance().handleAllowClickAway({});
    jest.runAllTimers();
    container.update();
    expect(container.find('.md-event-overlay--top').length).toEqual(0);
  });

  it('on focus outside, should close the popover', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );

    const container = mount(
      <div className="wrapper">
        <Popover
          allowClickAway
          direction="top-center"
          showArrow
          content={content}
          popoverTrigger={'Focus'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      </div>
    );

    container.find('.anchor').simulate('focus');
    jest.runAllTimers();
    container.update();
    expect(container.find('.md-event-overlay--top').length).toEqual(1);

    // when tabbed out of the Overlay
    container.childAt(0).childAt(1).instance().handleAllowClickAway({});
    expect(container.find('.md-event-overlay--top').length).toEqual(1);
  });

  it('on closing the popover, show not focus back on the trigger if onMouseEnter present', () => {
    const container = mount(
      <div className="wrapper">
        <Popover
          allowClickAway
          direction="top-center"
          showArrow
          content={'test'}
          popoverTrigger={'MouseEnter'}
        >
          <Button ariaLabel='Hello'>Hello</Button>
        </Popover>
      </div>
    );

    container.find('Button').simulate('mouseenter');
    jest.runAllTimers();
    container.update();

    // when tabbed out of the Overlay
    container.childAt(0).childAt(1).instance().handleAllowClickAway({});
    expect(document.activeElement.type).toEqual(undefined);
  });

  it('on closing the popover, show not focus back on the trigger if onFocus present', () => {
    const container = mount(
      <div className="wrapper">
        <Popover
          allowClickAway
          direction="top-center"
          showArrow
          content={'test'}
          popoverTrigger={'Focus'}
        >
          <Button ariaLabel='Hello'>Hello</Button>
        </Popover>
      </div>
    );

    container.find('Button').simulate('focus');
    jest.runAllTimers();
    container.update();

    // when tabbed out of the Overlay
    container.childAt(0).childAt(1).instance().handleAllowClickAway({});
    expect(document.activeElement.type).toEqual(undefined);
  });

  it('on closing the popover, show focus back on the trigger if onClick present', () => {
    const container = mount(
      <div className="wrapper">
        <Popover
          allowClickAway
          direction="top-center"
          showArrow
          content={'test'}
          popoverTrigger={'Click'}
        >
          <Button ariaLabel='Hello'>Hello</Button>
        </Popover>
      </div>
    , { attachTo: document.body });

    container.find('Button').simulate('click');
    jest.runAllTimers();
    container.update();

    // when tabbed out of the Overlay
    container.childAt(0).childAt(1).instance().handleAllowClickAway({});
    expect('button').toEqual(document.activeElement.type);
  });

  it('should handle maxHeight prop', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );

    const container = mount(
      <Popover
        direction="top-center"
        showArrow
        content={content}
        popoverTrigger={'MouseEnter'}
        maxHeight={300}
      >
        <button tabIndex={0} className="anchor">Hello</button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();

    expect(container.find('.md-event-overlay__children').get(0).props.style).toHaveProperty('maxHeight', '300px');
  });

  it('should handle maxWidth prop', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );

    const container = mount(
      <Popover
        direction="top-center"
        showArrow
        content={content}
        popoverTrigger={'MouseEnter'}
        maxWidth={300}
      >
        <button tabIndex={0} className="anchor">Hello</button>
      </Popover>
    );

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();

    expect(container.find('.md-event-overlay__children').get(0).props.style).toHaveProperty('maxWidth', '300px');
  });
});
