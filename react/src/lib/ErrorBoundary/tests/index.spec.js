import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { ErrorBoundary } from '@momentum-ui/react';

describe('tests for <ErrorBoundary />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ErrorBoundary />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ErrorBoundary', () => {
    const container = shallow(<ErrorBoundary />);

    expect(container.html()).toEqual(null);
  });

  it('should render children', () => {
    const container = shallow(
      <ErrorBoundary>
        <div className="testingforTC" />
      </ErrorBoundary>
    );

    expect(container.find('.testingforTC').length).toEqual(1);
  });
});
