import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import DatePickerContext from '@momentum-ui/react/DatePickerContext';
import DatePickerDay from '../index';
import moment from 'moment-timezone';

const TEST_DATE = '2018-04-21';

describe.only('tests for <DatePickerDay />', () => {
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should match selected day SnapShot', () => {
    const selected = moment(TEST_DATE);
    const container = shallow(
      <DatePickerDay day={day} month={3} selected={selected} />
    );
    expect(toJson(container)).toMatchSnapshot();
  });

  describe('should apply the right modifier classes', () => {
    it('should apply a modifier, when the date does not belong to current month', () => {
      const container = mount(
        <DatePickerDay day={day} month={10} />
      );
      expect(container.find('.md-button').hasClass('md-datepicker__day--outside-month')).toEqual(true);
    });

    it('should apply a modifier when the date is selected', () => {
      const container = mount(
        <DatePickerContext.Provider value={{selected: day}}>
          <DatePickerDay day={day} month={4} />
        </DatePickerContext.Provider>
      );
      expect(container.find('.md-button').hasClass('md-datepicker__day--selected')).toEqual(true);
    });

    it('should apply a modifier when the date is today`s date', () => {
      const container = mount(
        <DatePickerDay day={moment()} month={4} />
      );
      expect(container.find('.md-button').hasClass('md-datepicker__day--today')).toEqual(true);
    });

    it('should apply a modifier when the date is in focus', () => {
      const container = mount(
        <DatePickerContext.Provider value={{focus: day}}>
          <DatePickerDay day={day} month={4} />
        </DatePickerContext.Provider>
      );
      expect(container.find('.md-button').hasClass('md-datepicker__day--focus')).toEqual(true);
    });
  });

  it('when Day the disabled, should set disabled prop on button', () => {
    const container = mount(
      <DatePickerDay day={day} month={4} filterDate={() => true} />
    );
    expect(container.find('.md-button').props().disabled).toEqual(true);
  });

  it('onclick of Day should call the callback in context', () => {
    const onClickFn = jest.fn();
    const container = mount(
      <DatePickerContext.Provider value={{handleDayClick: onClickFn}}>
        <DatePickerDay day={day} month={4} focus={day} />
      </DatePickerContext.Provider>
    );
    container.find('.md-button').simulate('click');
    expect(onClickFn).toHaveBeenCalled();
  });

  it('on press of enter/space key on Day, should call the callback in context', () => {
    const onClickFn = jest.fn();
    const container = mount(
      <DatePickerContext.Provider value={{handleDayClick: onClickFn}}>
        <DatePickerDay day={day} month={4} focus={day} />
      </DatePickerContext.Provider>
    );
    container.find('.md-button').simulate('keyDown', { which: 13 });
    expect(onClickFn).toHaveBeenCalled();
    container.find('.md-button').simulate('keyDown', { which: 32 });
    expect(onClickFn).toHaveBeenCalledTimes(2);
  });

});
