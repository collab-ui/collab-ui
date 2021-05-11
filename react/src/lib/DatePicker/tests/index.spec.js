import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import DatePicker from '../index';
import moment from 'moment-timezone';

describe('tests for <DatePicker />', () => {
  const TEST_DATE = '2018-04-01';
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it("should show the calendar when focusing on the date input", () => {
    const container = shallow(
      <DatePicker selectedDate={day.toDate()}>
        <div className="trigger">Select Date</div>
      </DatePicker>
    );
    expect(toJson(container)).toMatchSnapshot();
  });

  it("should focus/select the selectedDate day if passed", () => {
    const container = mount(
      <DatePicker selectedDate={day.toDate()}>
        <div className="trigger">Select Date</div>
      </DatePicker>
    );

    container.find('.trigger').simulate('click');
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("1");
    expect(container.find('.md-button.md-datepicker__day--selected').text()).toEqual("1");
  });

  it("on press of enter should select the date", () => {
    const container = mount(
      <DatePicker selectedDate={day.toDate()} shouldCloseOnSelect={false}>
        <div className="trigger">Select Date</div>
      </DatePicker>
    );
    container.find('.trigger').simulate('click');
    container.find('.md-button.md-datepicker__day--focus').simulate('click');
    expect(container.find('.md-button.md-datepicker__day--selected').text()).toEqual("1");
  });

  it("when shouldCloseOnSelect is true should close the DatePicker", () => {
    const container = mount(
      <DatePicker selectedDate={day.toDate()} shouldCloseOnSelect={true}>
        <div className="trigger">Select Date</div>
      </DatePicker>
    );
    container.find('.trigger').simulate('click');
    container.find('.md-button.md-datepicker__day--focus').simulate('click');
    expect(container.find('.md-event-overlay__children').length).toEqual(0);
  });

  it("should handle keyBoard keys", () => {
    const container = mount(
      <DatePicker selectedDate={day.toDate()} shouldCloseOnSelect={false}>
        <div className="trigger">Select Date</div>
      </DatePicker>
    );
    container.find('.trigger').simulate('click');
    // right
    container.find('.trigger').simulate('keydown', { which: 39 });
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("2");
    // down
    container.find('.trigger').simulate('keydown', { which: 40 });
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("9");
    // up
    container.find('.trigger').simulate('keydown', { which: 38 });
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("2");
    // left
    container.find('.trigger').simulate('keydown', { which: 37 });
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("1");

    container.find('.trigger').simulate('keydown', { which: 13 });
    expect(container.find('.md-button.md-datepicker__day--selected').text()).toEqual("1");
  });

  it("onSelect/onChange callback should be called when a date is clicked", () => {
    let selectedDate;
    let changedDate;
    const onSelectFn = jest.fn((e, date) => selectedDate = date);
    const onChangeFn = jest.fn((e, date) => changedDate = date);
    const container = mount(
      <DatePicker
        selectedDate={day.toDate()}
        onSelect={onSelectFn}
        onChange={onChangeFn}
      >
        <div className="trigger">Select Date</div>
      </DatePicker>
    );
    container.find('.trigger').simulate('click');
    container.find('.md-button.md-datepicker__day--focus').simulate('click');
    expect(onSelectFn).toHaveBeenCalled();
    expect(onChangeFn).toHaveBeenCalled();

    expect(selectedDate).toEqual(day.toDate());
    expect(changedDate).toEqual(day.toDate());
  });

  it("onChange callback should be called when a focused date changes", () => {
    let changedDate;
    const onChangeFn = jest.fn((e, date) => changedDate = date);
    const container = mount(
      <DatePicker selectedDate={day.toDate()} onChange={onChangeFn}>
        <div className="trigger">Select Date</div>
      </DatePicker>
    );
    container.find('.trigger').simulate('click');
    //right
    container.find('.trigger').simulate('keydown', { which: 39 });
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("2");

    expect(onChangeFn).toHaveBeenCalled();
    expect(changedDate).toEqual(day.clone().add(1, 'day').toDate());
  });

  it("onMonthChange callback should be called when a month switch happens", () => {
    let changedDate;
    const onMonthChangeFn = jest.fn((e, date) => changedDate = date);
    const container = mount(
      <DatePicker selectedDate={day.toDate()} onMonthChange={onMonthChangeFn}>
        <div className="trigger">Select Date</div>
      </DatePicker>
    );
    container.find('.trigger').simulate('click');
    //next month
    container.find('.md-button.md-button--icon').at(1)
      .simulate('click');
    expect(changedDate).toEqual(day.clone().add(1, 'month').toDate());
    expect(onMonthChangeFn).toHaveBeenCalledTimes(1);

    //prev month
    container.find('.md-button.md-button--icon').at(0)
      .simulate('click');
    expect(changedDate).toEqual(day.toDate());
    expect(onMonthChangeFn).toHaveBeenCalledTimes(2);
  });

  it('on click outside, should close the DatePicker', () => {
    const container = mount(
      <DatePicker selectedDate={day.toDate()}>
        <div className="trigger">Select Date</div>
      </DatePicker>
    );
    container.find('.trigger').simulate('click');
    expect(container.find('.md-event-overlay')).toHaveLength(1);

    // Dispatch click outside Event
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    document.dispatchEvent(evt);

    container.update();
    expect(container.find('.md-event-overlay')).toHaveLength(0);
  });

  it('should selectedDate if valid, after the DatePicker is loaded', () => {
    /* eslint-disable react/no-multi-comp */
    class Container extends React.Component {
      state = {
        date: false
      };
      render() {
        const { date } = this.state;
        return (
          <DatePicker selectedDate={date || day.toDate()}>
            <div className="trigger">Select Date</div>
          </DatePicker>
        );
      }
    }
    /* eslint-enable react/no-multi-comp */
    const container = mount(<Container />);
    container.find('.trigger').simulate('click');
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("1");
    expect(container.find('.md-button.md-datepicker__day--selected').text()).toEqual("1");


    container.setState({ date: day.clone().add(1, 'day').toDate() });
    container.update();
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("2");
    expect(container.find('.md-button.md-datepicker__day--selected').text()).toEqual("2");
  });

});
