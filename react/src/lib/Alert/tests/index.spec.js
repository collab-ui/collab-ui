import React from 'react';
import { shallow, mount } from 'enzyme';
import { Alert } from '@collab-ui/react';

describe('tests for <Alert />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Alert show />);

    expect(container).toMatchSnapshot();
  });

  it('should render one Alert', () => {
    const container = mount(<Alert show />);

    expect(container.find('.cui-alert').length).toEqual(1);
  });

  it('should render title', () => {
    const container = shallow(<Alert show title="test" />);

    expect(container.find('.cui-alert__title').text()).toEqual('test');
  });

  it('should render message', () => {
    const container = shallow(<Alert show message="test" />);

    expect(container.find('.cui-alert__message').text()).toEqual('test');
  });

  it('should not display closable button by default', () => {
    const container = mount(<Alert show />);

    expect(container.find('.cui-button').exists()).toEqual(false);
  });

  it('should display closable button if prop set to true', () => {
    const container = mount(<Alert show closable ariaLabel='Close' />);

    expect(container.find('.cui-button').exists()).toEqual(true);
  });

  it('should pass type attribute props (success)', () => {
    const container = mount(<Alert show type="success" />);

    expect(container.find('.cui-alert').hasClass('cui-alert--success')).toEqual(true);
  });

  it('should pass type attribute props (warning)', () => {
    const container = mount(<Alert show type="warning" />);

    expect(container.find('.cui-alert').hasClass('cui-alert--warning')).toEqual(true);
  });

  it('should pass type attribute props (error)', () => {
    const container = mount(<Alert show type="error" />);

    expect(container.find('.cui-alert').hasClass('cui-alert--error')).toEqual(true);
  });

  it('should handle onHide event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<Alert show closable onHide={countUp} ariaLabel='Close'/>);

    container.find('.cui-button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should pass otherProps prop', () => {
    const container = mount(<Alert show type="error" closable ariaLabel='test' />);

    expect(container.find('Button').props().ariaLabel).toEqual('test');
  });
});
