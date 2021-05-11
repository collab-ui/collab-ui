import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { FormInfo } from '@momentum-ui/react';

describe('tests for <FormInfo />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<FormInfo />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one FormInfo', () => {
    const container = shallow(<FormInfo />);

    expect(container.find('.section__info').length).toEqual(1);
  });

  it('should render title', () => {
    const container = shallow(<FormInfo title="test" />);

    expect(container.find('.section__title').text()).toEqual('test');
  });

  it('should render description', () => {
    const container = shallow(<FormInfo description="test" />);

    expect(container.find('.section__description').text()).toEqual('test');
  });
});
