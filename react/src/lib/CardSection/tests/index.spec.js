import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { CardSection } from '@momentum-ui/react';

describe('tests for <CardSection />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CardSection id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one CardSection', () => {
    const container = shallow(<CardSection />);

    expect(container.find('.md-card-section').length).toEqual(1);
  });

  it('should render one full CardSection', () => {
    const container = shallow(<CardSection full/>);

    expect(container.find('.md-card-section--full').length).toEqual(1);
  });

  it('should render a CardSection with the given classes', () => {
    const container = shallow(<CardSection className="testing-class"/>);

    expect(container.find('.md-card-section').hasClass('testing-class')).toEqual(true);
  });

  it('should render children', () => {
    const container = shallow(
      <CardSection>
        <div className="testingforMB" />
      </CardSection>
    );

    expect(container.find('.testingforMB').length).toEqual(1);
  });
});
