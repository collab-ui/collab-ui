import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  Icon,
  Input,
  InputMessage,
  InputHelper,
  Label
} from '@momentum-ui/react';

describe('tests for <Input />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" type="text" />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should change tag based on multiline prop', () => {
    const container = shallow(
      <Input htmlId='1' name='test' label='test' multiline/>
    );

    expect(container.find('textarea').length).toEqual(1);
  });

  it('should match number SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" type="number" />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should match password SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" type="password" />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should match aria SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" ariaDescribedBy="ariaDescribedBy" ariaLabel="ariaLabel" />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should match clear SnapShot', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" type="text" clear />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Input', () => {
    const container = shallow(<Input htmlId="1" name="test" label="test" />);

    expect(container.find('input').length).toEqual(1);
  });

  it('should render one Input and apply dirty class', () => {
    const container = shallow(
      <Input htmlId="1" name="test" label="test" value="test" />
    );

    expect(container.find('.md-dirty').length).toEqual(1);
  });

  it('should render Label', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" />
    );

    expect(
      container.find('.md-input__label').exists()
    ).toEqual(true);
  });

  it('should pass class based on containerSize prop', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" containerSize="medium-12" />
    );

    expect(container.find('.md-input-container').hasClass('medium-12')).toEqual(true);
    expect(container.find('.md-input-container').hasClass('columns')).toEqual(true);
  });

  it('should pass class based on inputSize prop', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" inputSize="medium-12" />
    );

    expect(container.find('.md-input__wrapper').hasClass('medium-12')).toEqual(true);
    expect(container.find('.md-input__wrapper').hasClass('columns')).toEqual(true);
  });

  it('should pass placeholder attribute', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" placeholder="test" />
    );

    expect(container.find('input').props().placeholder).toEqual('test');
  });

  it('should pass className prop', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" className="test" />
    );

    expect(container.find('.md-input-container').hasClass('test')).toEqual(true);
  });

  it('should pass inputClassName prop', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" inputClassName="test" />
    );

    expect(container.find('input').hasClass('test')).toEqual(true);
  });

  it('should pass isFilled prop', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" isFilled />
    );

    expect(container.find('.md-input-container').hasClass('md-input--filled')).toEqual(true);
  });

  it('should pass shape prop', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" shape='pill' />
    );

    expect(container.find('input').hasClass('md-input--pill')).toEqual(true);
  });

  it('should pass disabled attribute', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" disabled />
    );

    expect(container.find('input').props().disabled).toEqual(true);
  });

  it('should pass readOnly attribute', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" readOnly />
    );

    expect(container.find('input').props().readOnly).toEqual(true);
  });

  it('should pass value attribute', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" value="testing" />
    );

    expect(container.find('input').props().value).toEqual('testing');
  });

  it('should update value attribute', () => {
    const container = mount(
      <Input htmlId="test123" name="test" label="test" value="" />
    );

    container.setProps({ value: 'testing' });
    container.update();
    expect(container.find('input').props().value).toEqual('testing');
  });

  it('should pass class based on nesting', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" nestedLevel={1} />
    );

    expect(container.hasClass('md-input--nested-1')).toEqual(true);
  });

  it('should render Secondary Container and Label', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" secondaryLabel="test" />
    );

    expect(
      container.contains(
        <Label
          className="md-input__secondary-label"
          htmlFor="test123"
          label="test"
        />
      )
    ).toEqual(true);
  });

  it('should render Helper Text', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test" helpText="test" />
    );

    expect(container.contains(<InputHelper message="test" />)).toEqual(true);
  });

  it('should not render messages if incorrectly passed in', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        messageArr={[{ m: 'test', t: 'success' }]}
      />
    );

    expect(container.find('.md-input-container').hasClass('md-success')).toEqual(
      false
    );
  });

  it('should determine correct message class(success)', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        messageArr={[{ message: 'test', type: 'success' }]}
      />
    );

    expect(container.find('.md-input-container').hasClass('md-success')).toEqual(
      true
    );
  });

  it('should determine correct error class(warning)', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        messageArr={[{ message: 'test', type: 'warning' }]}
      />
    );

    expect(container.find('.md-input-container').hasClass('md-warning')).toEqual(
      true
    );
  });

  it('should determine correct error class(error)', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        messageArr={[{ message: 'test', type: 'error' }]}
      />
    );

    expect(container.find('.md-input-container').hasClass('md-error')).toEqual(true);
  });

  it('should determine correct error class if passed error and warning(error)', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        messageArr={[
          { message: 'error1', type: 'error' },
          { message: 'error2', type: 'warning' },
        ]}
      />
    );

    expect(container.find('.md-input-container').hasClass('md-error')).toEqual(true);
  });

  it('should render Error Component', () => {
    const container = shallow(
      <Input
        htmlId="test123"
        name="test"
        label="test"
        messageArr={[{ message: 'test', type: 'error' }]}
      />
    );

    expect(container.contains(<InputMessage message={'test'} />)).toEqual(true);
  });

  it('should support input ref', () => {
    class Container extends React.Component {
      render() {
        return (
          <Input
            htmlId="test123"
            name="test"
            label="test"
            inputRef={ref => (this.input = ref)}
          />
        );
      }
    }
    const instance = mount(<Container />).instance();

    expect(instance.input.tagName).toEqual('INPUT');
  });

  it('should render children', () => {
    const container = shallow(
      <Input htmlId="test123" name="test" label="test">
        <div className="testingforhoc" />
      </Input>
    );

    expect(container.find('.testingforhoc').length).toEqual(1);
  });

  it('should handle onChange event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <Input htmlId="test" name="test" label="test" onChange={countUp} />
    );

    container.find('input').simulate('change', { target: { value: 'test' } });
    expect(count).toEqual(1);
  });

  it('should handle onDoneEditing event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <Input htmlId="test" name="test" label="test" onDoneEditing={countUp} />
    );

    container.find('input').simulate('change', { target: { value: 'test' } });
    container.find('input').simulate('blur', { type: 'blur' });
    expect(count).toEqual(1);
  });

  it('should handle onDoneEditing event with esc key', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <Input htmlId="test" name="test" label="test" onDoneEditing={countUp} />
    );

    container.find('input').simulate('change', { target: { value: 'test' } });
    container.find('input').simulate('blur', { which: 27, charCode: 27, key: 'Escape' });
    expect(count).toEqual(1);
  });

  it('should handle onDoneEditing event with enter key', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <Input htmlId="test" name="test" label="test" onDoneEditing={countUp} />
    );

    container.find('input').simulate('change', { target: { value: 'test' } });
    container.find('input').simulate('blur', { which: 13, charCode: 13, key: 'Enter' });
    expect(count).toEqual(1);
  });

  it('should not handle onDoneEditing event with k key', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(
      <Input htmlId="test" name="test" label="test" onDoneEditing={countUp} />
    );

    container.find('input').simulate('change', { target: { value: 'test' } });
    container.find('input').simulate('blur', { which: 75, charCode: 75, key: 'k', type: 'test-fail' });
    expect(count).toEqual(0);
  });

  it('should handle mouse down event', () => {
    let count = 0;
    const container = mount(
      <Input
        htmlId="test"
        name="test"
        label="test"
        onMouseDown={() => count++}
      />
    );

    container.find('input').simulate('mousedown');
    expect(count).toEqual(1);
  });

  it('should handle null mouse down event', () => {
    const container = mount(
      <Input
        htmlId="test"
        name="test"
        label="test"
        onMouseDown={null}
      />
    );

    container.find('input').simulate('mousedown');
    expect(container.state().isEditing).toEqual(true);
  });

  it('should not handle mouse down event when disabled', () => {
    const e = { stopPropagation: jest.fn() };
    let count = 0;
    const container = shallow(
      <Input
        htmlId="test"
        name="test"
        label="test"
        onMouseDown={() => count++}
        disabled
      />
    );

    container.find('input').simulate('mousedown', e);
    expect(count).toEqual(0);
    expect(e.stopPropagation).toHaveBeenCalled();
  });

  it('should handle onFocus event', () => {
    let count = 0;
    const container = mount(
      <Input htmlId="test" name="test" label="test" onFocus={() => count++} />
    );

    container.find('input').simulate('focus');
    expect(count).toEqual(1);
  });

  it('should handle null onFocus event', () => {
    const container = mount(
      <Input
        htmlId="test"
        name="test"
        label="test"
        onFocus={null}
      />
    );

    container.find('input').simulate('focus');
    expect(container.state().isEditing).toEqual(true);
  });

  it('should not handle onFocus event when disabled', () => {
    const e = { stopPropagation: jest.fn() };
    let count = 0;
    const container = shallow(
      <Input
        htmlId="test"
        name="test"
        label="test"
        onFocus={() => count++}
        disabled
      />
    );

    container.find('input').simulate('focus', e);
    expect(count).toEqual(0);
    expect(e.stopPropagation).toHaveBeenCalled();
  });

  it('should handle onKeyDown event', () => {
    const onKeyDown = jest.fn();
    const container = shallow(
        <Input htmlId="test" name="test" label="test" onKeyDown={onKeyDown} />
    );

    container.find('input').simulate('keyDown', { which: 39, charCode: 39, key: 'Down' });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should not render clear icon', () => {
    const container = mount(<Input htmlId="test" name="test" label="test" />);

    container.find('input').simulate('change', { target: { value: 'test' } });
    expect(container.find('.md-button--icon').exists()).toBeFalsy();
  });

  it('should render clear icon if prop is present', () => {
    const container = mount(
      <Input htmlId="test" name="test" label="test" clear />
    );

    container.find('input').simulate('change', { target: { value: 'test' } });
    expect(container.find('.md-button--icon').exists()).toEqual(true);
  });

  it('should clear value if clear icon is clicked', () => {
    const container = mount(
      <Input htmlId="test" name="test" label="test" value="test" clear />
    );

    expect(container.find('input').props().value).toEqual('test');

    container.find('button.md-button--icon').simulate('click');
    expect(container.find('input').props().value).toEqual('');
    expect(container.find('.md-button--icon').exists()).toBeFalsy();
  });

  it('should clear value if Enter is pressed on the keyboard', () => {
    const container = mount(
      <Input htmlId="test" name="test" label="test" value="test" clear />
    );

    expect(container.find('input').props().value).toEqual('test');
    container.find('button.md-button--icon').simulate('keydown', { key: 'Enter', keyCode: 13, which: 13 });
    expect(container.find('input').props().value).toEqual('');
    expect(container.find('.md-button--icon').exists()).toBeFalsy();
  });


  it('should clear value if Space is pressed on the keyboard', () => {
    const container = mount(
      <Input htmlId="test" name="test" label="test" value="test" clear />
    );

    expect(container.find('input').props().value).toEqual('test');
    container.find('button.md-button--icon').simulate('keydown', { key: 'Space', keyCode: 32, which: 32 });
    expect(container.find('input').props().value).toEqual('');
    expect(container.find('.md-button--icon').exists()).toBeFalsy();
  });

  it('should focus on input when clear is triggered with htmlId', () => {
    const container = mount(
      <Input htmlId="test" label="test" value="test" clear />
    );

    container.find('button.md-button--icon').simulate('click');
    expect(container.find('input') === document.activeElement);
  });

  it('should focus on input when clear is triggered with id', () => {
    const container = mount(
      <Input id="test" label="test" value="test" clear />
    );

    container.find('button.md-button--icon').simulate('click');
    expect(container.find('input') === document.activeElement);
  });

  it('should not render custom icon', () => {
    const container = mount(<Input htmlId="test" name="test" label="test" />);
    expect(container.find('.md-input__icon').exists()).toBeFalsy();
  });

  it('should render custom icon if inputBefore is present', () => {
    const inputBefore = (
      <Icon
        name="icon-info_16"
        ariaLabel={'custom icon'}
      />
    );

    const container = mount(
      <Input id="test" label="test" value="test" inputBefore={inputBefore} />
    );

    expect(container.find('.md-icon').exists()).toEqual(true);
  });

  it('should render custom icon if inputAfter is present', () => {
    const inputAfter = (
      <Icon
        name="icon-info_16"
        ariaLabel={'custom icon'}
      />
    );

    const container = mount(
      <Input id="test" label="test" value="test" inputAfter={inputAfter} />
    );

    expect(container.find('.md-icon').exists()).toEqual(true);
  });
});
