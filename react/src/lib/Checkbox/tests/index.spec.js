import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  Checkbox,
  Label,
  InputHelper,
} from '@momentum-ui/react';

describe('tests for <Checkbox />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Checkbox htmlId="test123" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Checkbox', () => {
    const container = shallow(<Checkbox htmlId="test123" />);

    expect(container.find('input').length).toEqual(1);
    expect(container.children().length).toEqual(2);
  });

  it('should render Label', () => {
    const container = shallow(<Checkbox htmlId="test123" label="test" />);

    expect(
      container.contains(
        <Label className="md-checkbox__label" htmlFor="test123" label="test" />
      )
    ).toEqual(true);
  });

  it('should pass class based on indeterminate prop', () => {
    const container = shallow(<Checkbox htmlId="test123" indeterminate />);

    expect(container.find('input').hasClass('indeterminate')).toEqual(true);
  });

  it('should pass class based on nesting', () => {
    const container = shallow(<Checkbox htmlId="test123" nestedLevel={1} />);

    expect(container.hasClass('md-input--nested-1')).toEqual(true);
  });

  it('should handle disabled state', () => {
    const container = shallow(<Checkbox htmlId="test123" disabled />);

    expect(container.find('input').props().disabled).toEqual(true);
  });

  it('should render children', () => {
    const container = shallow(
      <Checkbox htmlId="test123">
        <InputHelper message={"I'm here to help"} />
      </Checkbox>
    );

    expect(container.children().length).toEqual(3);
  });

  it('should handle other DOM events if passed', () => {
    let count = 0;
    const countUp = () => count++;
    const container = shallow(<Checkbox htmlId="test" onFocus={countUp} />);

    container.find('input').simulate('focus');
    expect(count).toEqual(1);
  });

  it('should handle onChange event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = shallow(<Checkbox htmlId="test" onChange={countUp} />);

    container.find('input').simulate('change');
    expect(count).toEqual(1);
  });

  it('should support input ref', () => {
    class Container extends React.Component {
      render() {
        return (
          <Checkbox htmlId="test123" inputRef={ref => (this.input = ref)} />
        );
      }
    }
    const instance = mount(<Container />).instance();

    expect(instance.input.tagName).toEqual('INPUT');
  });
});
