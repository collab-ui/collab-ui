import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { InputSearch } from '@momentum-ui/react';

describe('tests for <InputSearch />', () => {
  it('should match normal SnapShot', () => {
    const container = shallow(
      <InputSearch id="1" name="test" />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should match pill SnapShot', () => {
    const container = shallow(
      <InputSearch id="1" name="test" shape='pill' />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should match loading SnapShot', () => {
    const container = shallow(
      <InputSearch id="1" name="test" isLoading />
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should pass isLoading prop', () => {
    const container = mount(
      <InputSearch id="1" name="test" isLoading />
    );

    expect(container.find('.md-spinner').exists()).toEqual(true);
  });

  it('should render Icon component', () => {
    const container = mount(
      <InputSearch id="1" name="test" shape='pill' />
    );
    expect(container.find('.md-icon').length).toEqual(1);
  });

  it('should render one Input', () => {
    const container = mount(<InputSearch id="1" name="test" />);

    expect(container.find('input').length).toEqual(1);
    expect(container.children().length).toEqual(1);
  });

  it('should pass disabled attribute', () => {
    const container = mount(
      <InputSearch id="test123" name="test" disabled />
    );

    expect(container.find('input').props().disabled).toEqual(true);
  });

  it('should pass readOnly attribute', () => {
    const container = mount(
      <InputSearch id="test123" name="test" readOnly />
    );

    expect(container.find('input').props().readOnly).toEqual(true);
  });

  it('should pass value attribute', () => {
    const handleChange = jest.fn();
    const container = mount(
      <InputSearch id="test123" name="test" value="testing" onChange={handleChange}/>
    );

    expect(container.find('input').props().value).toEqual('testing');
  });

});
