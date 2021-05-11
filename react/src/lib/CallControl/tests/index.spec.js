import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { CallControl } from '@momentum-ui/react';

describe('tests for <CallControl />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CallControl type='microphone-muted' ariaLabel='test' />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one Call Control button', () => {
    const container = mount(<CallControl type='microphone-muted' ariaLabel='test' />);

    expect(container.find('Button').length).toEqual(1);
  });

  it('should handle disabled state', () => {
    const container = shallow(<CallControl type='microphone-muted' disabled ariaLabel='test' />);

    expect(container.props().disabled).toEqual(true);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<CallControl type='microphone-muted' onClick={countUp} ariaLabel='test' />);

    container.find('Button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyDown as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<CallControl type='microphone-muted' onClick={countUp} ariaLabel='test' />);

    container.find('Button').simulate('click');
    container
      .find('Button')
      .simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
    expect(count).toEqual(2);
  });

  describe('tests for type prop', () => {
    it('should render activities type', () => {
      const container = mount(<CallControl type='activities' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('activities_24');
    });

    it('should render camera type', () => {
      const container = mount(<CallControl type='camera' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('camera_24');
    });

    it('should render camera-muted type', () => {
      const container = mount(<CallControl type='camera-muted' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('camera-muted_24');
    });

    it('should render cancel type', () => {
      const container = mount(<CallControl type='cancel' ariaLabel='test' />);

      expect(container.find('button').hasClass('md-button--red')).toEqual(true);
      expect(container.find('Icon').props().name).toEqual('cancel_24');
    });

    it('should render handset type', () => {
      const container = mount(<CallControl type='handset' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('handset_24');
    });

    it('should render microphone-muted type', () => {
      const container = mount(<CallControl type='microphone-muted' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('microphone-muted_24');
    });

    it('should render more type', () => {
      const container = mount(<CallControl type='more' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('more_24');
    });

    it('should render participant-list type', () => {
      const container = mount(<CallControl type='participant-list' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('participant-list_24');
    });

    it('should render share-screen type', () => {
      const container = mount(<CallControl type='share-screen' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('share-screen_24');
    });

    it('should render speaker type', () => {
      const container = mount(<CallControl type='speaker' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('speaker_24');
    });

    it('should render more type', () => {
      const container = mount(<CallControl type='more' ariaLabel='test' />);

      expect(container.find('Icon').props().name).toEqual('more_24');
    });
  });

  it('should handle iconSize of 20', () => {
    const container = mount(<CallControl type='microphone-muted' ariaLabel='test' iconSize={10}/>);

    const iEle = container.find('i');
    expect(iEle.getDOMNode().style.fontSize).toEqual('10px');
  });

  it('should handle iconSize of 40', () => {
    const container = mount(<CallControl type='microphone-muted' ariaLabel='test' iconSize={16}/>);

    const iEle = container.find('i');
    expect(iEle.getDOMNode().style.fontSize).toEqual('16px');
  });

  it('should handle iconColor prop', () => {
    const container = mount(<CallControl type='microphone-muted' ariaLabel='test' iconColor='green-50' />);

    expect(container.find('Icon').props().color).toEqual('green-50');
  });
});
