import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { CloseWrapper } from '@momentum-ui/react';

describe('tests for <CloseWrapper />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CloseWrapper />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should call onClick callback when the button is clicked', () => {
    const onClick = jest.fn();
    const container = mount(<CloseWrapper onClick={onClick} />);
    container.find('.md-button').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('should pass ariaLabel to Button', () => {
    const onClick = jest.fn();
    const container = mount(
      <CloseWrapper onClick={onClick} ariaLabel="NewClose" />
    );

    expect(container.find('Button').props().ariaLabel).toEqual('NewClose');
  });

  it('should render one Child Div', () => {
    const container = shallow(
      <CloseWrapper>
        <div>Test</div>
      </CloseWrapper>
    );

    expect(container.find('.md-close-wrapper').children().length).toEqual(2);
  });

  it('should pass props to children', () => {
    const container = shallow(
      <CloseWrapper title="test">
        <div className="md-test">Test</div>
      </CloseWrapper>
    );

    expect(container.find('.md-test').prop('title')).toEqual('test');
  });

  it('should pass the classNames onto the wrapper', () => {
    const container = mount(
      <CloseWrapper className="class-test" />
    );

    expect(container.find('.md-close-wrapper').hasClass('class-test')).toEqual(true);
  });

  it('should render actionNode in place of close', () => {
    const container = shallow(
      <CloseWrapper actionNode={<div className="md-action-node">Test</div>} />
    );

    expect(container.find('.md-close-wrapper').children().length).toEqual(1);
    expect(container.find('.md-action-node').length).toEqual(1);
    expect(container.find('.md-close-wrapper__action').length).toEqual(0);
  });
});
