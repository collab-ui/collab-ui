import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Form from '@momentum-ui/react/Form';

describe('tests for <Form />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Form name="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render only Form', () => {
    const container = shallow(<Form name="test" />);

    expect(container.find('.md-form').length).toEqual(1);
  });

  it('should render children under Form Content wrapper', () => {
    const container = shallow(
      <Form name="test">
        <div className="testingChildren" />
      </Form>
    );

    expect(container.find('.testingChildren').length).toEqual(1);
  });
});
