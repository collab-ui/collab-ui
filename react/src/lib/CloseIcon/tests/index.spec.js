import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { CloseIcon } from '@momentum-ui/react';

describe('tests for <CloseIcon />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CloseIcon className='test' />);

    expect(toJson(container)).toMatchSnapshot();
  });

  it('should call onClick on click of close', () => {
    const onClick = jest.fn();
    const container = shallow(<CloseIcon className='test' onClick={onClick} aria-label='Close' />);
    expect(container.find('.test').length).toEqual(1);
    expect(container.find('.test').props()['aria-label']).toEqual('Close');

    container.find('.md-close').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

});
