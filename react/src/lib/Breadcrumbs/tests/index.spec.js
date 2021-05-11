import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Breadcrumbs } from '@momentum-ui/react';

describe('tests for <Breadcrumbs />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Breadcrumbs />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one UL', () => {
    const container = shallow(<Breadcrumbs />);

    expect(container.find('ul').length).toEqual(1);
  });

  it('should render one Child Div', () => {
    const container = shallow(
      <Breadcrumbs>
        <div>Test</div>
      </Breadcrumbs>
    );

    expect(container.find('ul').children().length).toEqual(1);
  });

  it('should assign conditional outlined class name', () => {
    const container = shallow(<Breadcrumbs className='test' />);

    expect(container.find('ul').hasClass('test')).toEqual(true);
  });
});
