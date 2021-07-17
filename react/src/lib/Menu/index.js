import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import mapContextToProps from '@restart/context/mapContextToProps';
import qsa from 'dom-helpers/query/querySelectorAll';
import { UIDReset } from 'react-uid';
import SelectableContext from '../SelectableContext';
import ListContext from '../ListContext';
import MenuContext from '../MenuContext';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentElements: null,
      activeElement: null,
      listContext: {
        active: [],
        focus: null,
        ariaConfig: this.props.ariaConfig,
      },
      selectContext: {
        parentKeyDown: this.handleKeyDown,
        parentOnSelect: this.handleSelect
      }
    };
  }

  componentDidMount() {
    const menuItems = this.getFocusableItems(this.menuNode);

    menuItems.length && this.setFocus(menuItems[0], true);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.menuNode) return;
    const {
      focusFirst
    } = this.props;
    const {
      activeElement,
      listContext,
    } = this.state;

    if(prevState.listContext !== listContext) {
      if(activeElement && this._selectRefocus) {
        const activeNode = ReactDOM.findDOMNode(activeElement);
        const overlayItems = this.getFocusableItems(activeNode, '.md-menu-item-container');
        const items = overlayItems.length
          && this.getFocusableItems(overlayItems[0]);

        this._selectRefocus = false;
        items.length && this.setFocus(items[0], false, true);
      } else if (listContext.focus !== prevState.listContext.focus) {
        if(!prevState.listContext.focus && !focusFirst) {
          return;
        }

        this.menuNode
          .querySelector(`[data-md-event-key="${listContext.focus}"]`)
          .focus();
      }
    }
  }

  getFocusableItems = (node, selector) => {
    const defaultSelector = '.md-list-item:not(.disabled):not(:disabled)' +
      ':not(.md-list-item--read-only)';

    return qsa(node, selector || defaultSelector);
  }

  getIncludesFirstCharacter = (str, char) =>
  str
    .charAt(0)
    .toLowerCase()
    .includes(char);

  getNextFocusedChild(element, current, offset) {
    if (!element) return null;
    const { currentElements, listContext } = this.state;

    const items = this.getFocusableItems(element);
    const possibleIndex = items.indexOf(current) + offset;

    const getIndex = () => {
      if (possibleIndex < 0) {
        return items.length - 1;
      } else if (possibleIndex > items.length - 1) {
        return 0;
      } else return possibleIndex;
    };

    const newFocusKey = items[getIndex()]
      .attributes['data-md-event-key']
      .value;

    newFocusKey !== listContext.focus
      && this.setState({
        currentElements: !currentElements.length
          ? [...newFocusKey]
          : [...currentElements.slice(0, currentElements.length - 1), newFocusKey],
        listContext: {
          ...listContext,
          focus: newFocusKey,
        }
      });
  }

  handleSelect = (e, opts) => {
    const { onSelect, parentOnSelect } = this.props;
    const { eventKey, element } = opts;
    const { children } = element.props;
    this._selectRefocus = true;

    this.setState(state => ({
      activeElement: children ? element : null,
      currentElements: children ? [eventKey] : [state.currentElements[0]],
      listContext: {
        ...state.listContext,
        focus: children ? eventKey : state.currentElements[0],
        active: [eventKey]
      }
    }),
      () => {
        onSelect && onSelect(e, {eventKey, element});
        parentOnSelect && parentOnSelect(e, {eventKey, element});
      }
    );
  }

  setFocus = (child, isParent, isChild) => {
    const { currentElements } = this.state;

    const getCurrentElements = () => {
      if(isParent) {
        return([child.attributes['data-md-event-key'].value]);
      } else if (isChild) {
        return currentElements.concat(child.attributes['data-md-event-key'].value);
      } else null;
    };

    this.setState(state => ({
      currentElements: getCurrentElements(),
      listContext: {
        ...state.listContext,
        focus: child.attributes['data-md-event-key'].value
      }
    }));
  }

  setFocusByFirstCharacter = (element, char) => {
    const { currentElements, listContext } = this.state;

    const items = this.getFocusableItems(element);
    const focusIdx = listContext.focus
      && items.indexOf(element.querySelector(`[data-md-event-key="${listContext.focus}"]`))
      || 0;
    const length = items.length && items.length - 1 || 0;

    const newFocusKey = items
      .reduce((agg, item, idx, arr) => {

        const index = focusIdx + idx + 1 > length
          ? Math.abs(focusIdx + idx - length)
          : focusIdx + idx + 1;

          return (
            !agg
              && arr[index].attributes['data-md-keyboard-key']
              && arr[index].attributes['data-md-keyboard-key'].value
              && this.getIncludesFirstCharacter(arr[index].attributes['data-md-keyboard-key'].value, char)
          )
            ? arr[index].attributes['data-md-event-key'].value
            : agg;
      },
      null
    );

    typeof newFocusKey === 'string'
      && newFocusKey !== focus
      && this.setState(state => ({
        currentElements: !currentElements.length
        ? [...newFocusKey]
        : [...currentElements.slice(0, currentElements.length - 1), newFocusKey],
        listContext: {
          ...state.listContext,
          focus: newFocusKey,
        }
      }));
  }

  setFocusToLimit(element, target) {
    if (!element) return null;
    const { currentElements, listContext } = this.state;

    const items = this.getFocusableItems(element);
    const newFocusKey =
      items[
        target === 'start'
        ? 0
        : items.length -1
      ]
        .attributes['data-md-event-key']
        .value;

    newFocusKey !== listContext.focus
      && this.setState({
        currentElements: !currentElements.length
          ? [...newFocusKey]
          : [...currentElements.slice(0, currentElements.length - 1), newFocusKey],
        listContext: {
          ...listContext,
          focus: newFocusKey,
        }
      });
  }

  handleKeyDown = (e, opts) => {
    const { element } = opts;
    const { activeElement, currentElements } = this.state;
    const char = e.key;
    const target = e.currentTarget;
    const activeParent = activeElement
      ? qsa(ReactDOM.findDOMNode(activeElement), '.md-menu-item-container')[0]
      : this.menuNode;

    const isPrintableCharacter = char => {
      return char.length === 1 && char.match(/\S/);
    };
    let flag = false;

    switch (e.which) {
      case 38://up
        this.getNextFocusedChild(activeParent, target, -1);
        flag = true;
        break;

      case 40://down
        this.getNextFocusedChild(activeParent, target, 1);
        flag = true;
        break;

      case 39: //right
        element.constructor
        && element.constructor.displayName
        && element.constructor.displayName === 'SubMenu'
        && this.handleSelect(e, opts);
        flag = true;
        break;

      case 27:
      case 37: //escape or left
        currentElements.length - 1 &&
        this.setState(state => ({
          currentElements: state.currentElements.slice(0, currentElements.length - 1),
          activeElement: null,
          listContext: {
            focus: state.currentElements.length
              ? state.currentElements[0]
              : state.listContext.focus,
            active: []
          }
        }));
        flag = true;
        break;

      case 33:
      case 36: //home or page up
        this.setFocusToLimit(activeParent, 'start');
        flag = true;
        break;
      case 34:
      case 35: //end or page down
        this.setFocusToLimit(activeParent, 'end');
        flag = true;
        break;

      default:
        if (isPrintableCharacter(char)) {
          this.setFocusByFirstCharacter(activeParent, char);
          flag = true;
        }
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  render() {
    const {
      ariaLabel,
      children,
      className,
      ...props
    } = this.props;
    const {
      listContext,
      selectContext
    } = this.state;

    const otherProps = omit({...props}, [
      'ariaConfig',
      'focusFirst',
      'parentOnSelect'
    ]);

    return (
      <SelectableContext.Provider value={selectContext}>
        <ListContext.Provider value={listContext}>
          <div
            className={
              'md-menu' +
              ' md-menu-item-container' +
              `${(className && ` ${className}`) || ''}`
            }
            aria-label={ariaLabel}
            ref={ref => this.menuNode = ref}
            role="menubar"
            tabIndex={-1}
            {...otherProps}
          >
            <UIDReset>
              {children}
            </UIDReset>
          </div>
        </ListContext.Provider>
      </SelectableContext.Provider>
    );
  }
}

Menu.propTypes = {
  /** @prop Text to display for accessibility features | ''  */
  ariaLabel: PropTypes.string,
  /** @prop Accessibility Configuration Object */
  ariaConfig: PropTypes.object,
  /** @prop Children nodes to render inside Menu | null */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Sets first Menu item to have focus | true */
  focusFirst: PropTypes.bool,
  /** @prop Callback function invoked when user selects | null */
  onSelect: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func,
};

Menu.defaultProps = {
  ariaLabel: '',
  ariaConfig: null,
  children: null,
  className: '',
  focusFirst: true,
  onSelect: null,
  parentOnSelect: null,
};

Menu.displayName = 'Menu';

export default mapContextToProps(
  MenuContext,
  context => context,
  Menu
);
