import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";
import { Icon } from '@momentum-ui/react';

describe('Tests for <Icon />', () => {
  it('should match SnapShot', () => {
    const props = {
      name: 'accessibility_16',
      color: 'blue-50',
      className: 'testClass',
    };
    const container = shallow(<Icon {...props} />);
    expect(toJson(container)).toMatchSnapshot();
  });

  describe('Test the sizes of <Icon />', () => {
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
        size: 24,
        color: 'red-50',
        className: 'testClass',
      };
      const container = shallow(<Icon {...props} />);
      expect(toJson(container)).toMatchSnapshot();
    });

    it('should set font-size from size attribute if specified', () => {
      const props = {
        name: 'accessibility_16',
        size: 24,
        color: 'red-50',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.fontSize).toEqual('24px');
    });

    it('should allow sizeOverride prop to change icon size', () => {
      const props = {
        name: 'arrow-up_16',
        size: 24,
        sizeOverride: true,
        color: 'red-50',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.props().className).toEqual('md-icon icon icon-arrow-up_24');
    });

    it('should set font-size from icon name', () => {
      const props = {
        name: 'accessibility_16',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.fontSize).toEqual('16px');
    });

    it('should set font-size to default if not specified and not in the name', () => {
      const props = {
        name: 'cisco-logo',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.fontSize).toEqual('16px');
    });
  });

  describe('Test the name prop of <Icon />', () => {
    it('should be able to take the name without the "icon-" prefix', () => {
      const props = {
        name: 'accessibility_16',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.props().className).toEqual('md-icon icon icon-accessibility_16');
    });

    it('should be able to take the name WITH the "icon-" prefix', () => {
      const props = {
        name: 'icon-accessibility_16',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.props().className).toEqual('md-icon icon icon-accessibility_16');
    });
  });

  it('should pass the classNames onto the icon', () => {
    const props = {
      name: 'accessibility_16',
      className: 'testClass',
    };
    const container = mount(<Icon {...props} />);
    const iEle = container.find('i');
    expect(iEle.props().className).toEqual('md-icon icon icon-accessibility_16 testClass');
  });

  it('should pass other props to the icon', () => {
    const props = {
      name: 'accessibility_16',
      className: 'testClass',
      id: 'testId',
    };
    const container = mount(<Icon {...props} />);
    const iEle = container.find('i');
    expect(iEle.props().id).toEqual(props.id);
  });

  describe('Test the button <Icon />', () => {
    it('should wrap in button', () => {
      const props = {
        name: 'accessibility_16',
        onClick: () => {},
        ariaLabel: 'Accesible',
      };

      const container = mount(<Icon {...props} />);
      expect(container.find('.md-button').exists()).toEqual(true);
      expect(container.find('.md-button--icon').exists()).toEqual(true);
    });

    it('should wrap in button and add type class', () => {
      const props = {
        name: 'accessibility_16',
        type: 'white',
        onClick: () => {},
        ariaLabel: 'Accesible',
      };

      const container = mount(<Icon {...props} />);
      expect(container.find('.md-button--icon-white').exists()).toEqual(true);
    });

    it('should pass other props to the button if onClick Present', () => {
      const props = {
        name: 'accessibility_16',
        className: 'testClass',
        id: 'testId',
        ariaLabel: 'Testing',
        onClick: () => {},
      };
      const container = mount(<Icon {...props} />);
      const buttonEle = container.find('button');
      expect(buttonEle.props().id).toEqual(props.id);
    });
  });

  describe('Test the colors of <Icon />', () => {
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
      };
      const container = shallow(<Icon {...props} />);
      expect(toJson(container)).toMatchSnapshot();
    });

    it('should set fill color to default inherit when not specified by prop', () => {
      const props = {
        name: 'accessibility_16',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('');
    });

    it('should set fill color to rgba when color is set to white-60 (without $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: '$white-60',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgba(255, 255, 255, 0.6)');
    });

    it('should set fill color to rgba when color is set to $white-60 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'white-60',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgba(255, 255, 255, 0.6)');
    });

    it('should set fill color to rgb(0, 160, 209) when color is set to $md-blue-50 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: '$md-blue-50',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgb(0, 160, 209)');
    });

    it('should set fill color to rgb(0, 160, 209) when color is set to blue (without $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'blue-50',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgb(0, 160, 209)');
    });

    it('should set fill color to #00A0D1 when color is set to hex value and return a warning.', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: '#00A0D1',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgb(0, 160, 209)');
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });

    it('should log a warning when color opacity does not exist in momentum-ui', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: '$white-89',
      };
      mount(<Icon {...props} />);
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });

    it('should log a warning when color variable does not exist in momentum-ui', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: 'not-a-color',
      };
      mount(<Icon {...props} />);
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test the accessibilty of <Icon />', () => {
    const title = 'Test Title';
    const description = 'This is a test description';
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
        title,
        description,
      };
      const container = shallow(<Icon {...props} />);
      expect(toJson(container)).toMatchSnapshot();
    });

    it('should set aria-label attribute from title prop', () => {
      const props = {
        name: 'accessibility_16',
        title,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(title);
    });

    it('should set title attribute from title prop', () => {
      const props = {
        name: 'accessibility_16',
        title,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['title'].value).toEqual(title);
    });

    it('should set title attribute from title prop on button if onclick', () => {
      const props = {
        name: 'accessibility_16',
        title,
        onClick: jest.fn()
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      const bEle = container.find('button');
      expect(iEle.getDOMNode().attributes['title']).toEqual(undefined);
      expect(bEle.getDOMNode().attributes['title'].value).toEqual(title);
    });

    it('should set aria-label attribute from description prop', () => {
      const props = {
        name: 'accessibility_16',
        description,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(description);
    });

    it('should set aria-label attribute from title & description props', () => {
      const props = {
        name: 'accessibility_16',
        title,
        description,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(`${title} ${description}`);
    });

    it('should set aria-label attribute from ariaLabel prop', () => {
      const props = {
        name: 'accessibility_16',
        ariaLabel: title,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(title);
    });

    it('should set aria-label attribute from aria-label prop', () => {
      const props = {
        name: 'accessibility_16',
        'aria-label': title,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(title);
    });
  });

  it('should log a warning if the icon does not exist in Momentum UI Icons', () => {
    global.console = { warn: jest.fn() };
    const props = {
      name: 'not-an-icon_16',
    };
    mount(<Icon {...props} />);
    expect(global.console.warn).toHaveBeenCalledTimes(1);
  });

  it('should allow other styles to be applied', () => {
    const props = {
      name: 'accessibility_16',
      style: { display: 'none' }
    };

    const container = mount(<Icon {...props} />);
    const iEle = container.find('i');
    expect(iEle.getDOMNode().style.display).toEqual('none');
  });
});
