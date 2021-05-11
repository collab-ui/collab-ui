import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import AlertMeeting from '../index';
import { Avatar, CompositeAvatar } from '@momentum-ui/react';

describe('tests for <AlertMeeting />', () => {
  const attendeeOne = {title: 'J $', props: { id: 'testid' }};
  const attendeeTwo = {title: 'Hee Haw', props: { id: 'testid2' }};
  const attendeeThree = {title: 'Hollywood Squarepants'};

  const attendeeListOne = [attendeeOne];
  const attendeeListTwo = [attendeeOne, attendeeTwo];
  const attendeeListThree = [attendeeOne, attendeeTwo, attendeeThree];

  it('should match SnapShot', () => {
    const container = shallow(<AlertMeeting show attendees={attendeeListOne} onSnooze={() => {}} />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one AlertMeeting', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} />);

    expect(container.find('.md-alert.md-alert--meeting').length).toEqual(1);
  });

  it('should pass className prop', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} className='testing' />);

    expect(container.find('.testing').exists()).toEqual(true);
    expect(container.find('AlertMeeting').hasClass('testing')).toEqual(true);
  });

  it('should render meeting title', () => {
    const container = shallow(<AlertMeeting show attendees={attendeeListOne} title="Super Important Meeting" />);

    expect(container.find('.md-alert__title').text()).toEqual('Super Important Meeting');
  });

  it('should render meeting status', () => {
    const container = shallow(<AlertMeeting show attendees={attendeeListOne} status="Now" />);

    expect(container.find('.md-alert__status').text()).toEqual('Now');
  });

  it('should render meeting message', () => {
    const container = shallow(<AlertMeeting show attendees={attendeeListOne} message="Attendance Required" />);

    expect(container.find('.md-alert__message').text()).toEqual('Attendance Required');
  });

  it('should render an avatar', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} />);

    expect(container.find(Avatar).length).toEqual(1);
  });

  it('should only render a close button when onSnooze is not passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} />);

    expect(container.find('.md-button').length).toEqual(1);
  });

  it('should render snooze button when onSnooze is passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onSnooze={() => {}} />);

    expect(container.find('.md-button').length).toEqual(2);
  });

  it('should handle snooze aria-label when remindAriaLabel is passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onSnooze={() => {}} remindAriaLabel='testSnooze'/>);

    expect(container.find('button').first().props()['aria-label']).toEqual('testSnooze');
  });

  it('should handle snooze aria-label when closeAriaLabel is passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} closeAriaLabel='testClose' />);

    expect(container.find('button').last().props()['aria-label']).toEqual('testClose');
  });

  it('should use md-alert__content class when onSnooze is passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onSnooze={() => {}} />);

    expect(container.find('.md-alert__content').length).toEqual(1);
    expect(container.find('.md-alert__content--wide').length).toEqual(0);
  });

  it('should use md-alert__content--wide class when onSnooze is not passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} />);

    expect(container.find('.md-alert__content').length).toEqual(1);
    expect(container.find('.md-alert__content--wide').length).toEqual(1);
  });

  it('should render a composite avatar when attendee list is greater than 1', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListTwo} />);

    expect(container.find(CompositeAvatar).length).toEqual(1);
    expect(container.find(Avatar).length).toEqual(2);
  });

  it('should render a composite avatar with only 2 avatars when attendee list is greater than 2', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListThree} />);

    expect(container.find(CompositeAvatar).length).toEqual(1);
    expect(container.find(Avatar).length).toEqual(2);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertMeeting
        attendees={attendeeListOne}
        onClick={countUp} 
        show
      />);

    container.find('.md-alert').first().simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyDown event with onClick (Enter)', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertMeeting
        attendees={attendeeListOne}
        onClick={countUp} 
        show
        tabIndex={0}
      />);

    container.find('.md-alert').first().simulate('keyDown', { which: 32 });
    expect(count).toEqual(1);
    container.find('.md-alert').first().simulate('keyDown', { charCode: 32 });
    expect(count).toEqual(2);
  });

  it('should handle keyDown event with onClick (Space)', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertMeeting
        attendees={attendeeListOne}
        onClick={countUp} 
        show
        tabIndex={0}
      />);

    container.find('.md-alert').first().simulate('keyDown', { which: 13 });
    expect(count).toEqual(1);
    container.find('.md-alert').first().simulate('keyDown', { charCode: 13 });
    expect(count).toEqual(2);
  });

  it('should handle onKeyDown event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertMeeting
        attendees={attendeeListOne}
        onKeyDown={countUp} 
        show
      />);

    container.find('.md-alert').first().simulate('keyDown', { which: 100 });
    expect(count).toEqual(1);
  });

  it('should handle onSnooze event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertMeeting 
        attendees={attendeeListOne} 
        onSnooze={countUp} 
        show 
      />);

    container.find('.md-button').first().simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle onHide event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertMeeting
        attendees={attendeeListOne}
        onHide={countUp} 
        show
      />);

    container.find('.md-button').last().simulate('click');
    expect(count).toEqual(1);
  });

  it('should pass snoozeBtnProps prop', () => {
    const container = mount(
        <AlertMeeting
          attendees={attendeeListOne}
          onSnooze={()=>{}}
          show
          snoozeBtnProps={{ ariaLabel: 'test' }} 
        />
      );
  
    expect(container.find('Button').first().props().ariaLabel).toEqual('test');
  });

  it('should pass closeBtnProps prop', () => {
    const container = mount(
        <AlertMeeting
          attendees={attendeeListOne}
          show
          closeBtnProps={{ ariaLabel: 'test' }} 
        />
      );
  
    expect(container.find('Button').last().props().ariaLabel).toEqual('test');
  });

  it('should pass avatar props when single attendee', () => {
    const container = mount(
        <AlertMeeting
          attendees={attendeeListOne}
          show
        />
      );
  
      expect(container.find('#testid').exists()).toEqual(true);
  });

  it('should pass avatar props with multiple attendees', () => {
    const container = mount(
        <AlertMeeting
          attendees={attendeeListTwo}
          show
        />
      );
  
      expect(container.find('#testid').exists()).toEqual(true);
      expect(container.find('#testid2').exists()).toEqual(true);
  });

  it('should render an avatar prop', () => {
    const container = mount(
      <AlertMeeting
        avatar={<Avatar title='#' id='testid' />}
        show
      />
    );

    expect(container.find(Avatar).length).toEqual(1);
    expect(container.find('#testid').exists()).toEqual(true);
  });

  it('should throw error if no attendees or avatar prop', () => {
    try {
      shallow(
        <AlertMeeting show/>
      );
    } catch(e) {
      expect(e.message).toEqual('AlertMeeting needs at least one attendee to render an avatar.');
    }
  });
});