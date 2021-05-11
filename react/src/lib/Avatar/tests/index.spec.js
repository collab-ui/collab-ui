import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Avatar, Icon } from '@momentum-ui/react';

describe('tests for <Avatar />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Avatar />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('sequence of image load  ', () => {
    const container = mount(<Avatar src="test.png" title="Test Name" />);

    expect(container.find('.md-avatar__img').hasClass('md-avatar__img--hidden')).toEqual(true);
    expect(container.find('.md-avatar__letter').length).toEqual(1);

    container.setState({ isImageLoaded: true });

    expect(container.find('.md-avatar__img').hasClass('md-avatar__img--hidden')).toEqual(false);
    expect(container.find('.md-avatar__letter').exists()).toEqual(false);
  });

  it('should handle isDecrypting prop', () => {
    const container = mount(<Avatar isDecrypting icon={<Icon name='handset_24' />} />);

    expect(container.find('.md-decrypting').length).toEqual(1);
  });

  it('should handle isOverview prop', () => {
    const container = mount(<Avatar isOverview icon={<Icon name='handset_24' />} />);

    expect(container.find('.md-avatar__icon--overview').length).toEqual(1);
  });

  it('should trim title', () => {
    const container = mount(<Avatar src="test.png" title="    Test Name     " />);
    expect(container.find('.md-avatar__letter').text()).toEqual('TN');
  });

  it('should display title for user - FirstName', () => {
    const container = mount(<Avatar src="test.png" title="Fred" />);
    expect(container.find('.md-avatar__letter').text()).toEqual('F');
  });

  it('should display title for user - FirstName LastName', () => {
    const container = mount(<Avatar src="test.png" title="Frank Little" />);
    expect(container.find('.md-avatar__letter').text()).toEqual('FL');
  });

  it('should display title for user - FirstName MiddleName LastName', () => {
    const container = mount(<Avatar src="test.png" title="Francis Michael Lincoln" />);
    expect(container.find('.md-avatar__letter').text()).toEqual('FL');
  });

  it('should display blank title for user with blank title', () => {
    const container = mount(<Avatar src="test.png" title="                  " />);
    expect(container.find('.md-avatar__letter').text()).toEqual('');
  });

  it('should override title for user when initials props present', () => {
    const container = mount(<Avatar initials="WX" src="test.png" title="Francis Michael Lincoln" />);
    expect(container.find('.md-avatar__letter').text()).toEqual('WX');
  });

  it('should display title for group', () => {
    const container = mount(<Avatar src="test.png" title="Test Group" type="group" />);
    expect(container.find('.md-avatar__letter').text()).toEqual('T');
  });

  it('should display title for group', () => {
    const container = mount(<Avatar src="test.png" title="Test Group" type="group" />);
    expect(container.find('.md-avatar__letter').text()).toEqual('T');
    expect(container.find('.md-avatar').props().title).toEqual('Test Group');
  });

  it('should handle dark theme', () => {
    const container = mount(<Avatar theme="dark" />);
    expect(container.find('.md-avatar--dark').length).toEqual(1);
  });

  describe('should apply respective classes for types', () => {

    it('when the type is group', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="group" />);
      expect(container.find('.md-avatar--group').length).toEqual(1);
    });

    it('when the type is active', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="active" />);
      expect(container.find('.md-avatar--active').length).toEqual(1);
    });

    it('when the type is inactive', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="inactive" />);
      expect(container.find('.md-avatar--inactive').length).toEqual(1);
    });

    it('when the type is Do Not Disturb', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="dnd" />);
      expect(container.find('.md-avatar--dnd').length).toEqual(1);
    });

    it('when the type is Out of Office', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="ooo" />);
      expect(container.find('.md-avatar--ooo').length).toEqual(1);
    });

    it('when the type is call', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="call" />);
      expect(container.find('.md-avatar--call').length).toEqual(1);
    });

    it('when the type is meeting', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="meeting" />);
      expect(container.find('.md-avatar--meeting').length).toEqual(1);
    });

    it('when the type is presenting', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="presenting" />);
      expect(container.find('.md-avatar--presenting').length).toEqual(1);
    });

    it('when the type is typing', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="typing" />);
      expect(container.find('.md-avatar--typing').length).toEqual(1);
      expect(container.find('.md-loading').length).toEqual(1);
    });

    it('when the type is bot', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="bot" />);
      expect(container.find('.md-avatar--bot').length).toEqual(1);
    });

    describe('should for type self apply correct icon size', () => {

      it('when size is 36', () => {
        const container = mount(<Avatar src="test.png" title="Test Group" size={36} type='self'/>);

        expect(container.find('.md-icon').getDOMNode().style.fontSize).toEqual('16px');
        expect(container.find('.md-avatar__self').length).toEqual(1);
      });

      it('when the size is default(medium)', () => {
        const container = mount(<Avatar src="test.png" title="Test Group" type="self" />);

        expect(container.find('.md-icon').getDOMNode().style.fontSize).toEqual('18px');
        expect(container.find('.md-avatar__self').length).toEqual(1);
      });

      it('when size is 40', () => {
        const container = mount(<Avatar src="test.png" size={40} title="Test Group" type='self'/>);

        expect(container.find('.md-icon').getDOMNode().style.fontSize).toEqual('18px');
        expect(container.find('.md-avatar__self').length).toEqual(1);
      });

    });

    it('when the failureBadge is true', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" failureBadge />);
      expect(container.find('.md-avatar__failure-badge').length).toEqual(1);
    });

    it('when the hasNotification is true', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" hasNotification />);
      expect(container.find('.md-avatar__notification-badge').length).toEqual(1);
    });

  });

  describe('should apply respective classes for size', () => {

    it('when size is 18/xsmall', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" size="xsmall" />);
      expect(container.find('.md-avatar--xsmall').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={18} title="Test Group" />);
      expect(container.find('.md-avatar--18').length).toEqual(1);
    });

    it('when size is 24', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={24} />);
      expect(container.find('.md-avatar--24').length).toEqual(1);
    });

    it('when size is 28/small', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" size="small" />);
      expect(container.find('.md-avatar--small').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={28} title="Test Group" />);
      expect(container.find('.md-avatar--28').length).toEqual(1);
    });

    it('when size is 36', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={36} />);
      expect(container.find('.md-avatar--36').length).toEqual(1);
    });

    it('when size is 40/medium(default)', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" />);
      expect(container.find('.md-avatar--medium').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={40} title="Test Group"/>);
      expect(container.find('.md-avatar--40').length).toEqual(1);
    });

    it('when size is 44', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={44} />);
      expect(container.find('.md-avatar--44').length).toEqual(1);
    });

    it('when size is 52/large', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" size="large" />);
      expect(container.find('.md-avatar--large').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={52} title="Test Group" />);
      expect(container.find('.md-avatar--52').length).toEqual(1);
    });

    it('when size is 56', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={56} />);
      expect(container.find('.md-avatar--56').length).toEqual(1);
    });

    it('when size is 72', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={72} />);
      expect(container.find('.md-avatar--72').length).toEqual(1);
    });

    it('when size is 80', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size={80} />);
      expect(container.find('.md-avatar--80').length).toEqual(1);
    });

    it('when size is 84/xlarge', () => {
      let container = mount(<Avatar src="test.png" title="Test Group" size="xlarge" />);
      expect(container.find('.md-avatar--xlarge').length).toEqual(1);
      container = mount(<Avatar src="test.png" size={84} title="Test Group" />);
      expect(container.find('.md-avatar--84').length).toEqual(1);
    });
  });

  it('should apply clickable class when onClick prop is defined', () => {
    let container = mount(
      <Avatar
        src="test.png"
        title="Test Group"
        onClick={()=>{}}
        ariaLabel='Test onClick'
      />
    );

    expect(container.find('.md-avatar--clickable').length).toEqual(1);
  });

  it('should not apply clickable class when onClick prop is undefined', () => {
    let container = mount(
      <Avatar
        src="test.png"
        title="Test Group"
      />
    );

    expect(container.find('.md-avatar--clickable').length).toEqual(0);
  });

  it('should display icon', () => {
    const container = shallow(<Avatar icon={<Icon name="test" />} />);
    expect(container.find('.md-avatar__icon').length).toEqual(1);
  });

  it('should display tooltip', () => {
    const container = shallow(<Avatar title="test title" hideDefaultTooltip />);
    expect(container.find('.md-avatar').props().title).toEqual('');
  });

  it('should wrap in button', () => {
    const props = {
      name: 'accessibility_16',
      onClick: ()=>{},
      ariaLabel: 'Accesible',
    };

    const container = mount(<Avatar {...props} />);
    expect(container.find('.md-button').exists()).toEqual(true);
    expect(container.find('.md-button--none').exists()).toEqual(true);
  });

  it('should handle onClick event', () => {
    const onClick = jest.fn();
    const props = {
      name: 'accessibility_16',
      onClick: onClick,
      ariaLabel: 'Accesible',
    };

    const container = mount(<Avatar {...props} />);

    container.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should pass other props to the avatar', () => {
    const props = {
      name: 'accessibility_16',
      id: 'testId'
    };

    const container = mount(<Avatar {...props} />);
    const avatarEle = container.find('.md-avatar');
    expect(avatarEle.props().id).toEqual(props.id);
  });

  it('should pass other props to the button if onClick Present', () => {
    const props = {
      name: 'accessibility_16',
      id: 'testId',
      ariaLabel: 'Accesible',
      onClick: ()=>{}
    };

    const container = mount(<Avatar {...props} />);
    const buttonEle = container.find('button');
    expect(buttonEle.props().id).toEqual(props.id);
  });

  it('should render when title is only spaces', () => {
    const container = mount(<Avatar src="test.png" title="  " size={36} />);
    expect(container.find('.md-avatar__letter').length).toEqual(1);
  });

});
