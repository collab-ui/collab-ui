import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { ModalFooter } from '@momentum-ui/react';

describe('tests for <ModalFooter />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ModalFooter id="test" />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ModalFooter', () => {
    const container = shallow(<ModalFooter />);

    expect(container.find('.md-modal__footer').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <ModalFooter>
        <div className="testingforMF" />
      </ModalFooter>
    );

    expect(container.find('.testingforMF').length).toEqual(1);
  });
});
