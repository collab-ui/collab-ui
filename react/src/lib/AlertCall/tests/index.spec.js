import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { AlertCall, Avatar } from '@momentum-ui/react';

describe('tests for <AlertCall />', () => {
  const alertTitle = 'Incoming call';
  const caller1 = {
    title: 'Jefe Guadelupe',
    alt: '+1 408-555-1212',
  };

  const caller2 = {
    title: '+1 972-555-1212',
    type: 'number'
  };

  const caller3 = {
    title: 'SJC21-Babelfish',
    alt: '+1 469-555-1212',
    type: 'device'
  };

  const devices = [
    {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
    {name: 'Use my computer', value: '2020202'}
  ];

  it('should match SnapShot', () => {
    const container = shallow(
      <AlertCall
        caller={caller1}
        show
        title={alertTitle}
      />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should match SnapShot with devices', () => {
    const container = shallow(
      <AlertCall
        caller={caller1}
        devices={devices}
        show
        title={alertTitle}
      />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one AlertCall', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
      />);

    expect(container.find('.md-alert.md-alert--call').length).toEqual(1);
  });

  it('should handle rejectAriaLabel', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller2}
        title={alertTitle}
        rejectAriaLabel='rejectLabel'
      />);

    expect(container.find('button').last().props()['aria-label']).toEqual('rejectLabel');
  });

  it('should handle shareAriaLabel', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller2}
        title={alertTitle}
        shareAriaLabel='shareAriaLabel'
        onAnswerShare={() => {}}
      />);

    expect(container.find('button').first().props()['aria-label']).toEqual('shareAriaLabel');
  });

  it('should handle videoAriaLabel', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller2}
        title={alertTitle}
        videoAriaLabel='videoAriaLabel'
        onAnswerVideo={() => {}}
      />);

    expect(container.find('button').first().props()['aria-label']).toEqual('videoAriaLabel');
  });

  it('should handle voiceAriaLabel', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller2}
        title={alertTitle}
        voiceAriaLabel='voiceLabel'
        onAnswerVoice={() => {}}
      />);

    expect(container.find('button').first().props()['aria-label']).toEqual('voiceLabel');
  });

  it('should render meeting title', () => {
    const container = shallow(
      <AlertCall
        show
        caller={caller2}
        title={alertTitle}
      />);

    expect(container.find('.md-alert__title').text()).toEqual('Incoming call');
  });

  it('should render an avatar', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller2}
        title={alertTitle}
      />);

    expect(container.find(Avatar).length).toEqual(1);
  });

  it('should render an avatar prop', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller2}
        title={alertTitle}
        avatar={<Avatar title='#' id='testid' />}
      />
    );

    expect(container.find(Avatar).length).toEqual(1);
    expect(container.find('#testid').exists()).toEqual(true);
  });

  it('should handle caller.title prop', () => {
    const container = shallow(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
      />);

    expect(container.find('.md-alert__caller-title').text()).toEqual('Jefe Guadelupe');
  });

  it('should handle caller.alt prop', () => {
    const container = shallow(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
      />);

    expect(container.find('.md-alert__caller-subtitle').text()).toEqual('+1 408-555-1212');
  });

  describe('should handle caller.type', () => {
    it('should handle number', () => {
      const container = mount(
        <AlertCall
          show
          caller={caller2}
          title={alertTitle}
        />);

      expect(container.find('.md-avatar__letter').text()).toEqual('#');
    });

    it('should handle device', () => {
      const container = mount(
        <AlertCall
          show
          caller={caller3}
          title={alertTitle}
        />);

      expect(container.find('.md-avatar__icon').length).toEqual(1);
    });
  });

  it('should render two action buttons when onAnswerVoice is passed in', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
        onAnswerVoice={() => {}}
      />);

    expect(container.find('.md-button').length).toEqual(2);
  });

  it('should render reject action button when nothing else is passed in', () => {
    const container = mount(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
      />);

    expect(container.find('.md-button').length).toEqual(1);
  });

  it('should handle onReject event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
        onReject={countUp}
      />);

    container.find('.md-button').last().simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle onAnswerShare event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
        onAnswerShare={countUp}
      />);

    container.find('.md-button').first().simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle onAnswerVoice event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
        onAnswerVoice={countUp}
      />);

    container.find('.md-button').first().simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle onAnswerVideo event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <AlertCall
        show
        caller={caller1}
        title={alertTitle}
        onAnswerVideo={countUp}
      />);

    container.find('.md-button').first().simulate('click');
    expect(count).toEqual(1);
  });

  it('should pass rejectBtnProps prop', () => {
    const container = mount(
        <AlertCall
          caller={caller1}
          show
          title={alertTitle}
          rejectBtnProps={{ ariaLabel: 'test' }} 
        />
      );
  
    expect(container.find('Button').last().props().ariaLabel).toEqual('test');
  });

  it('should pass shareBtnProps prop', () => {
    const container = mount(
        <AlertCall
          caller={caller1}
          onAnswerShare={()=>{}}
          shareBtnProps={{ ariaLabel: 'test' }} 
          show
          title={alertTitle}
        />
      );
  
    expect(container.find('Button').first().props().ariaLabel).toEqual('test');
  });

  it('should pass videoBtnProps prop', () => {
    const container = mount(
        <AlertCall
          caller={caller1}
          onAnswerVideo={()=>{}}
          show
          title={alertTitle}
          videoBtnProps={{ ariaLabel: 'test' }} 
        />
      );
  
    expect(container.find('Button').first().props().ariaLabel).toEqual('test');
  });

  it('should pass voiceBtnProps prop', () => {
    const container = mount(
        <AlertCall
          caller={caller1}
          onAnswerVoice={()=>{}}
          show
          title={alertTitle}
          voiceBtnProps={{ ariaLabel: 'test' }} 
        />
      );
  
    expect(container.find('Button').first().props().ariaLabel).toEqual('test');
  });

  it('should pass avatarProps prop', () => {
    const container = mount(
      <AlertCall
        avatarProps={{ id: 'testid' }}
        caller={caller2}
        show
        title={alertTitle}
      />);

      expect(container.find('#testid').exists()).toEqual(true);
  });

  it('should pass deviceListProps prop', () => {
    const container = mount(
      <AlertCall
        caller={caller1}
        devices={devices}
        deviceListProps={{ id: 'testid' }}
        show
        title={alertTitle}
      />
    );

    expect(container.find('#testid').exists()).toEqual(true);
  });

  it('should pass otherProps to container', () => {
    const container = mount(
      <AlertCall
        caller={caller1}
        show
        title={alertTitle}
        id='testid'
      />
    );

    expect(container.find('#testid').exists()).toEqual(true);
  });
});
