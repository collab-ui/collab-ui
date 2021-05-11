import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { List, ListItem, ListItemSection } from '@momentum-ui/react';

describe('tests for <ListItem />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ListItem />, { disableLifecycleMethods: true });

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ListItem', () => {
    const container = mount(<ListItem />);

    expect(container.find('.md-list-item').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<ListItem className='menuItem'/>);

    expect(container.find('.md-list-item').hasClass('menuItem')).toEqual(true);
  });

  it('should handle role prop', () => {
    const container = mount(<ListItem role='menuitem'/>);

    expect(container.find('.md-list-item').props().role).toEqual('menuitem');
  });

  it('should handle type prop (small)', () => {
    const container = mount(<ListItem type='small'/>);

    expect(container.find('div').hasClass('md-list-item--small')).toEqual(true);
  });

  it('should handle type prop (large)', () => {
    const container = mount(<ListItem type='large'/>);

    expect(container.find('div').hasClass('md-list-item--large')).toEqual(true);
  });

  it('should render label', () => {
    const container = mount(<ListItem link='large' label='large'/>);

    expect(container.find('a').text()).toEqual('large');
  });

  it('should handle link prop', () => {
    const container = mount(<ListItem link='left'/>);

    expect(container.find('a').length).toEqual(1);
  });

  it('should handle customAnchorNode prop', () => {
    const container = mount(<ListItem link='left' customAnchorNode={<div className='testAnchor' />}/>);

    expect(container.find('.testAnchor').length).toEqual(1);
  });

  it('should handle refName prop', () => {
    const container = mount(<ListItem link='left' refName='testAnchor'/>);
    const instance = container.find('ListItem').instance();

    expect(instance.testAnchor.tagName).toEqual('A');
  });

  it('should handle active prop', () => {
    const container = mount(<ListItem link='left' refName='testAnchor' active/>);

    expect(container.find('a').hasClass('active')).toEqual(true);
  });

  it('should handle disabled prop', () => {
    const container = mount(<ListItem link='left' refName='testAnchor' disabled/>);

    expect(container.find('a').hasClass('disabled')).toEqual(true);
  });

  it('should handle focus prop', () => {
    const container = mount(<ListItem link='left' refName='testAnchor' focus/>);

    expect(container.find('a').props().tabIndex).toEqual(0);
  });

  it('should handle separator prop', () => {
    const container = mount(<ListItem link='left' separator/>);

    expect(container.find('.md-list-item').hasClass('md-list-item--separator')).toEqual(true);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <List>
        <ListItem label="test" link='test' onClick={countUp} />
      </List>
    );

    container.find('a').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyPress as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <List>
        <ListItem label="test" link='test' onKeyDown={countUp} />
      </List>
    );

    container
      .find('a')
      .simulate('keydown', { keyCode: 13, which: 13, charCode: 13, key: 'Space' });

    expect(count).toEqual(1);
  });

  it('should render children', () => {
    const container = mount(
      <ListItem>
        <span className='testChildren'>Test</span>
      </ListItem>
    );

    expect(container.find('span').hasClass('testChildren')).toEqual(true);
  });

  it('should handle null children', () => {
    const display = false;

    const container = mount(
      <ListItem type="large" title="List Item">
        <ListItemSection position="left">Left</ListItemSection>
        {display && <ListItemSection position="center">Center</ListItemSection>}
        <ListItemSection position="right">Right</ListItemSection>
      </ListItem>
    );

    expect(container.find('.md-list-item').length).toEqual(1);
  });

  it('should handle custom Ref prop', () => {
    const container = mount(
      <ListItem customRefProp='ref' customAnchorNode={<span>Test</span>} />
    );
    const instance = container.find('ListItem').instance();

    expect(instance.navLink.tagName).toEqual('SPAN');
  });

  describe('tests for isReadOnly Props', () => {
    it('should add class for isReadOnly prop', () => {
      const container = mount(
        <ListItem isReadOnly/>
      );

      expect(container.find('div').hasClass('md-list-item--read-only')).toEqual(true);
    });

    it('should not add onClick, onKeyDown, or tabIndex with isReadOnly prop', () => {
      const container = mount(
        <ListItem isReadOnly/>
      );

      expect(container.find('div').props().onClick).toEqual(undefined);
      expect(container.find('div').props().onKeyDown).toEqual(undefined);
      expect(container.find('div').props().tabIndex).toEqual(undefined);
    });
  });

  describe('tests for title Prop', () => {
    it('should not have title by default', () => {
      const container = mount(
        <ListItem />
      );

      expect(container.find('.md-list-item').props().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const container = mount(
        <ListItem title='testTitle'/>
      );

      expect(container.find('.md-list-item').props().title).toEqual('testTitle');
    });

    it('should handle title if label present', () => {
      const container = mount(
        <ListItem label='testTitle'/>
      );

      expect(container.find('.md-list-item').props().title).toEqual('testTitle');
    });
  });
});

