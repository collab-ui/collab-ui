import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { AccordionHeader } from '@momentum-ui/react';

describe('tests for <AccordionHeader />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<AccordionHeader />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = shallow(
      <AccordionHeader>
        <div className="testingforTC" />
      </AccordionHeader>
    );
    expect(container.find('.testingforTC').length).toEqual(1);
  });

  it('should pass ClassName Prop', () => {
    const container = shallow(<AccordionHeader className="testClass"/>);

    expect(container.find('.testClass').exists()).toEqual(true);
    expect(container.find('.md-accordion__header').props().tabIndex).toEqual(0);
  });

  it('when the header is disabled, should set tabIndex to -1', () => {
    const container = shallow(<AccordionHeader disabled />);
    expect(container.find('.md-accordion__header').props().tabIndex).toEqual(-1);
  });

  it('when the showSeparator prop is true, should display the separator', () => {
    const container = shallow(<AccordionHeader disabled showSeparator/>);
    expect(container.find('.md-accordion__header').hasClass('md-accordion__header--separator')).toEqual(true);
  });

  it('when height prop is set, should apply height style to header', () => {
    const container = shallow(<AccordionHeader disabled showSeparator height={56}/>);
    expect(container.find('.md-accordion__header').hasClass('md-accordion__header--56')).toEqual(true);
  });

  it('should call the context handler function on click and keyDown event', () => {
    const onClickFn = jest.fn();
    const onKeyDownFn = jest.fn();
    const container = mount(<AccordionHeader/>, {
      context: {
        onClick: onClickFn,
        onKeyDown: onKeyDownFn,
      }
    });
    container.simulate('click');
    expect(onClickFn).toHaveBeenCalled();
    container.simulate('keyDown');
    expect(onKeyDownFn).toHaveBeenCalled();
  });

});
