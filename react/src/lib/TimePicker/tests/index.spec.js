import React from 'react';
import moment from 'moment-timezone';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { TimePicker } from '@momentum-ui/react';

describe('tests for <TimePicker />', () => {
  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should match SnapShot', () => {
    const container = shallow(
      <TimePicker id="test" selectedTime={new Date('Mon Jan 29 2018 14:42:40 GMT+0530 (IST)')} />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one TimePicker', () => {
    const container = shallow(<TimePicker />);

    expect(container.find('.md-timepicker-container').length).toEqual(1);
  });

  it('allows clicks Up/Down Arrows for minutes and hours', () => {
    const onChange = jest.fn();
    const container = mount(
      <TimePicker
        onChange={onChange}
        selectedTime={new Date('Mon Jan 29 2018 14:00:00 GMT+0530 (IST)')}
      />
    );

    container.find('.md-input').simulate('focus');
    container.update();
    const dropdown = container.find('.inline-flex');

    // Test Up Arrow
    dropdown
      .find('.icon-arrow-up_24')
      .at(0)
      .simulate('click');
    dropdown
      .find('.icon-arrow-up_24')
      .at(1)
      .simulate('click');
    expect(container.state().selectedTime.format('HH')).toEqual('15');
    expect(container.state().selectedTime.format('mm')).toEqual('01');
    expect(onChange).toHaveBeenLastCalledWith(15, 1, 0);

    // Test Down Arrow
    dropdown
      .find('.icon-arrow-down_24')
      .at(0)
      .simulate('click');
    dropdown
      .find('.icon-arrow-down_24')
      .at(1)
      .simulate('click');
    expect(container.state().selectedTime.format('HH')).toEqual('14');
    expect(container.state().selectedTime.format('mm')).toEqual('00');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });

  it('allows keypress Up/Down Arrows for minutes and hours', () => {
    const onChange = jest.fn();
    const container = mount(
      <TimePicker
        onChange={onChange}
        selectedTime={new Date('Mon Jan 29 2018 14:00:00 GMT+0530 (IST)')}
      />
    );

    container.find('.md-input').simulate('focus');
    const dropdown = container.find('.inline-flex');
    const hourInput = dropdown
      .find('input')
      .at(0)
      .simulate('focus');
    const minuteInput = dropdown
      .find('input')
      .at(1)
      .simulate('focus');

    // Test Up Arrow KeyPress
    hourInput.simulate('keyup', { keyCode: 38 });
    minuteInput.simulate('keyup', { keyCode: 38 });

    expect(container.state().selectedTime.format('HH')).toEqual('15');
    expect(container.state().selectedTime.format('mm')).toEqual('01');
    expect(onChange).toHaveBeenLastCalledWith(15, 1, 0);

    // // Test Down Arrow KeyPress
    hourInput.simulate('keyup', { keyCode: 40 });
    minuteInput.simulate('keyup', { keyCode: 40 });

    expect(container.state().selectedTime.format('HH')).toEqual('14');
    expect(container.state().selectedTime.format('mm')).toEqual('00');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });

  it('allows scroll Up/Down for minutes and hours', () => {
    const onChange = jest.fn();
    const container = mount(
      <TimePicker
        onChange={onChange}
        selectedTime={new Date('Mon Jan 29 2018 14:00:00 GMT+0530 (IST)')}
      />
    );

    container.find('.md-input').simulate('focus');
    const dropdown = container.find('.inline-flex');
    const hourInput = dropdown
      .find('input')
      .at(0)
      .simulate('focus');
    const minuteInput = dropdown
      .find('input')
      .at(1)
      .simulate('focus');

    // Test Scroll Up
    hourInput.simulate('wheel', { deltaY: -5 });
    minuteInput.simulate('wheel', { deltaY: -5 });

    expect(container.state().selectedTime.format('HH')).toEqual('15');
    expect(container.state().selectedTime.format('mm')).toEqual('01');
    expect(onChange).toHaveBeenLastCalledWith(15, 1, 0);

    // Test Scroll Down
    hourInput.simulate('wheel', { deltaY: 5 });
    minuteInput.simulate('wheel', { deltaY: 5 });

    expect(container.state().selectedTime.format('HH')).toEqual('14');
    expect(container.state().selectedTime.format('mm')).toEqual('00');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });

  it('allows clicks Up/Down Arrows for meridian', () => {
    const onChange = jest.fn();
    const container = mount(
      <TimePicker
        onChange={onChange}
        selectedTime={new Date('Mon Jan 29 2018 14:00:00 GMT+0530 (IST)')}
      />
    );

    container.find('.md-input').simulate('focus');
    const dropdown = container.find('.inline-flex');
    dropdown
      .find('.icon-arrow-up_24')
      .at(2)
      .simulate('click');
    // Test Up Arrow
    expect(container.state().selectedTime.format('A')).toEqual('AM');
    expect(onChange).toHaveBeenLastCalledWith(2, 0, 0);

    // Test Down Arrow
    dropdown
      .find('.icon-arrow-down_24')
      .at(2)
      .simulate('click');
    expect(container.state().selectedTime.format('A')).toEqual('PM');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });

  it('allows keypress Up/Down Arrows for meridian', () => {
    const onChange = jest.fn();
    const container = mount(
      <TimePicker
        onChange={onChange}
        selectedTime={new Date('Mon Jan 29 2018 14:00:00 GMT+0530 (IST)')}
      />
    );

    container.find('.md-input').simulate('focus');
    const dropdown = container.find('.inline-flex');
    const meridianInput = dropdown
      .find('input')
      .at(2)
      .simulate('focus');

    // Test Up Arrow KeyPress
    meridianInput.simulate('keyup', { keyCode: 38 });

    expect(container.state().selectedTime.format('A')).toEqual('AM');
    expect(onChange).toHaveBeenLastCalledWith(2, 0, 0);

    // Test Down Arrow KeyPress
    meridianInput.simulate('keyup', { keyCode: 40 });

    expect(container.state().selectedTime.format('A')).toEqual('PM');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });

  it('renders military Time', () => {
    const container = mount(
      <TimePicker selectedTime={new Date('Mon Jan 29 2018 14:00:00 GMT+0530 (IST)')} militaryTime />
    );

    container.find('.md-input').simulate('focus');
    const dropdown = container.find('.inline-flex');

    expect(dropdown.find('input').at(2).length).toEqual(0);
    expect(
      dropdown
        .find('input')
        .at(0)
        .props().value
    ).toEqual('14');
    expect(
      dropdown
        .find('input')
        .at(1)
        .props().value
    ).toEqual('00');
  });

  it('allows minuteInterval prop to be passed', () => {
    const container = mount(
      <TimePicker
        selectedTime={new Date('Mon Jan 29 2018 14:00:00 GMT+0530 (IST)')}
        minuteInterval={15}
      />
    );

    container.find('.md-input').simulate('focus');
    const dropdown = container.find('.inline-flex');
    // Test Up Arrow
    dropdown
      .find('.icon-arrow-up_24')
      .at(1)
      .simulate('click');
    expect(container.state().selectedTime.format('mm')).toEqual('15');
    // Test Down Arrow
    dropdown
      .find('.icon-arrow-down_24')
      .at(1)
      .simulate('click');
    expect(container.state().selectedTime.format('mm')).toEqual('00');
  });

  it('allows for direct input', () => {
    const onChange = jest.fn();
    const container = mount(
      <TimePicker
        onChange={onChange}
        selectedTime={new Date('Mon Jan 29 2018 14:00:00 GMT+0530 (IST)')}
      />
    );

    container.find('.md-input').simulate('focus');
    const dropdown = container.find('.inline-flex');
    const hourInput = dropdown
      .childAt(0)
      .children()
      .childAt(1);

    hourInput.props().onChange({ currentTarget: { value: '08' } });
    hourInput.simulate('keyup', {
      keyCode: 27,
      target: hourInput.simulate('blur'),
    });

    expect(container.state().selectedTime.format('HH')).toEqual('20');
    expect(onChange).toHaveBeenLastCalledWith(20, 0, 0);
  });
});
