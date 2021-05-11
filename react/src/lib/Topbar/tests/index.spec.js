import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Topbar, TopbarMobile } from '@momentum-ui/react';
import { prefix } from '../../utils/index';

describe('<Topbar />', () => {
  it('should render a Topbar', () => {
    const wrapper = shallow(<Topbar />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should apply fixed prop', () => {
    const container = mount(<Topbar fixed/>);

    expect(container.find(`.${prefix}-top-bar--fixed`).exists()).toBeTruthy();
  });

  it('should apply color prop', () => {
    const container = mount(<Topbar color='light' />);

    expect(container.find(`.${prefix}-top-bar--light`).exists()).toBeTruthy();
  });

  it('should not apply null color prop', () => {
    const container = mount(<Topbar color='' />);

    expect(container.find(`.${prefix}-top-bar`).props().className).toEqual(`${prefix}-top-bar`);
  });

  it('should apply brand brandAnchorElement class', () => {
    const container = mount(<Topbar brandAnchorElement={<div />}/>);

    expect(container.find(`.${prefix}-brand`).length).toEqual(1);
  });

  it('should handle brandAnchorElement prop with class', () => {
    const container = mount(<Topbar brandAnchorElement={<div className='testAnchor' />}/>);

    expect(container.find(`.${prefix}-brand`).length).toEqual(1);
    expect(container.find('.testAnchor').length).toEqual(1);
  });

  it('should handle image prop', () => {
    const container = mount(<Topbar image={<img className='testimg' src='test.png' alt='test' />}/>);

    expect(container.find('.testimg').length).toEqual(1);
  });

  it('should handle cloning onto TopbarMobile brandNode when TMbn not present', () => {
    const container = mount(
      <Topbar brandAnchorElement={<div className='testAnchor' />}>
        <TopbarMobile />
      </Topbar>
    );

    expect(container.find('.testAnchor').length).toEqual(2);
  });

  it('should handle cloning onto TopbarMobile brandNode when TMbn is present', () => {
    const container = mount(
      <Topbar brandAnchorElement={<div className='testAnchor1' />}>
        <TopbarMobile brandNode={<div className='testAnchor2' />}/>
      </Topbar>
    );

    expect(container.find('.testAnchor1').length).toEqual(1);
    expect(container.find('.testAnchor2').length).toEqual(1);
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<Topbar className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });
});
