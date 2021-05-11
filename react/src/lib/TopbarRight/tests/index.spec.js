import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { TopbarRight } from '@momentum-ui/react';
import { prefix } from '../../utils/index';

describe('tests for <TopbarRight />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TopbarRight id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one TopbarRight', () => {
    const container = shallow(<TopbarRight />);

    expect(container.find(`.${prefix}-top-bar__right`).length).toEqual(1);
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<TopbarRight className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children', () => {
    const container = shallow(
      <TopbarRight>
        <div className="testingforTbR" />
      </TopbarRight>
    );

    expect(container.find('.testingforTbR').length).toEqual(1);
  });
});
