import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Alert } from '@momentum-ui/react';

describe('tests for <Alert />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Alert show />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Alert', () => {
    const container = mount(<Alert show closable={false} />);

    expect(container.find('.md-alert').length).toEqual(1);
  });

  it('should pass otherProps to container', () => {
    const container = mount(<Alert show closable={false} id='testid' />);

    expect(container.find('#testid').exists()).toEqual(true);
  });

  it('should pass className prop', () => {
    const container = mount(<Alert show className='testing' closable={false} />);

    expect(container.find('.testing').exists()).toEqual(true);
    expect(container.find('Alert').hasClass('testing')).toEqual(true);
  });

  it('should render title', () => {
    const container = shallow(<Alert show title="test" />);

    expect(container.find('.md-alert__title').text()).toEqual('test');
  });

  it('should render message', () => {
    const container = shallow(<Alert show message="test" />);

    expect(container.find('.md-alert__message').text()).toEqual('test');
  });

  it('should not display closable button if set to false', () => {
    const container = mount(<Alert show closable={false} />);

    expect(container.find('.md-button').exists()).toEqual(false);
  });

  it('should display closable button by default', () => {
    const container = mount(<Alert show dismissBtnProps={{ ariaLabel: 'Close' }} />);

    expect(container.find('.md-button').exists()).toEqual(true);
  });

  it('should pass type attribute props (success)', () => {
    const container = mount(<Alert show type="success" closable={false} />);

    expect(container.find('.md-alert').hasClass('md-alert--success')).toEqual(true);
  });

  it('should pass type attribute props (warning)', () => {
    const container = mount(<Alert show type="warning" closable={false} />);

    expect(container.find('.md-alert').hasClass('md-alert--warning')).toEqual(true);
  });

  it('should pass type attribute props (error)', () => {
    const container = mount(<Alert show type="error" closable={false} />);

    expect(container.find('.md-alert').hasClass('md-alert--error')).toEqual(true);
  });

  it('should handle onHide event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<Alert show dismissBtnProps={{ onClick: () => countUp(), ariaLabel: 'Close' }} />);

    container.find('.md-button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should pass dismissBtnProps prop', () => {
    const container = mount(<Alert show type="error" dismissBtnProps={{ ariaLabel: 'test' }} />);

    expect(container.find('Button').props().ariaLabel).toEqual('test');
  });
});
