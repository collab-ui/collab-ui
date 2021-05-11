import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Chip } from '@momentum-ui/react';

describe('<Chip />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Chip type="recording" title="Recording" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render the correct left content for a recording chip', () => {
    const container = shallow(<Chip type="recording" title="Recording" />);
    expect(container.find('.md-chip-left.recording').length).toEqual(1);
  });

  it('should render the correct left content for a file chip', () => {
    const container = shallow(<Chip type="file" fileType="audio" title="File" />);
    expect(container.find('.md-chip-left.file').length).toEqual(1);
  });

  it('should accept a custom class', () => {
    const container = shallow(<Chip className="custom-recording-class" type="recording" title="Recording" />);
    expect(container.find('.custom-recording-class').length).toEqual(1);
  });

  it('should render custom left content', () => {
    const leftContent = <div className="custom-left"/>;
    const container = shallow(<Chip leftContent={leftContent} />);
    expect(container.find('.custom-left').length).toEqual(1);
  });

  it('should render custom right content', () => {
    const rightContent = <div className="custom-right"/>;
    const container = shallow(<Chip rightContent={rightContent} />);
    expect(container.find('.custom-right').length).toEqual(1);
  });



});
