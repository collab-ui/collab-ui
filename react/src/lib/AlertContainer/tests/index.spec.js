import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Alert, AlertContainer } from '@momentum-ui/react';

describe('tests for <AlertContainer />', () => {
  const alertTitle = 'Now Hear This!';
  const alertMessage = 'Unit tesing like a boss!';

  it('should match SnapShot', () => {
    const container = shallow(<AlertContainer/>);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should pass className prop', () => {
    const container = mount(<AlertContainer className='testing' />);

    expect(container.find('.testing').exists()).toEqual(true);
    expect(container.find('AlertContainer').hasClass('testing')).toEqual(true);
  });

  it('should render a div in bottom-right by default', () => {
    const container = shallow(<AlertContainer />);

    expect(container.find('.md-alert__container--bottom-right').length).toEqual(1);
  });

  it('should honor position prop when top-left is passed in', () => {
    const container = shallow(<AlertContainer position={'top-left'}/>);

    expect(container.find('.md-alert__container--top-left').length).toEqual(1);
  });

  it('should honor position prop when top-center is passed in', () => {
    const container = shallow(<AlertContainer position={'top-center'}/>);

    expect(container.find('.md-alert__container--top-center').length).toEqual(1);
  });

  it('should honor position prop when top-right is passed in', () => {
    const container = shallow(<AlertContainer position={'top-right'}/>);

    expect(container.find('.md-alert__container--top-right').length).toEqual(1);
  });

  it('should honor position prop when bottom-left is passed in', () => {
    const container = shallow(<AlertContainer position={'bottom-left'}/>);

    expect(container.find('.md-alert__container--bottom-left').length).toEqual(1);
  });

  it('should honor position prop when bottom-center is passed in', () => {
    const container = shallow(<AlertContainer position={'bottom-center'}/>);

    expect(container.find('.md-alert__container--bottom-center').length).toEqual(1);
  });

  it('should honor position prop when bottom-right is passed in', () => {
    const container = shallow(<AlertContainer position={'bottom-right'}/>);

    expect(container.find('.md-alert__container--bottom-right').length).toEqual(1);
  });

  it('should render an info Alert when info() is called', () => {
    const container = mount(
      <AlertContainer>
        <Alert
          title={alertTitle}
          message={alertMessage}
          type='info'
          show
          closable={false}
        />
      </AlertContainer>
    );
    container.update();
    expect(container.find('.md-alert--info').length).toEqual(1);
  });

  it('should render a success Alert when success() is called', () => {
    const container = mount(
      <AlertContainer>
        <Alert
          title={alertTitle}
          message={alertMessage}
          type='success'
          show
          closable={false}
        />
      </AlertContainer>
    );

    container.update();
    expect(container.find('.md-alert--success').length).toEqual(1);
  });

  it('should render a warning Alert when warning() is called', () => {
    const container = mount(
      <AlertContainer>
        <Alert
          title={alertTitle}
          message={alertMessage}
          type='warning'
          show
          closable={false}
        />
      </AlertContainer>
    );
    container.update();
    expect(container.find('.md-alert--warning').length).toEqual(1);
  });

  it('should render an error Alert when error() is called', () => {
    const container = mount(
      <AlertContainer>
        <Alert
          title={alertTitle}
          message={alertMessage}
          type='error'
          show
          closable={false}
        />
      </AlertContainer>
    );
    container.update();
    expect(container.find('.md-alert--error').length).toEqual(1);
  });

  it('should pass any other HTML props to Alert', () => {
    const container = mount(
      <AlertContainer>
        <Alert
          title={alertTitle}
          message={alertMessage}
          type='info'
          show
          dismissBtnProps={{ ariaLabel: 'Close', id: 'testProp', onClick: ()=>{} }}
        />
      </AlertContainer>
    );

    container.update();
    expect(container.find('button').props().id).toEqual('testProp');
  });

  it('should pass otherProps to container', () => {
    const container = shallow(<AlertContainer id='testid'/>);

    expect(container.find('#testid').exists()).toEqual(true);
  });
});
