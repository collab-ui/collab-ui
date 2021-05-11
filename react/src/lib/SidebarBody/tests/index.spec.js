import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import SidebarBody from '@momentum-ui/react/SidebarBody';

describe('<SidebarBody />', () => {
  it('should render a SidebarBody', () => {
    const wrapper = shallow(<SidebarBody />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<SidebarBody className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallow(
      <SidebarBody>
        <div className='dummy-children'>Dummy Children</div>
      </SidebarBody>
    );

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });
});
