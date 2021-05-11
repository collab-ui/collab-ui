import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Button, ButtonGroup, Icon } from '@momentum-ui/react';

describe('tests for <ButtonGroup />', () => {
  it('should match SnapShot', () => {
    const container = shallow(
      <ButtonGroup>
        <Button ariaLabel="test">1</Button>
      </ButtonGroup>);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('ButtonGroup should have justified as true', () => {
    const container = mount(
      <ButtonGroup>
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);

    expect(container.find('.md-button-group').hasClass('md-button-group--justified')).toEqual(true);
  });

  it('ButtonGroup theme is set to dark', () => {
    const container = mount(
      <ButtonGroup theme="dark">
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);

    expect(container.find('.md-button-group').hasClass('md-button-group--dark')).toEqual(true);
  });

  it('ButtonGroup type is set to pill', () => {
    const container = mount(
      <ButtonGroup type="pill">
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);

    expect(container.find('.md-button-group').hasClass('md-button-group--pill')).toEqual(true);
  });

  it('should not highlight the active button when highlightSelected is false', () => {
    const container = mount(
      <ButtonGroup highlightSelected={false}>
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);

    container.find('button').at(0).simulate('click');
    expect(container.find('button').at(0).hasClass('active')).toEqual(false);
  });

  it('should apply an modifier to button when Button contains Icon as a children', () => {
    const container = mount(
      <ButtonGroup theme="dark">
        <Button ariaLabel="test">
          <Icon name="icon-arrow-left_12"/>
        </Button>
      </ButtonGroup>);

    expect(container.find('button').at(0).hasClass('md-button--icon-group')).toEqual(true);
  });


  it('onClick should should mark the button as active', () => {
    const container = mount(
      <ButtonGroup>
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);
    container.find('button').at(1).simulate('click');
    expect(container.find('button').at(1).props().tabIndex).toEqual(0);
    expect(container.find('button').at(1).hasClass('active')).toEqual(true);
  });

  it('if focusOnLoad is set to true, then should set the focus on the first button', () => {
    mount(
      <ButtonGroup focusOnLoad>
        <Button ariaLabel="test" id="one">1</Button>
        <Button ariaLabel="test" id="two">2</Button>
      </ButtonGroup>
    , { attachTo: document.body });

    expect(document.activeElement.id).toEqual('one');
  });

  it('when active prop is passed, the button should be selected', () => {
    const container = mount(
      <ButtonGroup active={'two'}>
        <Button ariaLabel="test" id="one">1</Button>
        <Button ariaLabel="test" id="two">2</Button>
      </ButtonGroup>
    );
    expect(container.find('button').at(1).hasClass('active')).toEqual(true);
  });

  it('should handle keyBoard keys', () => {
    const container = mount(
      <ButtonGroup>
        <Button ariaLabel="test">one</Button>
        <Button ariaLabel="test">two</Button>
      </ButtonGroup>);
    expect(container.find('button').at(0).props().tabIndex).toEqual(0);
    // right
    container.find('button').at(0).simulate('keydown', { keyCode: 39, which: 39 });
    expect(container.find('button').at(1).props().tabIndex).toEqual(0);
    // left
    container.find('button').at(1).simulate('keydown', { keyCode: 37, which: 37 });
    expect(container.find('button').at(0).props().tabIndex).toEqual(0);
    // up key
    container.find('button').at(0).simulate('keydown', { keyCode: 38, which: 38 });
    expect(container.find('button').at(1).props().tabIndex).toEqual(0);

    // enter key
    container.find('button').at(1).simulate('keydown', { keyCode: 13, which: 13 });
    expect(container.find('button').at(1).hasClass('active')).toEqual(true);

    // enter char
    expect(container.find('button').at(1).props().tabIndex).toEqual(0);
    container.find('button').at(1).simulate('keydown', { keyCode: 79, which: 79, key: 'o' });
    expect(container.find('button').at(0).props().tabIndex).toEqual(0);
  });

  it('should not throw error if child is not a Button', () => {
    const container = shallow(
      <ButtonGroup>
        <div/>
      </ButtonGroup>
    );

    expect(container.find('.md-button-group').exists()).toEqual(true);
  });

});
