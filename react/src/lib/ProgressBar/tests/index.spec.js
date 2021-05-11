import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { ProgressBar } from '@momentum-ui/react';

describe('tests for <ProgressBar />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ProgressBar label="test" value={50} />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ProgressBar', () => {
    const container = mount(<ProgressBar label="test" value={50} />);

    expect(container.find('.progressbar-info').length).toEqual(1);
    expect(container.find('.progress').length).toEqual(1);
  });

  it('should render min prop', () => {
    const container = mount(<ProgressBar label="test" value={50} min={50} />);

    expect(container.find('.meter').props()['aria-valuemin']).toEqual(50);
  });

  it('should render max prop', () => {
    const container = mount(<ProgressBar label="test" value={50} max={50} />);

    expect(container.find('.meter').props()['aria-valuemax']).toEqual(50);
  });

  it('should render color prop', () => {
    const container = mount(
      <ProgressBar label="test" value={50} color="blue" />
    );

    expect(container.find('.progress').hasClass('blue')).toEqual(true);
  });

  it('should render based on dynamic prop', () => {
    const container = mount(
      <ProgressBar label="test" dynamic value={50} max={60} />
    );

    expect(container.find('.progress').hasClass('danger')).toEqual(true);
  });

  it('should render based on display format prop (none)', () => {
    const container = mount(
      <ProgressBar label="test" displayFormat="none" value={50} max={100} />
    );

    expect(container.find('.progressbar-progress').text()).toEqual('');
  });

  it('should render based on display format prop (fraction)', () => {
    const container = mount(
      <ProgressBar label="test" displayFormat="fraction" value={50} max={100} />
    );

    expect(container.find('.progressbar-progress').text()).toEqual('50 / 100');
  });

  it('should render based on display format prop (percentage)', () => {
    const container = mount(
      <ProgressBar
        label="test"
        displayFormat="percentage"
        value={50}
        max={100}
      />
    );

    expect(container.find('.progressbar-progress').text()).toEqual('50%');
  });
});
