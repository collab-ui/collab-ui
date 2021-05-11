import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { ListItemMeeting } from '@momentum-ui/react';

describe('tests for <ListItemMeeting />', () => {

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  const props = {
    header: 'testHeader'
  };
  const parentClick = jest.fn();
  const anchorClick = jest.fn();

  it('should match SnapShot', () => {
    const container = shallow(<ListItemMeeting {...props} />);

    expect(toJson(container)).toMatchSnapshot();
  });

  describe('tests for anchor section', () => {

    it('should not render anchor without label and click', () => {
      const container = mount(
        <ListItemMeeting {...props} anchorLabel='testLabel' />
      );

      expect(container.find('Link').length).toEqual(0);
    });

    it('should not render anchor without label and click', () => {
      const container = mount(
        <ListItemMeeting {...props} anchorOnClick={anchorClick} />
      );

      expect(container.find('Link').length).toEqual(0);
    });

    it('should render anchor with label and click', () => {

      const container = mount(
        <ListItemMeeting {...props} anchorOnClick={anchorClick} anchorLabel='testLabel'/>
      );

      expect(container.find('Link').length).toEqual(1);
      expect(container.find('Link').props().title).toEqual('testLabel');
    });

    it('should fire anchor with click', () => {
      const container = mount(
        <ListItemMeeting {...props} anchorOnClick={anchorClick} anchorLabel='testLabel'/>
      );

      container.find('Link').simulate('click');
      expect(anchorClick).toHaveBeenCalled();
    });

    it('should fire anchor with keyDown', () => {
      const container = mount(
        <ListItemMeeting {...props} anchorOnClick={anchorClick} anchorLabel='testLabel'/>
      );

      container.find('Link').simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
      expect(anchorClick).toHaveBeenCalled();
    });

    it('should not fire parent click when anchor clicked', () => {
      const container = mount(
        <ListItemMeeting {...props} anchorOnClick={anchorClick} anchorLabel='testLabel' onClick={parentClick} />
      );

      container.find('Link').simulate('click');
      container.find('Link').simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
      expect(anchorClick).toHaveBeenCalledTimes(2);
      expect(parentClick).not.toHaveBeenCalled();
    });
  });

  it('should render childrenRight', () => {
    const container = mount(
      <ListItemMeeting {...props} childrenRight={<div className='test'>Test</div>}/>
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<ListItemMeeting className='menuItem' {...props}/>);

    expect(container.find('.md-list-item').hasClass('menuItem')).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<ListItemMeeting {...props} />);

    expect(container.find('.md-list-item__header').text()).toEqual('testHeader');
  });

  it('should handle id prop', () => {
    const container = mount(<ListItemMeeting id='header' {...props} />);

    expect(container.find('.md-list-item').props().id).toMatch(/header/);
  });

  it('should handle inProgress prop', () => {
    const container = mount(
      <ListItemMeeting {...props} inProgress/>
    );

    expect(container.find('.md-list-item-meeting__progress-line').exists()).toEqual(true);
  });

  it('should handle isRecurring prop', () => {
    const container = mount(<ListItemMeeting isRecurring {...props} />);

    expect(container.find('Icon').exists()).toEqual(true);
  });

  it('should handle isCompleted prop', () => {
    const container = mount(<ListItemMeeting isCompleted {...props} />);

    expect(container.find('.md-list-item-meeting--completed').exists()).toEqual(true);
  });

  describe('tests for onClick prop', () => {

    it('should fire onClick with click', () => {
      const container = mount(
        <ListItemMeeting {...props} onClick={parentClick} />
      );

      container.find('.md-list-item').simulate('click');
      expect(parentClick).toHaveBeenCalled();
    });

    it('should fire onClick with keyDown', () => {
      const container = mount(
        <ListItemMeeting {...props} onKeyDown={parentClick} />
      );

      container.find('.md-list-item').simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
      expect(parentClick).toHaveBeenCalled();
    });
  });

  it('should render popoverContent', () => {
    const container = mount(
      <ListItemMeeting {...props} popoverContent={<div className='test'>Test</div>}/>
    );

    container.find('.md-list-item').simulate('click');
    expect(container.find('.md-event-overlay').length).toEqual(1);
    expect(container.find('.test').length).toEqual(1);
  });

  it('should not render popoverContent if there is no popoverContent!', () => {
    const container = mount(
      <ListItemMeeting {...props} />
    );

    container.find('.md-list-item').simulate('click');
    expect(container.find('.md-event-overlay').length).toEqual(0);
  });

  describe('tests for time/isALlDay prop', () => {

    it('should handle isAllDay true', () => {
      const container = mount(
        <ListItemMeeting isAllDay />
      );

      expect(container.find('.md-list-item__left').childAt(0).text()).toEqual('All day');
    });

    it('should prioritize isAllDay over time', () => {
      const container = mount(
        <ListItemMeeting isAllDay time={{ start: '4' }} />
      );

      expect(container.find('.md-list-item__left').childAt(0).text()).toEqual('All day');
    });

    it('should handle start prop', () => {
      const container = mount(
        <ListItemMeeting time={{ start: '4' }} header='testHeader' />
      );

      expect(container.find('.md-list-item__left').childAt(0).text()).toEqual('4');
    });

    it('should not render end without start', () => {
      const container = mount(
        <ListItemMeeting time={{ end: '4' }} header='testHeader' />
      );

      expect(container.find('.md-list-item__left').childAt(1).exists()).toEqual(false);
    });

    it('should handle start & end prop', () => {
      const container = mount(
        <ListItemMeeting time={{ start: '3', end: '4' }} header='testHeader' />
      );

      expect(container.find('.md-list-item__left').childAt(0).text()).toEqual('3');
      expect(container.find('.md-list-item__left').childAt(1).text()).toEqual('4');
    });
  });

  it('should handle title prop', () => {
    const container = mount(
      <ListItemMeeting {...props} title='testTitle'/>
    );

    expect(container.find('.md-list-item').props().title).toEqual('testTitle');
  });

  it('should handle type prop', () => {
    const container = mount(
      <ListItemMeeting {...props} type='chip'/>
    );

    expect(container.find('.md-list-item-meeting--chip').exists()).toEqual(true);
  });

  it('should handle eventOverlay prop', () => {
    const container = mount(
      <ListItemMeeting
        {...props}
        eventOverlayProps={{ showArrow: false }}
        popoverContent={'test'}
      />
    );

    container.find('ListItemMeeting').simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('EventOverlay').props().showArrow).toEqual(false);
  });
});

