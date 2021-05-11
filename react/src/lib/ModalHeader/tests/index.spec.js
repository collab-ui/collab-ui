import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { ModalHeader } from '@momentum-ui/react';

describe('tests for <ModalHeader />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ModalHeader id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ModalHeader', () => {
    const container = shallow(<ModalHeader />);

    expect(container.find('div').hasClass('md-modal__header')).toEqual(true);
  });

  it('should display closable button by default', () => {
    const container = shallow(<ModalHeader />);

    expect(container.find('.md-modal__close').length).toEqual(1);
  });

  it('should apply closeBtnProps', () => {
    const container = shallow(<ModalHeader closeBtnProps={{ className: 'test'}}/>);

    expect(container.find('.test').length).toEqual(1);
  });

  it('should display not display closable button', () => {
    const container = shallow(<ModalHeader showCloseButton={false} />);

    expect(container.find('Icon').exists()).toEqual(false);
  });

  it('should pass onHide function to onClick', () => {
    const onClose = jest.fn();

    const container = mount(<ModalHeader />, {
      context: {
        handleClose: onClose
      }
    });

    container.find('button.md-modal__close').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should render headerLabel', () => {
    const container = shallow(
      <ModalHeader headerLabel='test' />
    );

    expect(container.find('.md-modal__title').length).toEqual(1);
    expect(container.find('.md-modal__title').text()).toEqual('test');
  });

  it('should render message', () => {
    const container = shallow(
      <ModalHeader message='test' />
    );

    expect(container.find('.md-modal__message').length).toEqual(1);
    expect(container.find('.md-modal__message').text()).toEqual('test');
  });

  it('should render children', () => {
    const container = shallow(
      <ModalHeader>
        <div className='test' />
      </ModalHeader>
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should only render if children & headerLabel', () => {
    const container = shallow(
      <ModalHeader headerLabel='test'>
        <div className='test' />
      </ModalHeader>
    );

    expect(container.find('.md-modal__title').length).toEqual(0);
    expect(container.find('.test').length).toEqual(1);
  });
});
