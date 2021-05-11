import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Slider } from '@momentum-ui/react';

describe('tests for <Slider />', () => {
	it('should match SnapShot', () => {
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 20,
				high: 40
			}
		};
		const container = shallow(<Slider {...props} />);

		expect(toJson(container)).toMatchSnapshot();
	});

	it('should render Slider properly', () => {
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 20,
				high: 40
			}
		};
		const container = mount(<Slider {...props} />);
		container.update();

		expect(container.find('.md-slider__pointer').length).toEqual(2);
		expect(container.find('.md-slider__bar').length).toEqual(1);
		expect(container.find('.md-slider__selection').length).toEqual(1);
		expect(container.state().sliderHigh).toEqual(40);
		expect(container.state().sliderLow).toEqual(20);
	});

	it('when slider moves and attempts to cross over', () => {
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 10,
				high: 40
			},
			onChange: jest.fn(),
			canCross: true
		};

		const container = shallow(<Slider {...props}/>);
		container.instance().getSliderWidth = () => 100;
		container.instance().onSliderMove('sliderLow', {
			from: 10,
			to: 70,
			direction: 1
		});
		expect(container.state().sliderLow).toEqual(70);
		expect(container.state().sliderHigh).toEqual(40);
		expect(props.onChange).toHaveBeenCalledWith({low: 40, high: 70});
	});

	it('when slider moves and does not cross over', () => {
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 10,
				high: 40
			},
			onChange: jest.fn()
		};
		const container = shallow(<Slider {...props}/>);
		container.instance().getSliderWidth = () => 100;
		container.instance().onSliderMove('sliderLow', {
			from: 10,
			to: 70,
			direction: 1
		});
		expect(container.state().sliderLow).toEqual(40);
		expect(container.state().sliderHigh).toEqual(40);
		expect(props.onChange).toHaveBeenCalledWith({low: 40, high: 40});
	});

	it('when slider stops at boundaries',  () => {
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 10,
				high: 40
			},
			onChange: jest.fn()
		};
		const container = shallow(<Slider {...props}/>);
		container.instance().getSliderWidth = () => 100;

		// moving in forward direction
		container.instance().onSliderMove('sliderHigh', {
			from: 40,
			to: 110,
			direction: 1
		});
		expect(container.state().sliderHigh).toEqual(100);
		expect(props.onChange).toHaveBeenCalledWith({low: 10, high: 100});

		// moving in backward direction
		container.instance().onSliderMove('sliderLow', {
			from: 10,
			to: -20,
			direction: -1
		});
		expect(container.state().sliderLow).toEqual(0);
		expect(props.onChange).toHaveBeenCalledWith({low: 0, high: 100});
	});

	it('on keyboard events', () => {
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 10,
				high: 40
			},
			onChange: jest.fn()
		};

		const container = mount(<Slider {...props}/>);
		container.instance().getSliderWidth = () => 100;

		// left
		container.find('.md-slider__pointer').at(1).simulate('keydown', { keyCode: 37});
		expect(container.state().sliderHigh).toEqual(39);

		// right
		container.find('.md-slider__pointer').at(1).simulate('keydown', { keyCode: 39});
		expect(container.state().sliderHigh).toEqual(40);

		// up
		container.find('.md-slider__pointer').at(1).simulate('keydown', { keyCode: 38});
		expect(container.state().sliderHigh).toEqual(41);

		// down
		container.find('.md-slider__pointer').at(1).simulate('keydown', { keyCode: 40});
		expect(container.state().sliderHigh).toEqual(40);


	});

	it('when only one sliderPointer is present', () => {
		const props = {
			min: 20,
			max: 100,
			value: 40,
			onChange: jest.fn()
		};
		const container = mount(<Slider {...props}/>);
		container.instance().getSliderWidth = () => 100;
		expect(container.find('.md-slider__pointer').length).toEqual(1);
		expect(container.find('.md-slider__bar').length).toEqual(1);
		expect(container.find('.md-slider__selection').length).toEqual(1);

		expect(container.state().sliderHigh).toEqual(40);
		expect(container.state().sliderLow).toEqual(20);

		// left
		container.find('.md-slider__pointer').at(0).simulate('keydown', { keyCode: 37});
		expect(container.state().sliderHigh).toEqual(39);

		expect(props.onChange).toHaveBeenCalledWith(39);
	});
});
