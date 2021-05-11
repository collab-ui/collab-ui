import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Coachmark } from '@momentum-ui/react';

describe('tests for <Coachmark />', () => {
  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match SnapShot', () => {
    const content = <span key="1">Hello how are you doing</span>;
    const container = shallow(
      <Coachmark contentNode={content}>
        <button>Hello</button>
      </Coachmark>
    );

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should not render one Coachmark without isOpen', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark contentNode={content}>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(0);
  });

  it('should render one Coachmark with isOpen', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark contentNode={content} isOpen>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(1);
  });

  it('should handle contentNode prop', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark contentNode={content} isOpen>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(1);
  });

  it('should handle header prop', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark header={content} isOpen>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.md-coachmark__header').length).toEqual(1);
  });

  it('should handle subheader prop', () => {
    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );
    const container = mount(
      <Coachmark subheader={content} isOpen>
        <button className="anchor">Hello</button>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.md-coachmark__subheader').length).toEqual(1);
  });

  it('should handle onClick prop', () => {
    const onClick = jest.fn();

    const content = (
      <span className="coachmark-content" key="1">
        Hello how are you doing
      </span>
    );

    const container = mount(
      <Coachmark onClick={onClick} buttonProps={{ children: content, ariaLabel: 'test' }} isOpen>
        <div className="anchor">Hello</div>
      </Coachmark>
    );

    jest.runAllTimers();
    container.update();
    expect(container.find('.md-button').length).toEqual(1);
    container.find('button').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(onClick).toHaveBeenCalled();
  });

  it('should show and hide with delay and allowClickAway', () => {

    class Container extends React.Component {
      state = {
        coachmarkOpen: false
      }
      render() {

        const content = (
          <span className="coachmark-content" key="1">
          Hello how are you doing
          </span>
        );

        return (
          <Coachmark
            allowClickAway
            contentNode={content}
            showDelay={200}
            hideDelay={100}
            isOpen={this.state.coachmarkOpen}
          >
            <button tabIndex="0" className="anchor">
              Hello
            </button>
          </Coachmark>
        );
      }
    }
    const container = mount(<Container/>);
    expect(container.find('.coachmark-content').length).toEqual(0);

    container.setState({ coachmarkOpen: true });

    jest.runTimersToTime(300);
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(1);

    // Dispatch click outside Event
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    document.dispatchEvent(evt);

    jest.runTimersToTime(200);
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(0);
  });

  it('on click outside, should not close the overlay', () => {
    /* eslint-disable react/no-multi-comp */
    class ContainerDefault extends React.Component {
      state = {
        coachmarkOpen: false
      }
      render() {

        const content = (
          <span className="coachmark-content" key="1">
            Hello how are you doing
          </span>
        );

        return (
          <div className='wrapper'>
            <Coachmark
              contentNode={content}
              isOpen={this.state.coachmarkOpen}
            >
              <button tabIndex="0" className="anchor">
                Hello
              </button>
            </Coachmark>
          </div>
        );
      }
    }
    /* eslint-enable react/no-multi-comp */
    const container = mount(<ContainerDefault/>);
    container.setState({ coachmarkOpen: true });

    jest.runAllTimers();
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(1);

     // Dispatch click outside Event
     const evt = document.createEvent("HTMLEvents");
     evt.initEvent("click", false, true);
     document.dispatchEvent(evt);

    jest.runAllTimers();
    container.update();
    expect(container.find('.coachmark-content').length).toEqual(1);
  });
});
