import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { ListItemSection } from '@momentum-ui/react';

describe('tests for <ListItemSection />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ListItemSection />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ListItemSection', () => {
    const container = shallow(<ListItemSection />);

    expect(container.find('.md-list-item__center').length).toEqual(1);
  });

  it('should handle position prop (left)', () => {
    const container = shallow(<ListItemSection position='left'/>);

    expect(container.find('.md-list-item__left').length).toEqual(1);
  });

  it('should handle position prop (right)', () => {
    const container = shallow(<ListItemSection position='right'/>);

    expect(container.find('.md-list-item__right').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = shallow(<ListItemSection className='right'/>);

    expect(container.find('.right').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <ListItemSection>
        <div>Test</div>
      </ListItemSection>
    );

    expect(container.children().length).toEqual(1);
  });
});
