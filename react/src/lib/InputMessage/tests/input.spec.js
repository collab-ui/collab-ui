import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { InputMessage } from '@momentum-ui/react';

describe('tests for <InputMessage />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(<InputMessage message={'test'} />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should match render message with rendered text', () => {
    const container = mount(<InputMessage message={'test'} />);

    expect(container.find('.md-input__message').text()).toEqual('test');
  });
});
