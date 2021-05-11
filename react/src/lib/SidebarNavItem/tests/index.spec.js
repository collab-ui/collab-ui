import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import SidebarNavItem from '@momentum-ui/react/SidebarNavItem';
import SidebarContext from '../../SidebarContext';
import SidebarNavContext from '../../SidebarNavContext';

describe('tests for <SidebarNavItem />', () => {
  it('should render a SidebarNavItem', () => {
    const wrapper = shallow(
      <SidebarNavItem label="one"/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = mount(<SidebarNavItem className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = mount(
      <SidebarNavItem>
        <div className='dummy-children'>Dummy Children</div>
      </SidebarNavItem>
    );

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });

  it('should have expanded class if children present and expanded', () => {
    const wrapper = mount(
      <SidebarNavItem expanded>
        <div className='dummy-children'>Dummy Children</div>
      </SidebarNavItem>
    );

    expect(wrapper.find('.md-sidebar-nav__group--expanded').exists()).toBeTruthy();
  });

  it('should expand if children present and header list item is clicked', () => {
    const wrapper = mount(
      <SidebarNavItem>
        <div className='dummy-children'>Dummy Children</div>
      </SidebarNavItem>
    );

    expect(wrapper.find('.md-sidebar-nav__group--collapsed').exists()).toBeTruthy();

    wrapper.find('ListItem').first().simulate('click');

    expect(wrapper.find('.md-sidebar-nav__group--expanded').exists()).toBeTruthy();
  });

  it('should allow titleNode to be passed', () => {
    const wrapper = mount(
      <SidebarNavItem titleNode={
        <div className='dummy-title'>Dummy Title</div>
      } />
    );

    expect(wrapper.find('.dummy-title').exists()).toBeTruthy();
  });

  it('should pass onClick to titleNode', () => {
    const wrapper = mount(
      <SidebarNavItem titleNode={
        <div className='dummy-title'>Dummy Title</div>
      }>
        <div className='dummy-children'>Dummy Children</div>
      </SidebarNavItem>
    );

    expect(wrapper.find('.md-sidebar-nav__group--collapsed').exists()).toBeTruthy();

    wrapper.find('.dummy-title').first().simulate('click');

    expect(wrapper.find('.md-sidebar-nav__group--expanded').exists()).toBeTruthy();
  });

  it('should allow icon to be passed as a string', () => {
    const wrapper = mount(
      <SidebarNavItem icon={'arrow-up'} />
    );

    expect(wrapper.find('.icon-arrow-up_16').exists()).toBeTruthy();
  });

  it('should force icon to size 16 by default', () => {
    const wrapper = mount(
      <SidebarNavItem icon={'arrow-up_12'} />
    );

    expect(wrapper.find('.icon-arrow-up_16').exists()).toBeTruthy();
  });

  it('should force icon to size 20 when secondary prop is present', () => {
    const wrapper = mount(
      <SidebarContext.Provider value={{secondary: true}}>
        <SidebarNavItem icon={'arrow-up_12'} />
      </SidebarContext.Provider>
    );

    expect(wrapper.find('.icon-arrow-up_20').exists()).toBeTruthy();
  });

  it('should allow icon as a node', () => {
    const wrapper = mount(
      <SidebarNavItem icon={<div className='dummy-icon'>Icon</div>} />
    );

    expect(wrapper.find('.dummy-icon').exists()).toBeTruthy();
  });

  it('should handle title prop', () => {
    const container = mount(
      <SidebarNavItem title='testTitle'/>
    );

    expect(container.find('.md-list-item__center').props().children).toEqual('testTitle');
  });

  describe('test for internal level prop', () => {
    it('should be primary by default', () => {
      const container = mount(
        <SidebarNavContext.Provider value={{ level: null }}>
          <SidebarNavItem>
            <div>test</div>
          </SidebarNavItem>
        </SidebarNavContext.Provider>
      );

      expect(container.find('.md-sidebar-nav__group--primary').exists()).toBeTruthy();
    });

    it('should apply secondary if primary exists', () => {
      const container = mount(
        <SidebarNavContext.Provider value={{ level: 'primary' }}>
          <SidebarNavItem>
            <div>test</div>
          </SidebarNavItem>
        </SidebarNavContext.Provider>
      );

      expect(container.find('.md-sidebar-nav__group--secondary').exists()).toBeTruthy();
    });

    it('should apply tertiary if secondary exists', () => {
      const container = mount(
        <SidebarNavContext.Provider value={{ level: 'secondary' }}>
          <SidebarNavItem>
            <div>test</div>
          </SidebarNavItem>
        </SidebarNavContext.Provider>
      );

      expect(container.find('.md-sidebar-nav__group--tertiary').exists()).toBeTruthy();
    });
  });
});
