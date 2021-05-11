import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { AlertCall, AlertCallContainer } from '@momentum-ui/react';
import uniqueId from 'lodash/uniqueId';

describe('tests for <AlertCallContainer />', () => {
  const alertTitle = 'Incoming call';
  const caller1 = {
    title: 'Jefe Guadelupe',
    alt: '+1 408-555-1212',
  };

  const caller2 = {
    title: '+1 972-555-1212',
    type: 'number'
  };

  /* eslint-disable react/no-multi-comp */

  function renderCaller1() {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title={alertTitle}
        caller={caller1}
        onReject={() => {}}
        onAnswerVoice={() => {}}
        onAnswerVideo={() => {}}
        onDeviceSelect={() => {}}
        show
      />
    );
  }

 function renderCaller2() {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title={alertTitle}
        caller={caller2}
        onReject={() => {}}
        onAnswerVoice={() => {}}
        onAnswerVideo={() => {}}
        onDeviceSelect={() => {}}
        show
      />
    );
  }

  /* eslint-enable react/no-multi-comp */

  it('should match SnapShot', () => {
    const container = shallow(<AlertCallContainer/>);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render a div', () => {
    const container = shallow(<AlertCallContainer/>);

    expect(container.find('.md-alert__container--call').length).toEqual(1);
  });

  it('should not render any call alerts if the alertList is empty', () => {
    const container = mount(<AlertCallContainer/>);
    expect(container.find(AlertCall).length).toEqual(0);
  });

  it('should render no more than two call alerts at the same time', () => {
    const alertList = [renderCaller1(), renderCaller2()];
    const container = mount(<AlertCallContainer children={alertList}/>);

    expect(container.find(AlertCall).length).toEqual(2);
  });

  it('should pass otherProps to container', () => {
    const container = shallow(<AlertCallContainer id='testid'/>);

    expect(container.find('#testid').exists()).toEqual(true);
  });
});
