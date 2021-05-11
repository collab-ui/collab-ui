import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  Sidebar,
  SidebarNav,
  SidebarNavItem,
} from '@momentum-ui/react';

describe('<Sidebar />', () => {
  it('should render a Sidebar', () => {
    const wrapper = shallow(<Sidebar />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<Sidebar className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should add customized wrapper class name if wrapperClass prop is set', () => {
    const wrapper = shallow(<Sidebar wrapperClass='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallow(
      <Sidebar>
        <div className='dummy-children'>Dummy Children</div>
      </Sidebar>
    );

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });

  it('should add customized theme name if theme prop is set', () => {
    const wrapper = shallow(<Sidebar theme='dark'/>);

    expect(wrapper.find('.md-sidebar--dark').exists()).toBeTruthy();
  });

  it('should minimize Sidebar if the collapsable/!expanded/withIcons are set', () => {
    const wrapper = mount(<Sidebar collapsable expanded={false} />);

    expect(wrapper.find('.md-sidebar--minimized').exists()).toBeTruthy();
  });

  it('should collapse Sidebar if the collapsable/!expanded/!withIcons', () => {
    const wrapper = mount(<Sidebar collapsable expanded={false} withIcons={false} />);

    expect(wrapper.find('.md-sidebar--collapsed').exists()).toBeTruthy();
  });

  it('should show Sidebar if the collapsable and expanded are set', () => {
    const wrapper = shallow(<Sidebar collapsable expanded />);

    expect(wrapper.find('.md-sidebar--collapsed').exists()).toBeFalsy();
  });

  it('should add fixed if isFixed prop is set', () => {
    const wrapper = shallow(<Sidebar isFixed/>);

    expect(wrapper.find('.md-sidebar__wrapper--fixed').exists()).toBeTruthy();
    expect(wrapper.find('.md-sidebar--fixed').exists()).toBeTruthy();
  });

  it('should not add nested class if it has icons and no tiers in children', () => {
    const wrapper = shallow(<Sidebar isFixed/>);

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeFalsy();
  });

  it('should add nested class if it has icons and secondary tiers in children', () => {
    const wrapper = shallow(<Sidebar isFixed/>);
    wrapper.setState({
      sidebarContext: {
        secondary: true
      }
    });

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });

  it('should add nested class if it has icons and secondary tiers in children', () => {
    const wrapper = shallow(<Sidebar isFixed/>);
    wrapper.setState({
      sidebarContext: {
        tertiary: true
      }
    });

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });

  it('should not have global class with isPageLevel true', () => {
    const wrapper = shallow(<Sidebar isPageLevel/>);

    expect(wrapper.find('.md-sidebar--global').exists()).toBeFalsy();
  });

  it('should add indented class if withIcons is true', () => {
    const wrapper = shallow(<Sidebar withIcons/>);

    expect(wrapper.find('.md-sidebar--indented').exists()).toBeTruthy();
  });

  it('should add indented class if withIcons=(true), isPageLevel=(true)', () => {
    const wrapper = shallow(<Sidebar withIcons isPageLevel/>);

    expect(wrapper.find('.md-sidebar--indented').exists()).toBeFalsy();
  });

  it('should add topbar class if withTopbar is true', () => {
    const wrapper = shallow(<Sidebar withTopbar/>);

    expect(wrapper.find('.md-sidebar--topbar').exists()).toBeTruthy();
  });

  it('should have nested class if nested SidebarItems', () => {
    const wrapper = mount(
      <Sidebar>
        <SidebarNav>
          <SidebarNavItem>
            <SidebarNavItem />
          </SidebarNavItem>
        </SidebarNav>
      </Sidebar>
    );

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });

  it('should add toggle button if withToggle is true', () => {
    const wrapper = shallow(<Sidebar withToggle />);

    expect(wrapper.find('.md-sidebar__toggle').exists()).toBeTruthy();
  });

  it('should not add toggle button if withToggle is false', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.find('.md-sidebar__toggle').exists()).toBeFalsy();
  });

  it('should add minimized toggle button if withIcons/withToggle/!expanded set', () => {
    const wrapper = mount(<Sidebar withIcons withToggle expanded={false}/>);

    expect(wrapper.find('.md-sidebar__toggle--minimized').exists()).toBeTruthy();
  });

  it('should add collapsed toggle button if !withIcons/withToggle/!expanded set', () => {
    const wrapper = mount(<Sidebar withIcons={false} withToggle expanded={false}/>);

    expect(wrapper.find('.md-sidebar__toggle--collapsed').exists()).toBeTruthy();
  });

  it('should apply buttonProps to toggle button', () => {
    const wrapper = mount(<Sidebar withToggle buttonProps={{ ariaLabel: 'test' }}/>);

    expect(wrapper.find('.md-button').props()['aria-label']).toEqual('test');
  });
});
