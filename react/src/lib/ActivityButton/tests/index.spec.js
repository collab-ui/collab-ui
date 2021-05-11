import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { ActivityButton } from '@momentum-ui/react';

describe('tests for <ActivityButton />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ActivityButton type='chat' ariaLabel='test' />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ActivityButton button', () => {
    const container = mount(<ActivityButton type='camera' ariaLabel='test' />);

    expect(container.find('Button').length).toEqual(1);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<ActivityButton type='meetings' onClick={countUp} ariaLabel='test' />);

    container.find('Button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyDown as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<ActivityButton type='meetings' onClick={countUp} ariaLabel='test' />);

    container.find('Button').simulate('click');
    container
      .find('Button')
      .simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
    expect(count).toEqual(2);
  });

  it('should render meetings type', () => {
    const container = mount(<ActivityButton type='meetings' ariaLabel='test' />);

    expect(container.find('Button').hasClass('md-activity__meetings')).toEqual(true);
  });

  it('should render large meetings type', () => {
    const container = mount(<ActivityButton type='meetings' size={84} ariaLabel='test' />);

    expect(container.find('.md-button--84').exists()).toEqual(true);
  });

  it('should render custom activity', () => {
    const container = mount(<ActivityButton ariaLabel='test' type={{ color: 'red', icon: <span className='icon icon-arrow-left_32' /> }} />);

    expect(container.find('button').hasClass('md-button md-button--circle md-button--68 md-button--red md-activity')).toEqual(true);
  });
});
