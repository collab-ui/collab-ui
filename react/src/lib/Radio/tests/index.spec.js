import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import Radio from '../index';
import Label from '@momentum-ui/react/Label';
import InputHelper from '@momentum-ui/react/InputHelper';

describe('tests for <Radio />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Radio htmlId="test123" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Radio', () => {
    const container = shallow(<Radio htmlId="test123" />);

    expect(container.find('input').length).toEqual(1);
    expect(container.children().length).toEqual(2);
  });

  it('should handle tabIndex', () => {
    const container = shallow(<Radio htmlId="test123" tabIndex={-1} />);

    container.update();
    expect(container.find('input').props().tabIndex).toEqual(-1);
  });

  it('should render Label', () => {
    const container = shallow(<Radio htmlId="test123" label="test" />);

    expect(
      container.contains(
        <Label className="md-radio__label" htmlFor="test123" label="test" />
      )
    ).toEqual(true);
  });

  it('should pass class based on nesting', () => {
    const container = shallow(<Radio htmlId="test123" nestedLevel={1} />);

    expect(container.hasClass('md-input--nested-1')).toEqual(true);
  });

  it('should handle disabled state', () => {
    const container = shallow(<Radio htmlId="test123" disabled />);

    expect(container.find('input').props().disabled).toEqual(true);
  });

  it('should render children', () => {
    const container = shallow(
      <Radio htmlId="test123">
        <InputHelper message={"I'm here to help"} />
      </Radio>
    );

    expect(container.children().length).toEqual(3);
  });

  it('should handle onChange event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = shallow(<Radio htmlId="test" onChange={countUp} />);

    container.find('input').simulate('change');
    expect(count).toEqual(1);
  });

  it('should support input ref', () => {
    class Container extends React.Component {
      render() {
        return <Radio htmlId="test123" inputRef={ref => (this.input = ref)} />;
      }
    }
    const instance = mount(<Container />).instance();

    expect(instance.input.tagName).toEqual('INPUT');
  });
});
