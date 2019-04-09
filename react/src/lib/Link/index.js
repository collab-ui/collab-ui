/** @component link */

import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ className, children, color, disabled, tag, theme, ...props }) => {
  return (
    React.createElement(
      tag,
      {
        className:
          'cui-link' +
          `${(color && ` cui-link--${color}`) || ''}` +
          `${(theme && ` cui-link--${theme}`) || ''}` +
          `${(className && ` ${className}`) || ''}`,
        disabled: disabled,
        ...!disabled && { tabIndex: 0 },
        ...props
      },
      children
    )
  );
};

Link.propTypes = {
  /** @prop Children nodes to render inside Link Component | null */
  children: PropTypes.node.isRequired,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Optional color css styling | 'blue' */
  color: PropTypes.string,
  /** @prop Sets the attribute disabled to the Link | false */
  disabled: PropTypes.bool,
  /** @prop Set HTML tag type | 'a' */
  tag: PropTypes.oneOf(['a', 'div', 'span']),
  /** @prop Set Link theme | ''  */
  theme: PropTypes.string,
};

Link.defaultProps = {
  children: null,
  className: '',
  color: 'blue',
  disabled: false,
  tag: 'a',
  theme: ''
};

Link.displayName = 'Link';

export default Link;
