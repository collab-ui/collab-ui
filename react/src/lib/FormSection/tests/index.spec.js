import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { FormSection } from '@momentum-ui/react';

describe('tests for <FormSection />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<FormSection id="test" title="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render only FormSection', () => {
    const container = mount(<FormSection title="test" />);

    expect(container.find('.md-form__section').length).toEqual(1);
    expect(container.find('.section__title').exists()).toEqual(true);
    expect(container.find('.section__description').exists()).toEqual(false);
  });

  it('should render description', () => {
    const container = mount(<FormSection description="test" title="test" />);

    expect(container.find('.section__description').text()).toEqual('test');
  });

  it('should render children under Form Content wrapper', () => {
    const container = mount(
      <FormSection title="test">
        <div className="testingChildren" />
        <div className="testingChildren" />
      </FormSection>
    );

    expect(container.find('.testingChildren').length).toEqual(2);
    expect(container.find('.section__content').children().length).toEqual(2);
  });
});
