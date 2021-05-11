import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Checkbox, CheckboxGroup } from '@momentum-ui/react';

describe('tests for <CheckboxGroup />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CheckboxGroup />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one CheckboxGroup', () => {
    const container = shallow(<CheckboxGroup />);

    expect(container.find('div').length).toEqual(1);
  });

  it('should handle default true Values', () => {
    const container = mount(
      <CheckboxGroup values={['me']}>
        <Checkbox
          value="me"
          label="me"
          htmlId="testCheckbox1"
          onChange={() => {}}
        />
        <Checkbox
          value="you"
          label="you"
          htmlId="testCheckbox2"
          onChange={() => {}}
        />
        <Checkbox
          value="us"
          label="us"
          htmlId="testCheckbox3"
          onChange={() => {}}
        />
      </CheckboxGroup>
    );

    expect(container.find('#testCheckbox1').props().checked).toEqual(true);
    expect(container.find('#testCheckbox2').props().checked).toEqual(false);
  });

  it('should handle Change Events', () => {
    class Container extends React.Component {
      render() {
        return (
          <CheckboxGroup>
            <Checkbox value="me" label="me" htmlId="testCheckbox1" />
            <Checkbox value="you" label="you" htmlId="testCheckbox2" />
            <Checkbox value="us" label="us" htmlId="testCheckbox3" />
          </CheckboxGroup>
        );
      }
    }
    const instance = mount(<Container />);
    instance
      .find('#testCheckbox1')
      .simulate('change', { target: { value: 'me' } });

    expect(instance.find('#testCheckbox1').props().checked).toEqual(true);
    expect(instance.find('#testCheckbox2').props().checked).toEqual(false);
  });
});
