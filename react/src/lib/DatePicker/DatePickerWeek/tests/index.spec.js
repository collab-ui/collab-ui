import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import DatePickerWeek from '../index';
import moment from 'moment-timezone';

const TEST_DATE = '2018-04-01';

describe('tests for <DatePickerWeek />', () => {
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should match week SnapShot', () => {
    const container = shallow(
      <DatePickerWeek day={day} month={3} />
    );
    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render a div', () => {
    const container = shallow(
      <DatePickerWeek day={day} month={3} />
    );
    expect(container.find('.md-datepicker__week').length).toEqual(1);
  });

  it('should render 7 Day components', () => {
    const container = mount(
      <DatePickerWeek day={day} month={3} />
    );
    expect(container.find('DatePickerDay')).toHaveLength(7);
  });

});
