import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Card } from '@momentum-ui/react';

describe('tests for <Card />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Card id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Card', () => {
    const container = shallow(<Card />);

    expect(container.find('.md-card').length).toEqual(1);
  });

  it('should render one Clickable Card', () => {
    const container = shallow(<Card onClick={()=>{}}/>);

    expect(container.find('.md-card--clickable').length).toEqual(1);
  });

  it('should handle onClick event', () => {
    let clicked = false;
    const clicker = () => {
      clicked = true;
    };
    const container = shallow(<Card onClick={clicker}/>);

    container.find('.md-card--clickable').simulate('click');
    expect(clicked).toEqual(true);
  });

  it('should render a Card with the given classes', () => {
    const container = shallow(<Card className="testing-class"/>);

    expect(container.find('.md-card').hasClass('testing-class')).toEqual(true);
  });

  it('should render children', () => {
    const container = shallow(
      <Card>
        <div className="testingforMB" />
      </Card>
    );

    expect(container.find('.testingforMB').length).toEqual(1);
  });
});
