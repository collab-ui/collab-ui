import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { InputHelper } from '@momentum-ui/react';

describe('tests for <InputHelper />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(<InputHelper message='test' />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render className if prop is passed', () => {
    const container = shallow(<InputHelper className='class-test' message='test' />);

    expect(container.find('.class-test').exists()).toEqual(true);
  });

  it('should render input help with correct class', () => {
    const container = shallow(<InputHelper message='test' />);

    expect(container.find('div').hasClass('md-input__help-text')).toEqual(true);
  });

  it('should render message', () => {
    const container = shallow(<InputHelper message='test' />);

    expect(container.find('div').text()).toEqual('test');
  });

  it('should pass otherProps to container', () => {
    const container = shallow(<InputHelper message='test' id='testid' />);

    expect(container.find('#testid').exists()).toEqual(true);
  });
});
