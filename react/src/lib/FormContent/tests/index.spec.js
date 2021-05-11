import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { FormContent } from '@momentum-ui/react';

describe('tests for <FormContent />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<FormContent id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one FormContent', () => {
    const container = shallow(<FormContent />);

    expect(container.find('.section__content').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <FormContent>
        <div className="testingChildren" />
      </FormContent>
    );

    expect(container.find('.testingChildren').length).toEqual(1);
  });
});
