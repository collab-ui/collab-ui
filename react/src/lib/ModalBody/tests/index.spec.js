import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { ModalBody } from '@momentum-ui/react';

describe('tests for <ModalBody />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ModalBody id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ModalBody', () => {
    const container = shallow(<ModalBody />);

    expect(container.find('.md-modal__body').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <ModalBody>
        <div className="testingforMB" />
      </ModalBody>
    );

    expect(container.find('.testingforMB').length).toEqual(1);
  });
});
