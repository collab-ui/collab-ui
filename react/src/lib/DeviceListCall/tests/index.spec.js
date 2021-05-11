import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import DeviceListCall from '../index';

describe('tests for <DeviceListCall />', () => {
  const header = 'Device selection';
  const devices = [
    {name: 'SJC21-Babelfish', value: '1010101', type: 'device', title:'testTitle'},
    {name: 'Use my computer', value: '2020202'}
  ];

  it('should match SnapShot', () => {
    const container = shallow(<DeviceListCall header={header} devices={devices}/>);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one device list', () => {
    const container = mount(<DeviceListCall header={header} devices={devices}/>);

    expect(container.find('.md-list').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<DeviceListCall className='menuItem' header={header} devices={devices}/>);

    expect(container.find('.md-list').hasClass('menuItem')).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<DeviceListCall header='custom header text' devices={devices}/>);

    expect(container.find('.md-list-item.md-list-item-header').text()).toEqual('custom header text');
  });

  it('should handle onSelect event', () => {
    const onSelect = jest.fn();

    const container = mount(<DeviceListCall header={header} devices={devices} onSelect={onSelect}/>);

    container.find('.md-list-item').last().simulate('click');
    expect(onSelect).toHaveBeenCalled();
  });

  describe('tests for device title prop', () => {
    it('should handle device title prop', () => {
      const container = mount(
        <DeviceListCall header={header} devices={devices} />
      );

      expect(container.find('.md-list-item').at(1).props().title).toEqual('testTitle');
    });

    it('should handle replace title with name', () => {
      const container = mount(
        <DeviceListCall header={header} devices={devices} />
      );

      expect(container.find('.md-list-item').at(2).props().title).toEqual('Use my computer');
    });
  });

});
