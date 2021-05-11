import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Badge } from '@momentum-ui/react';

describe('tests for <Badge />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Badge />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Span', () => {
    const container = shallow(<Badge />);

    expect(container.find('span').length).toEqual(1);
  });

  it('should render one Child Div', () => {
    const container = shallow(
      <Badge>
        <div>Test</div>
      </Badge>
    );

    expect(container.find('span').children().length).toEqual(1);
  });

  it('should assign conditional rounded class name', () => {
    const container = shallow(<Badge rounded />);

    expect(container.find('span').hasClass('md-badge--round')).toEqual(true);
  });

  it('should not assign conditional rounded class name', () => {
    const container = shallow(<Badge />);

    expect(container.find('span').hasClass('md-badge--round')).toEqual(false);
  });

  it('should assign conditional color class name', () => {
    const container = shallow(<Badge color="blue" />);

    expect(container.find('span').hasClass('md-badge--blue')).toEqual(true);
  });

  it('should not assign conditional color class name', () => {
    const container = shallow(<Badge />);

    expect(container.find('span').hasClass('md-badge--blue')).toEqual(false);
  });

});
