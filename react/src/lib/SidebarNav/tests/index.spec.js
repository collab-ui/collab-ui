import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import SidebarNav from '@momentum-ui/react/SidebarNav';

describe('<SidebarNav />', () => {
  it('should render a SidebarNav', () => {
    const wrapper = shallow(<SidebarNav navSectionTitle='Overview' />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<SidebarNav className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallow(
      <SidebarNav>
        <div className='dummy-children'>Dummy Children</div>
      </SidebarNav>
    );

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });


  it('should render header if title set', () => {
    const wrapper = shallow(<SidebarNav title='testClassName'/>);

    expect(wrapper.find('.md-sidebar-nav__header').exists()).toBeTruthy();
  });

  it('should render custom headerNode if passed in', () => {
    const wrapper = shallow(
      <SidebarNav
        headerNode={
          <div className='dummy-header'>Dummy Children</div>
        }
      />
    );

    expect(wrapper.find('.dummy-header').exists()).toBeTruthy();
  });
});
