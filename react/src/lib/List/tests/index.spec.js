import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  List,
  ListItem,
  SelectOption,
  SpaceListItem,
} from '@momentum-ui/react';

describe('tests for <List />', () => {
  beforeEach(() => {
    document.activeElement.blur();
  });

  it('should match SnapShot', () => {
    const container = shallow(<List id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one List', () => {
    const container = mount(<List />);

    expect(container.find('.md-list').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<List className='menuItem'/>);

    expect(container.find('.md-list').hasClass('menuItem')).toEqual(true);
  });

  it('should handle role prop', () => {
    const container = shallow(<List role='menuitem'/>);

    expect(container.find('.md-list').props().role).toEqual('menuitem');
  });

  it('should handle tabType prop', () => {
    const container = shallow(
      <List tabType='horizontal'>
        <ListItem />
      </List>
    );

    expect(container.find('.md-list--horizontal').length).toEqual(1);
  });

  it('should handle wrap prop', () => {
    const container = shallow(
      <List tabType='horizontal' wrap>
        <ListItem />
      </List>
    );

    expect(container.find('.md-list--wrap').length).toEqual(1);
  });

  it('should handle itemRole prop', () => {
    const container = mount(
      <List itemRole='newRole'>
        <ListItem />
      </List>
    );

    expect(container.find('[role="newRole"]').length).toEqual(1);
  });

  it('should handle type prop', () => {
    const container = mount(
      <List type='small'>
        <ListItem />
      </List>
    );

    expect(container.find('.md-list-item--small').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <List>
        <div className="testingforTC" />
      </List>
    );

    expect(container.find('.testingforTC').length).toEqual(1);
  });

  it('should handle onSelect event', () => {
    const onSelect = jest.fn();

    const container = mount(
      <List onSelect={onSelect}>
        <ListItem label="test" link='javscript:void(0)' />
        <ListItem className='secondIndex' link='javscript:void(0)' />
      </List>
    );

    container.find('.secondIndex').first().simulate('click');
    expect(onSelect).toHaveBeenCalled();
  });

  it('should handle keyPress event (Up/Down/Left/Right)', () => {
    const container = mount(
      <List>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );
    container.update();
    container.update();

    const anchor1 = container.find('.firstIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.state().listContext.focus).toEqual('test-list-2');
    anchor1.simulate('keydown', {keyCode: 39, which: 39, charCode: 39});
    expect(container.state().listContext.focus).toEqual('test-list-2');

    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    expect(container.state().listContext.focus).toEqual('test-list-3');
    anchor1.simulate('keydown', {keyCode: 37, which: 37, charCode: 37});
    expect(container.state().listContext.focus).toEqual('test-list-3');
  });

  it('should handle keyPress event with <shouldPropagateKeyDown = true> props (Up/Down/Left/Right)', () => {
    let count = 0;
    const onKeyDown = () => count++;
    const container = mount(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onKeyDown={onKeyDown}>
        <List shouldPropagateKeyDown>
          <ListItem className='firstIndex' label="test" id='test-list-1' />
          <ListItem className='secondIndex' label="test" id='test-list-2' />
          <ListItem className='thirdIndex' label="test" id='test-list-3' />
        </List>
      </div>
    );

    container.update();
    container.update();

    const anchor1 = container.find('.firstIndex').first();
 
    expect(container.children().state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.children().state().listContext.focus).toEqual('test-list-2');
    anchor1.simulate('keydown', {keyCode: 39, which: 39, charCode: 39});
    expect(container.children().state().listContext.focus).toEqual('test-list-2');
    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    anchor1.simulate('keydown', {keyCode: 37, which: 37, charCode: 37});

    expect(count).toEqual(4);
  });

  it('should handle keyPress event with <shouldPropagateKeyDown = false> props (Up/Down/Left/Right)', () => {
    let count = 0;
    const onKeyDown = () => count++;
    const container = mount(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onKeyDown={onKeyDown}>
        <List shouldPropagateKeyDown={false}>
          <ListItem className='firstIndex' label="test" id='test-list-1' />
          <ListItem className='secondIndex' label="test" id='test-list-2' />
          <ListItem className='thirdIndex' label="test" id='test-list-3' />
        </List>
      </div>
    );

    container.update();
    container.update();

    const anchor1 = container.find('.firstIndex').first();
 
    anchor1.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    anchor1.simulate('keydown', {keyCode: 39, which: 39, charCode: 39});
    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    anchor1.simulate('keydown', {keyCode: 37, which: 37, charCode: 37});

    expect(count).toEqual(0);
  });

  it('should handle keyPress event with ariaConfig={disableAriaCurrent : true} ', () => {
    const ariaConfig = {disableAriaCurrent : true};
    
    const container = mount(
      <List ariaConfig={ariaConfig}>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );
    container.update();
    container.update();

    expect(container.find('.md-list-item').at(0).props()['aria-current']).toBeFalsy();
    expect(container.find('.md-list-item').at(1).props()['aria-current']).toBeFalsy();
    expect(container.find('.md-list-item').at(2).props()['aria-current']).toBeFalsy();
    container.find('.firstIndex').first().simulate('keydown', {keyCode: 40, which: 40, charCode: 40});

    expect(container.find('.md-list-item').at(0).props()['aria-current']).toBeFalsy();
    expect(container.find('.md-list-item').at(1).props()['aria-current']).toBeFalsy();
    expect(container.find('.md-list-item').at(2).props()['aria-current']).toBeFalsy();
    container.find('.secondIndex').first().simulate('keydown', {keyCode: 40, which: 40, charCode: 40});

    expect(container.find('.md-list-item').at(0).props()['aria-current']).toBeFalsy();
    expect(container.find('.md-list-item').at(1).props()['aria-current']).toBeFalsy();
    expect(container.find('.md-list-item').at(2).props()['aria-current']).toBeFalsy();
  });

  it('should handle keyPress event with ariaConfig={disableAriaCurrent : true} and falsy values ', () => {
    
    const ariaConfigArray = [undefined, null, false, {disableAriaCurrent : false}];
    
    ariaConfigArray.map((ariaConfig) => {
      const container = mount(
        <List ariaConfig={ariaConfig}>
          <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
          <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
          <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
        </List>
      );

      container.update();
      container.update();

      expect(container.find('.md-list-item').at(0).props()['aria-current']).toEqual("true");
      expect(container.find('.md-list-item').at(1).props()['aria-current']).toBeFalsy();
      expect(container.find('.md-list-item').at(2).props()['aria-current']).toBeFalsy();
      container.find('.firstIndex').first().simulate('keydown', {keyCode: 40, which: 40, charCode: 40});

      expect(container.find('.md-list-item').at(0).props()['aria-current']).toBeFalsy();
      expect(container.find('.md-list-item').at(1).props()['aria-current']).toEqual("true");
      expect(container.find('.md-list-item').at(2).props()['aria-current']).toBeFalsy();
      container.find('.secondIndex').first().simulate('keydown', {keyCode: 40, which: 40, charCode: 40});

      expect(container.find('.md-list-item').at(0).props()['aria-current']).toBeFalsy();
      expect(container.find('.md-list-item').at(1).props()['aria-current']).toBeFalsy();
      expect(container.find('.md-list-item').at(2).props()['aria-current']).toEqual("true");

    });
  });

  it('should handle keyPress event (PageUp/PageDown/Home/End)', () => {
    const container = mount(
      <List>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();
    const anchor3 = container.find('.thirdIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 34, which: 34, charCode: 34});
    expect(container.state().listContext.focus).toEqual('test-list-3');
    anchor1.simulate('keydown', {keyCode: 35, which: 35, charCode: 35});
    expect(container.state().listContext.focus).toEqual('test-list-3');

    anchor3.simulate('keydown', {keyCode: 33, which: 33, charCode: 33});
    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor3.simulate('keydown', {keyCode: 36, which: 36, charCode: 36});
    expect(container.state().listContext.focus).toEqual('test-list-1');
  });

  it('should handle keyPress event (o)', () => {
    const container = mount(
      <List>
        <ListItem className='firstIndex' label="arrest" link='javscript:void(0)' id='test-list-1' />
        <ListItem className='secondIndex' label="detest" link='javscript:void(0)' id='test-list-2'/>
        <ListItem className='thirdIndex' label="obsessed" link='javscript:void(0)' id='test-list-3' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 79, which: 79, charCode: 79, key: 'o'});
    expect(container.state().listContext.focus).toEqual('test-list-3');
  });

  it('should move focus to active on list blur', () => {
    const container = mount(
      <List shouldFocusActive>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();
    // Simulate move focus up
    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    // Simulate click on focus
    container.find(`#${container.state().listContext.focus}`).first().simulate('click');
    expect(container.state().listContext.active).toEqual('test-list-3');
    // Simulate move focus up
    container.find(`#${container.state().listContext.focus}`).first().simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    expect(container.state().listContext.focus).toEqual('test-list-2');
    // Simulate tab exit from List
    container.find(`#${container.state().listContext.focus}`).first().simulate('keydown', {keyCode: 9, which: 9, charCode: 9});
    expect(container.state().listContext.focus).toEqual('test-list-3');
  });

  it('should initially set focus and active values', () => {
    const container = mount(
      <List active='test-list-2' shouldFocusActive focusFirst={false}>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    expect(container.state().listContext.active).toEqual('test-list-2');
    expect(container.state().listContext.focus).toEqual('test-list-2');
    expect(container.find('.md-list-item').at(0).props().tabIndex).toEqual(-1);
    expect(container.find('.md-list-item').at(1).props().tabIndex).toEqual(0);
    expect(container.find('.md-list-item').at(2).props().tabIndex).toEqual(-1);
    expect(document.hasFocus()).toEqual(false);
    expect(document.activeElement.className).toBe('');
  });

  it('should initially focus on active item', () => {
    const container = mount(
      <List active='test-list-2' shouldFocusActive focusFirst={true}>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    , { attachTo: document.body });

    expect(container.state().listContext.active).toEqual('test-list-2');
    expect(container.state().listContext.focus).toEqual('test-list-2');
    expect(container.find('.md-list-item').at(0).props().tabIndex).toEqual(-1);
    expect(container.find('.md-list-item').at(1).props().tabIndex).toEqual(0);
    expect(container.find('.md-list-item').at(2).props().tabIndex).toEqual(-1);
    expect(document.hasFocus()).toEqual(true);
    expect(document.activeElement.className).toContain('secondIndex');
  });

  it('should not track active', () => {
    const container = mount(
      <List trackActive={false}>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();
    // Simulate move focus up
    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    // Simulate click on focus
    container.find(`#${container.state().listContext.focus}`).first().simulate('click');
    expect(container.state().listContext.active).toEqual(null);
  });

  it('should loop by default', () => {
    const container = mount(
      <List>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    expect(container.state().listContext.focus).toEqual('test-list-3');
  });

  it('should not loop when shouldLoop={false}', () => {
    const container = mount(
      <List shouldLoop={false}>
        <ListItem className='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />
      </List>
    );

    const anchor1 = container.find('.firstIndex').first();

    expect(container.state().listContext.focus).toEqual('test-list-1');
    anchor1.simulate('keydown', {keyCode: 38, which: 38, charCode: 38});
    expect(container.state().listContext.focus).toEqual('test-list-1');
  });

  it('should handle SpaceListItem child', () => {
    const container = mount(
      <List>
        <SpaceListItem link='javscript:void(0)' header='header' id='test-list-1'/>
      </List>
    );

    expect(container.find('.md-list-item--space').exists()).toEqual(true);
    expect(container.state().listContext.focus).toEqual('test-list-1');
    expect(container.state().listContext.active).toEqual(null);
  });

  it('should overwrite state with active prop', () => {
    const container = mount(
      <List active={'test-list-2'}>
        <SpaceListItem link='javscript:void(0)' header='header' id='test-list-1'/>
        <SelectOption link='javscript:void(0)' id='test-list-2'/>
      </List>
    );

    expect(container.find('.md-list-item').at(0).hasClass('active')).toEqual(false);
    expect(container.find('.md-list-item').at(1).hasClass('active')).toEqual(true);
  });

  it('should handle navigation on disabled children', () => {
    const container = mount(
      <List>
        <SpaceListItem className='firstIndex' link='javscript:void(0)' header='header' disabled/>
        <SpaceListItem className='secondIndex' link='javscript:void(0)' header='header' id='test-list-1'/>
        <SpaceListItem className='thirdIndex' link='javscript:void(0)' header='header' disabled/>
        <SpaceListItem className='fourthIndex' link='javscript:void(0)' header='header' id='test-list-2'/>
        <SpaceListItem className='fifthIndex' link='javscript:void(0)' header='header' disabled/>
      </List>
    );

    expect(container.state().listContext.focus).toEqual('test-list-1');
    const anchor2 = container.find('.secondIndex').first();
    anchor2.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    const anchor4 = container.find('.fourthIndex').first();
    expect(container.state().listContext.focus).toEqual('test-list-2');
    anchor4.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.state().listContext.focus).toEqual('test-list-1');
  });

  it('should handle navigation on readOnly children', () => {
    const container = mount(
      <List>
        <SpaceListItem className='firstIndex' link='javscript:void(0)' header='header' isReadOnly/>
        <SpaceListItem className='secondIndex' link='javscript:void(0)' header='header' id='test-list-1'/>
        <SpaceListItem className='thirdIndex' link='javscript:void(0)' header='header' isReadOnly/>
        <SpaceListItem className='fourthIndex' link='javscript:void(0)' header='header' id='test-list-2'/>
        <SpaceListItem className='fifthIndex' link='javscript:void(0)' header='header' isReadOnly/>
      </List>
    );

    expect(container.state().listContext.focus).toEqual('test-list-1');
    const anchor2 = container.find('.secondIndex').first();
    anchor2.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.state().listContext.focus).toEqual('test-list-2');
    const anchor4 = container.find('.fourthIndex').first();
    anchor4.simulate('keydown', {keyCode: 40, which: 40, charCode: 40});
    expect(container.state().listContext.focus).toEqual('test-list-1');
  });

  it('should handle focusFirst prop', () => {
    const container = mount(
      <List focusFirst={false}>
        <ListItem className='firstIndex' label="test" link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" link='javscript:void(0)' />
      </List>
    );
    container.update();

    expect(document.activeElement.type).toEqual(undefined);
    expect(container.state().listContext.focus).toEqual(null);
  });

  it('should handle shouldFocusInitial prop', () => {
    const container = mount(
      <List shouldFocusInitial={false}>
        <ListItem className='firstIndex' eventKey='test-me' label="test" link='javscript:void(0)' />
        <ListItem className='secondIndex' label="test" link='javscript:void(0)' />
        <ListItem className='thirdIndex' label="test" link='javscript:void(0)' />
      </List>
    );
    container.update();

    expect(document.activeElement.type).toEqual(undefined);
    expect(container.state().listContext.focus).toEqual('test-me');
  });
});