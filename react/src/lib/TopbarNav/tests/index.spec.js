import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import TopbarNav from '../index';
import { prefix } from '../../utils/index';

describe('tests for <TopbarNav />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TopbarNav id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one TopbarNav', () => {
    const container = shallow(<TopbarNav />);

    expect(container.find(`.${prefix}-top-bar__nav`).length).toEqual(1);
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<TopbarNav className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children', () => {
    const container = shallow(
      <TopbarNav>
        <div className="testingforTbN" />
      </TopbarNav>
    );

    expect(container.find('.testingforTbN').length).toEqual(1);
  });
});
