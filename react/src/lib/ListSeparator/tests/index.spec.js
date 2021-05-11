import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { ListSeparator } from '@momentum-ui/react';

describe('tests for <ListSeparator />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ListSeparator />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render one ListSeparator', () => {
    const container = shallow(<ListSeparator />);

    expect(container.find('.md-list-separator').length).toEqual(1);
  });

  it('should render text prop', () => {
    const container = shallow(<ListSeparator text='Today'/>);

    expect(container.find('.md-list-separator__text').length).toEqual(1);
    expect(container.find('.md-list-separator__text').text()).toEqual('Today');
  });

  it('should change the line color', () => {
    const container = shallow(<ListSeparator lineColor='red'/>);

    expect(container.find('.md-list-separator').get(0).props.style).toHaveProperty('color', 'red');
  });

  it('should add padding to the text prop', () => {
    const container = shallow(<ListSeparator text='Today' textPadding={'40px'}/>);

    expect(container.find('.md-list-separator__text').get(0).props.style).toHaveProperty('padding', '40px');
  });

  it('should change the text color', () => {
    const container = shallow(<ListSeparator text='Today' textColor='green'/>);

    expect(container.find('.md-list-separator__text').get(0).props.style).toHaveProperty('color', 'green');
  });

  it('should handle className prop', () => {
    const container = shallow(<ListSeparator className='right'/>);

    expect(container.find('.right').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <ListSeparator>
        <div>Test</div>
      </ListSeparator>
    );

    expect(container.children().length).toEqual(1);
  });
});
