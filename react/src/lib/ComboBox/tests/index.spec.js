import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { ComboBox, ListItem, ListItemHeader } from '@momentum-ui/react';

describe('tests for <ComboBox />', () => {

  it('should match SnapShot', () => {
    const container = shallow(
      <ComboBox options={['a', 'ab', 'abc']} />
    );
    expect(toJson(container)).toMatchSnapshot();
  });

  it('should apply className to ComboBox', () => {
    const container = mount(
      <ComboBox className='test' options={['a', 'ab', 'abc']} />
    );
    expect(container.find('.md-combo-box').hasClass('test')).toEqual(true);
    expect(container.find('Input').length).toEqual(1);
  });

  it('should display search icon by default', () => {
    const container = mount(
      <ComboBox options={['a', 'ab', 'abc']} />
    );
    expect(container.find('SearchInput').length).toEqual(1);
  });

  it('should not show searchIcon when hasSearchIcon is false', () => {
    const container = mount(
      <ComboBox hasSearchIcon={false} options={['a', 'ab', 'abc']} />
    );
    expect(container.find('Input').length).toEqual(1);
  });

  it('should show options when search string is does exists', () => {
    const container = mount(
      <ComboBox className='test' options={['a', 'ab', 'abc']} />
    );
    container.find('.md-input').simulate('change', { target: { value: 'a' } });
    expect(container.find('ListItem').length).toEqual(3);

    container.find('.md-input').simulate('change', { target: { value: 'ab' } });
    expect(container.find('ListItem').length).toEqual(2);

    container.find('.md-input').simulate('change', { target: { value: 'abc' } });
    expect(container.find('ListItem').length).toEqual(1);
  });

  it('should not show any options when search string is does not exists', () => {
    const container = mount(
      <ComboBox className='test' options={['a', 'ab', 'abc']} />
    );
    container.find('.md-input').simulate('change', { target: { value: 'xyz' } });
    expect(container.find('ListItem').length).toEqual(0);

  });

  it('should close the options list when an option is selected', () => {
    const onSelectFn = jest.fn();
    const container = mount(
      <ComboBox onSelect={onSelectFn} options={['a', 'ab', 'abc']} />
    );
    container.find('.md-input').simulate('change', { target: { value: 'a' } });
    expect(container.find('ListItem').length).toEqual(3);

    // select 'ab' option
    container.find('.md-list-item').at(1).simulate('click');
    expect(container.find('.md-input').props().value).toEqual('ab');
    expect(container.find('ListItem').length).toEqual(0);
    expect(onSelectFn).toHaveBeenCalled();

    // click back on input tag, should open the options list once again
    container.find('.md-input').simulate('click');
    expect(container.find('ListItem').length).toEqual(2);
  });

  it('should handle keyBoard events', () => {
    const onSelectFn = jest.fn();
    const container = mount(
      <ComboBox onSelect={onSelectFn} options={['a', 'ab', 'abc']} />
    );
    container.find('.md-input').simulate('change', { target: { value: 'a' } });
    expect(container.find('ListItem').length).toEqual(3);

    // focus first option using keyBoard
    container.find('.md-input').simulate('keyDown', { which: 40 });
    expect(container.find('.md-list-item').at(0).hasClass('active')).toEqual(true);

    // focus second option using keyBoard
    container.find('.md-input').simulate('keyDown', { which: 40 });
    expect(container.find('.md-list-item').at(1).hasClass('active')).toEqual(true);


    container.find('.md-input').simulate('keyDown', { which: 13 });
    expect(container.find('.md-input').props().value).toEqual('ab');
    expect(container.find('ListItem').length).toEqual(0);
    expect(onSelectFn).toHaveBeenCalled();

  });

  it('should handle keyBoard events with few items disabled', () => {
    const onSelectFn = jest.fn();
    const container = mount(
      <ComboBox onSelect={onSelectFn}>
        <ListItem disabled label="x" />
        <ListItem label="xy" />
        <ListItem label="xyz" />
      </ComboBox>
    );
    container.find('.md-input').simulate('change', { target: { value: 'x' } });
    expect(container.find('ListItem').length).toEqual(3);

    // focus on the second option since first one is disabled, on down key
    container.find('.md-input').simulate('keyDown', { which: 40 });
    expect(container.find('.md-list-item').at(1).hasClass('active')).toEqual(true);

    // focus third option on down key
    container.find('.md-input').simulate('keyDown', { which: 40 });
    expect(container.find('.md-list-item').at(2).hasClass('active')).toEqual(true);


    // focus on first option on down key
    container.find('.md-input').simulate('keyDown', { which: 40 });
    expect(container.find('.md-list-item').at(1).hasClass('active')).toEqual(true);

  });

  it('on click outside, should close the options list', () => {
    const container = mount(
      <ComboBox options={['a', 'ab', 'abc']} />
    );

    container.find('.md-input').simulate('change', { target: { value: 'a' } });
    expect(container.find('ListItem').length).toEqual(3);

    // Dispatch click outside Event
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    document.dispatchEvent(evt);

    container.update();
    expect(container.find('ListItem').length).toEqual(0);
  });

  it('ComboBox should not search when onChange listener is registered', () => {
    const onSelectFn = jest.fn();
    class ContainerDefault extends React.Component {
      state = {
        options: []
      };

      onChange = () => {
        this.setState({
          options: ['a', 'ab']
        });
      };

      render() {
        return (
          <ComboBox
            options={this.state.options}
            onSelect={onSelectFn}
            onChange={this.onChange}
          />
        );
      }
    }

    const container = mount(
      <ContainerDefault />
    );

    container.find('.md-input').simulate('change', { target: { value: 'x' } });
    expect(container.find('ListItem').length).toEqual(2);

    container.find('.md-list-item').at(1).simulate('click');
    expect(container.find('.md-input').props().value).toEqual('ab');
    expect(container.find('ListItem').length).toEqual(0);
    expect(onSelectFn).toHaveBeenCalled();

  });

  it('should render ListItem nodes as options if passed as ComboBox children', () => {
    const container = mount(
      <ComboBox options={['a', 'ab']}>
        <ListItem label="x">
          <div className="content-1" />
        </ListItem>
        <ListItem label="xy">
          <div className="content-2" />
        </ListItem>
      </ComboBox>
    );
    container.find('.md-input').simulate('change', { target: { value: 'x' } });
    expect(container.find('ListItem').length).toEqual(2);

    expect(container.find('ListItem').at(0).find('.content-1').length).toEqual(1);
    expect(container.find('ListItem').at(1).find('.content-2').length).toEqual(1);

    container.find('.md-list-item').at(1).simulate('click');
    expect(container.find('.md-input').props().value).toEqual('xy');

    container.find('.md-input').simulate('change', { target: { value: 'a' } });
    expect(container.find('ListItem').length).toEqual(0);
  });

  it('should render ListItemHeader if passed as ComboBox children', () => {
    const container = mount(
      <ComboBox options={['a', 'ab']}>
        <ListItemHeader header='test header' />
        <ListItem label="x">
          <div className="content-1" />
        </ListItem>
      </ComboBox>
    );

    container.find('.md-input').simulate('change', { target: { value: 'z' } });

    expect(container.find('ListItemHeader').exists()).toEqual(true);
    expect(container.find('ListItem').at(0).find('.content-1').exists()).toEqual(false);

    container.find('ListItemHeader').simulate('click');
    expect(container.find('.md-input').props().value).toEqual('z');
  });
});
