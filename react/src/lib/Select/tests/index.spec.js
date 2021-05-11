import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import React from 'react';
import { ListItem, Select } from '@momentum-ui/react';

describe('tests for <Select />', () => {
  it('should match normal SnapShot', () => {
    const container = shallow(
      <Select />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = shallow(
      <Select>
        <div className='child' />
      </Select>
    );
    container.setState({ isOpen: true });
    expect(container.find('.child').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<Select className='testInput'/>);

    expect(container.find('.md-input-container').hasClass('testInput')).toEqual(true);
  });

  it('should handle buttonProps prop', () => {
    const container = mount(<Select buttonProps={{ className: 'testInput' }}/>);

    expect(container.find('button').hasClass('testInput')).toEqual(true);
  });

  it('should handle listProps prop', () => {
    const container = mount(<Select listProps={{ className: 'testInput' }}/>);

    container.find('button').simulate('click');
    expect(container.find('List').hasClass('testInput')).toEqual(true);
  });

  it('should handle overlayProps prop', () => {
    const container = mount(<Select overlayProps={{ className: 'testInput' }}/>);

    container.find('button').simulate('click');
    expect(container.find('EventOverlay').hasClass('testInput')).toEqual(true);
  });

  it('should handle isDynamic prop', () => {
    const container = mount(<Select className='testInput' isDynamic={false}/>);

    container.find('button').simulate('click');
    expect(container.state().isOpen).toEqual(true);
    expect(container.find('EventOverlay').instance().props.isDynamic).toEqual(false);
  });

  it('should close on select (non-multi)', () => {
    const container = mount(
      <Select>
        <ListItem value='1' label='test1' />
        <ListItem value='2' className='clickMe' label='test2'/>
        <ListItem value='3' label='test3'/>
      </Select>
    );

    container.find('button').simulate('click');
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe').first().simulate('click');
    expect(container.state().selected).toEqual([{label:'test2', value:'2'}]);
    expect(container.state().isOpen).toEqual(false);
  });

  it('should allow on multi-select', () => {
    const container = mount(
      <Select isMulti>
        <ListItem value='1' className='clickMe1'/>
        <ListItem value='2' className='clickMe2'/>
        <ListItem value='3'/>
      </Select>
    );

    expect(container.state().isOpen).toEqual(false);
    container.find('button').simulate('click');
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(container.state().selected).toEqual([{label:'',value:'1'}]);
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe2').first().simulate('click');
    expect(container.state().selected).toEqual([{'label':'', value:'1'},{'label':'', value:'2'}]);
    expect(container.state().isOpen).toEqual(true);
  });

  it('should unselect after selecting on multi-select', () => {
    const container = mount(
      <Select isMulti>
        <ListItem value='1' className='clickMe1'/>
        <ListItem value='2' className='clickMe2'/>
        <ListItem value='3'/>
      </Select>
    );

    expect(container.state().isOpen).toEqual(false);
    container.find('button').simulate('click');
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(container.state().selected).toEqual([{label:'', value: '1'}]);
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(container.state().selected).toEqual([]);
    expect(container.state().isOpen).toEqual(true);
  });

  it('should pass defaultValue attribute', () => {
    const container = mount(
      <Select defaultValue='test' />
    );

    expect(container.find('.md-select__label').text()).toEqual('test');
  });

  it('should continue updating input value on select', () => {
    const container = mount(
      <Select isMulti>
        <ListItem value='1' className='clickMe1'/>
        <ListItem value='2' className='clickMe2'/>
        <ListItem value='3'/>
      </Select>
    );

    expect(container.state().isOpen).toEqual(false);
    container.find('button').simulate('click');
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(container.find('.md-select__label').text()).toEqual('1 Item Selected');
    container.find('.clickMe2').first().simulate('click');
    expect(container.find('.md-select__label').text()).toEqual('2 Items Selected');
  });

  it('should handle onSelect event', () => {
    const onSelect = jest.fn();

    const container = mount(
      <Select onSelect={onSelect}>
        <ListItem value='1' className='clickMe1'/>
        <ListItem value='2' className='clickMe2'/>
        <ListItem value='3'/>
      </Select>
    );

    expect(container.state().isOpen).toEqual(false);
    container.find('button').simulate('click');
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(onSelect).toHaveBeenCalled();
  });

});
