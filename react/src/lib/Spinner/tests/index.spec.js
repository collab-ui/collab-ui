import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Spinner } from '@momentum-ui/react';

describe('tests for <Spinner />', () => {
  it('should render a Spinner', () => {
    const wrapper = shallow(<Spinner />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with correct class names', () => {
    const wrapper = shallow(<Spinner />);

    expect(wrapper.find('i').hasClass('md-spinner')).toEqual(true);
  });

  it('should render with color class name', () => {
    const wrapper = shallow(<Spinner color="blue"/>);

    expect(wrapper.find('i').hasClass('md-spinner--blue')).toEqual(true);
  });

  it('should render with size class name', () => {
    const wrapper = shallow(<Spinner size={28} />);

    expect(wrapper.find('i').hasClass('md-spinner--28')).toEqual(true);
  });

  it('should render with color and size class name', () => {
    const wrapper = shallow(<Spinner color="blue" size={20}/>);

    expect(wrapper.find('i').hasClass('md-spinner--blue')).toEqual(true);
    expect(wrapper.find('i').hasClass('md-spinner--20')).toEqual(true);
  });

  it('should render progress with size class name', () => {
    const wrapper = shallow(<Spinner percentage={55} size={20}/>);

    expect(wrapper.find('.md-spinner-progress').hasClass('md-spinner-progress--20')).toEqual(true);
  });

  it('should render progress with color and size class name', () => {
    const wrapper = shallow(<Spinner percentage={55} color="blue" size={20}/>);

    expect(wrapper.find('.md-spinner-progress').hasClass('md-spinner-progress--20')).toEqual(true);
    expect(wrapper.find('.md-spinner-progress').hasClass('md-spinner-progress--blue')).toEqual(true);
  });

  it('should render progress with color and size class name with percentage', () => {
    const wrapper = shallow(<Spinner percentage={55} color="blue" size={36} showPercentage/>);

    expect(wrapper.find('.md-spinner-progress').hasClass('md-spinner-progress--36')).toEqual(true);
    expect(wrapper.find('.md-spinner-progress').hasClass('md-spinner-progress--blue')).toEqual(true);
    expect(wrapper.find('.md-spinner-progress__inset-circle').children().length).toEqual(1);
  });

  it('should render progress with color and size class name with no percentage', () => {
    const wrapper = shallow(<Spinner percentage={55} color="blue" size={36} showPercentage={false}/>);

    expect(wrapper.find('.md-spinner-progress').hasClass('md-spinner-progress--36')).toEqual(true);
    expect(wrapper.find('.md-spinner-progress').hasClass('md-spinner-progress--blue')).toEqual(true);
    expect(wrapper.find('.md-spinner-progress__inset-circle').children().length).toEqual(0);
  });

  it('should warn with showProgress but size set to anything but 36', () => {
    global.console = {warn: jest.fn()};
    const wrapper = mount(<Spinner percentage={55} color="blue" size={16} showPercentage/>);
    wrapper.update();

    expect(wrapper.find('.md-spinner-progress').hasClass('md-spinner-progress--16')).toEqual(true);
    expect(global.console.warn).toHaveBeenCalledTimes(1);
  });

  it('should render with showCheck and check class name with 100 percentage', () => {
    const wrapper = shallow(<Spinner percentage={100} showCheck/>);

    expect(wrapper.find('.md-spinner-progress__inset-circle').hasClass('md-spinner-progress__inset-circle--check')).toEqual(true);
  });

  it('should not render check if percentage is less than 100 with showCheck', () => {
    const wrapper = shallow(<Spinner percentage={90} showCheck/>);

    expect(wrapper.find('.md-spinner-progress__inset-circle').hasClass('md-spinner-progress__inset-circle--check')).toEqual(false);
  });
});
