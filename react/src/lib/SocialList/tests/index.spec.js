import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { SocialList } from '@momentum-ui/react';

describe('<SocialList />', () => {
  it('should render a SocialList', () => {
    const container = shallow(<SocialList />);
    expect(toJson(container)).toMatchSnapshot();
  });

  it('should render null if children prop is not set', () => {
    const container = shallow(<SocialList />);

    expect(container.instance().props.children).toEqual(null);
  });

  it('should render children if children prop is set', () => {
    const container = shallow(<SocialList>social list</SocialList>);

    expect(container.instance().props.children).toEqual('social list');
  });
});
