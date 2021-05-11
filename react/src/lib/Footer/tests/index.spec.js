import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Footer } from '@momentum-ui/react';

describe('tests for <Footer />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Footer />);
    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render top section only if children props is passed', () => {
    const container = shallow(<Footer children='dummy content' />);

    expect(container.find('.md-footer__top').exists()).toBeTruthy();
    expect(container.find('.md-footer__bottom').exists()).toBeFalsy();
  });

  it('should render social section only if only social content is passed', () => {
    const container = shallow(<Footer social='Cisco' />);

    expect(container.find('.md-footer__bottom--position-right').exists()).toBeTruthy();
    expect(container.find('.md-footer__bottom--position-left').exists()).toBeFalsy();
    expect(container.find('.md-footer__top').exists()).toBeFalsy();
  });

  it('should render logo section only if only logo content is passed', () => {
    const container = shallow(<Footer logo='Cisco Webex' />);

    expect(container.find('.md-footer__bottom--position-left').exists()).toBeTruthy();
    expect(container.find('.md-footer__bottom--position-right').exists()).toBeFalsy();
    expect(container.find('.md-footer__top').exists()).toBeFalsy();
  });

  it('should render copyright section only if only copyright content is passed', () => {
    const container = shallow(<Footer copyright='Cisco Webex' />);

    expect(container.find('.md-footer__bottom--position-left').exists()).toBeTruthy();
    expect(container.find('.md-footer__bottom--position-right').exists()).toBeFalsy();
    expect(container.find('.md-footer__top').exists()).toBeFalsy();
  });
});
