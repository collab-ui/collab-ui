import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import {
  Accordion,
  AccordionHeader,
  AccordionGroup,
  AccordionContent,
 } from '@momentum-ui/react';

describe('tests for <Accordion />', () => {
  it('should match SnapShot', () => {
    const container = shallow(
      <Accordion>
        <AccordionGroup>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>
      </Accordion>
    );
    expect(toJson(container)).toMatchSnapshot();
  });

  it('with multipleVisible as true, multiple AccordionGroups can be open', () => {
    const onSelect = jest.fn();
    const container = mount(
      <Accordion
        className="testClass"
        multipleVisible
        onSelect={onSelect}
      >
        <AccordionGroup>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>

        <AccordionGroup>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>

        <AccordionGroup disabled>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>
      </Accordion>
    );

    const firstGroup = container.find('.md-accordion__header').at(0);
    firstGroup.simulate('click');
    expect(container.find('.md-accordion__group').at(0).hasClass('md-accordion__group--active')).toEqual(true);
    expect(onSelect).toHaveBeenCalledWith([0]);
    expect(container.find('AccordionHeader').at(0).props().focus).toEqual(true);

    const secondGroup = container.find('.md-accordion__header').at(1);
    secondGroup.simulate('click');
    expect(container.find('.md-accordion__group').at(1).hasClass('md-accordion__group--active')).toEqual(true);
    expect(onSelect).toHaveBeenCalledWith([0, 1]);

    const thirdGroup = container.find('.md-accordion__header').at(2);
    thirdGroup.simulate('click');
    expect(container.find('.md-accordion__group').at(1).hasClass('md-accordion__group--active')).toEqual(true);
  });

  it('with multipleVisible prop as false, only one AccordionGroup can be open', () => {
    const onSelect = jest.fn();
    const container = mount(
      <Accordion multipleVisible={false} onSelect={onSelect} initialActive={[0]}>
        <AccordionGroup>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>

        <AccordionGroup>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>
      </Accordion>
    );
    expect(container.find('.md-accordion__group').at(0).hasClass('md-accordion__group--active')).toEqual(true);

    const secondGroup = container.find('.md-accordion__header').at(1);
    secondGroup.simulate('click');
    expect(container.find('.md-accordion__group').at(1).hasClass('md-accordion__group--active')).toEqual(true);
    expect(onSelect).toHaveBeenCalledWith(1, 0);
    expect(container.find('.md-accordion__group').at(0).hasClass('md-accordion__group--active')).toEqual(false);
  });

  it('should clone children with props', () => {
    const container = shallow(
      <Accordion initialActive={[0]} showSeparator={false}>
        <AccordionGroup />
      </Accordion>
    );

    expect(container.children().props().isExpanded).toEqual(true);
    expect(container.children().props().showSeparator).toEqual(false);
  });

  it('should add custom class', () => {
    const container = shallow(
      <Accordion className='testClass'>
        <AccordionGroup />
      </Accordion>
    );
    expect(container.find('.testClass').exists()).toEqual(true);
  });

  it('should throw error if child is not an AccordionGroup', () => {
    try {
      shallow(
        <Accordion className="testClass" disabled focus>
          <div/>
        </Accordion>
      );
    } catch(e) {
      expect(e.message).toEqual('Accordion should contain one or more AccordionGroup as children.');
    }
  });

  it('should handle keyboard keys', () => {
    const onSelect = jest.fn();
    const container = mount(
      <Accordion
        className="testClass"
        multipleVisible
        onSelect={onSelect}
        >
        <AccordionGroup disabled>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>

        <AccordionGroup>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>

        <AccordionGroup>
          <AccordionHeader>
            <span>Hi</span>
          </AccordionHeader>
          <AccordionContent>
            <span>Hello</span>
          </AccordionContent>
        </AccordionGroup>
      </Accordion>
    );

    // second element is in focus, since first element is disabled
    expect(container.find('AccordionHeader').at(1).props().focus).toEqual(true);
    const secondHeader = container.find('.md-accordion__header').at(1);
    const thirdHeader = container.find('.md-accordion__header').at(2);

    // press down and third element is in focus
    secondHeader.simulate('keyDown', { which: 39, charCode: 39, key: 'Down' });
    expect(container.find('AccordionHeader').at(2).props().focus).toEqual(true);

    // press down and second element is in focus
    thirdHeader.simulate('keyDown', { which: 39, charCode: 39, key: 'Down' });
    expect(container.find('AccordionHeader').at(1).props().focus).toEqual(true);


    // press up and third element is in focus
    secondHeader.simulate('keyDown', { which: 38, charCode: 38, key: 'Up' });
    expect(container.find('AccordionHeader').at(2).props().focus).toEqual(true);

  });

});
