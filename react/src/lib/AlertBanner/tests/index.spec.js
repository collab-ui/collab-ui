import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { AlertBanner } from '@momentum-ui/react';

describe('tests for <AlertBanner />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<AlertBanner show />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should pass className prop', () => {
    const container = mount(<AlertBanner show className='testing' />);

    expect(container.find('.testing').exists()).toEqual(true);
    expect(container.find('AlertBanner').hasClass('testing')).toEqual(true);
  });

  it('should pass closeBtnProps', () => {
    const container = mount(<AlertBanner show closable closeBtnProps={{ 'aria-label': 'test' }} />);

    expect(container.find('.md-alert-banner__close').props()['aria-label']).toEqual('test');
  });

  it('should pass otherProps to container', () => {
    const container = mount(<AlertBanner show id='testid' />);

    expect(container.find('#testid').exists()).toEqual(true);
  });

  it('should default to type "info"', () => {
    const container = shallow(<AlertBanner show />);

    expect(container.find('.md-alert-banner--info').exists()).toEqual(true);
  });

  it('should default to type "info"', () => {
    const container = shallow(<AlertBanner show type="warning"/>);

    expect(container.find('.md-alert-banner--warning').exists()).toEqual(true);
  });

  it('should not display closable button by default', () => {
    const container = shallow(
      <AlertBanner show>
        <div>Test</div>
      </AlertBanner>
    );

    expect(container.find('.md-alert-banner__close').exists()).toEqual(false);
  });

  it('should display closable button if prop set to true', () => {
    const container = shallow(<AlertBanner show closable />);

    expect(container.find('.md-alert-banner__close').exists()).toEqual(true);
  });

  it('should close the banner on click of close button', () => {
    const onClose = jest.fn();

    const container = mount(
      <AlertBanner type="info" closable show onHide={onClose}>
        ShowBanner
      </AlertBanner>
    );

    container.find('.md-alert-banner__close').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should close the banner on keyDown of Space', () => {
    const onClose = jest.fn();

    const container = mount(
      <AlertBanner type="info" closable show onHide={onClose}>
        ShowBanner
      </AlertBanner>
    );

    container.find('.md-alert-banner__close').simulate('keyDown', { which: 13 });
    expect(onClose).toHaveBeenCalled();
    container.find('.md-alert-banner__close').simulate('keyDown', { charCode: 13 });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('should close the banner on keyDown of Enter', () => {
    const onClose = jest.fn();

    const container = mount(
      <AlertBanner type="info" closable show onHide={onClose}>
        ShowBanner
      </AlertBanner>
    );

    container.find('.md-alert-banner__close').simulate('keyDown', { which: 32 });
    expect(onClose).toHaveBeenCalled();
    container.find('.md-alert-banner__close').simulate('keyDown', { charCode: 32 });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('should do nothing on keyDown of letter d', () => {
    const onClose = jest.fn();

    const container = mount(
      <AlertBanner type="info" closable show onHide={onClose}>
        ShowBanner
      </AlertBanner>
    );

    container.find('.md-alert-banner__close').simulate('keyDown', { which: 100 });
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  it('should pass onKeyDownClose function', () => {
    const onKeyDown = jest.fn();

    const container = mount(
      <AlertBanner type="info" closable show onKeyDownClose={onKeyDown}>
        ShowBanner
      </AlertBanner>
    );

    container.find('.md-alert-banner__close').simulate('keyDown', { which: 100 });
    expect(onKeyDown).toHaveBeenCalled();
  });
});
