import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  RadioGroup,
  Radio,
} from '@momentum-ui/react';

describe('tests for <RadioGroup />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<RadioGroup />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one RadioGroup', () => {
    const container = shallow(<RadioGroup />);

    expect(container.find('div').length).toEqual(1);
  });

  it('should handle default true Values', () => {
    const container = mount(
      <RadioGroup values={['me']}>
        <Radio value="me" label="me" htmlId="testRadio1" onChange={() => {}} />
        <Radio
          value="you"
          label="you"
          htmlId="testRadio2"
          onChange={() => {}}
        />
        <Radio value="us" label="us" htmlId="testRadio3" onChange={() => {}} />
      </RadioGroup>
    );

    expect(container.find('#testRadio1').props().checked).toEqual(true);
    expect(container.find('#testRadio2').props().checked).toEqual(false);
  });

  it('should handle Change Events', () => {
    class Container extends React.Component {
      render() {
        return (
          <RadioGroup>
            <Radio value="me" label="me" htmlId="testRadio1" />
            <Radio value="you" label="you" htmlId="testRadio2" />
            <Radio value="us" label="us" htmlId="testRadio3" />
          </RadioGroup>
        );
      }
    }
    const instance = mount(<Container />);
    instance
      .find('#testRadio1')
      .simulate('change', { target: { value: 'me' } });

    expect(instance.find('#testRadio1').props().checked).toEqual(true);
    expect(instance.find('#testRadio2').props().checked).toEqual(false);
  });
});
