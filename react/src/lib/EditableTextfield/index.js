/** @component editable-textfield */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Input } from '@momentum-ui/react';

class EditableTextfield extends React.Component {
  static displayName = 'EditableTextfield';

  state = {
    isEditing: false,
    inputText: this.props.inputText,
  };

  componentDidUpdate = () => {
    if (this.state.isEditing && this.editText) {
      this.editText.focus();
    }
  }

  handleEnter = (e, value) => {
    const { allowEmpty, handleDoneEditing } = this.props;
    e.persist();

    if(!allowEmpty && (!value || !value.replace(/\s/g, ''))) {
      this.setState(
        {
          isEditing: false
        },
        () => handleDoneEditing && handleDoneEditing(e, {value})
      );
    } else {
      this.setState(
        {
          isEditing: false,
          inputText: value,
        },
        () => handleDoneEditing && handleDoneEditing(e, {value})
      );
    }

    e.nativeEvent.stopImmediatePropagation();
  }

  handleBlur = (e, value) => {
    const { allowEmpty, handleDoneEditing } = this.props;
    e.persist();

    if(!allowEmpty && (!value || !value.replace(/\s/g, ''))) {
      this.setState(
        {
          isEditing: false
        },
        () => handleDoneEditing && handleDoneEditing(e, {value})
      );
    } else {
      this.setState(
        {
          isEditing: false,
          inputText: value,
        },
        () => handleDoneEditing && handleDoneEditing(e, {value})
      );
    }
  }

  handleEsc = e => {
    var value = e.target.value;
    var handleDoneEditing = this.props.handleDoneEditing;
    this.setState(
      {
        isEditing: false
      },
      () => handleDoneEditing && handleDoneEditing(e, {value})
    );
    e.nativeEvent.stopImmediatePropagation();
  }

  handleClick = () => {
    const { disabled } = this.props;

    if(disabled) {
      return;
    } else {
      this.setState({
        isEditing: true,
      });
    }
  }

  handleKey = () => {
    const { disabled } = this.props;

    if(disabled) {
      return;
    } else {
      this.setState({
        isEditing: true
      });
    }
  }

  handleDoneKeyDown = e => {
    if (e.keyCode === 27) {
      this.handleEsc(e);
    } else if (e.keyCode === 13){
      this.handleEnter(e, e.target.value);
    }
  }

  render() {
    const {
      alignment,
      buttonClassName,
      buttonProps,
      className,
      ...props
    } = this.props;
    const { isEditing, inputText } = this.state;

    const inputProps = omit({...props}, [
      'allowEmpty',
      'disabled',
      'handleDoneEditing',
      'inputText',
    ]);

    return(
      <span
        className={
          'md-editable-textfield' +
          `${alignment && ` md-editable-textfield--${alignment}` || ''}`
        }
      >
        {isEditing &&
          <Input
            className={
              'md-editable-textfield__editing' +
              `${className && ` ${className}` || ''}`
            }
            inputRef={(input) => { this.editText = input; }}
            onDoneEditing={this.handleBlur}
            onKeyDown={this.handleDoneKeyDown}
            value={inputText}
            {...inputProps}
          />
        }
        {!isEditing &&
          <div
            role='button'
            tabIndex={0}
            className={
              'md-editable-textfield__button' +
              `${buttonClassName && ` ${buttonClassName}` || ''}`
            }
            onClick={this.handleClick}
            onKeyPress={this.handleKey}
            {...buttonProps}
          >
            {inputText || '\u00a0'}
          </div>
        }
      </span>
    );
  }
}

EditableTextfield.propTypes = {
  /** @prop Alignment css modifier | 'left' */
  alignment: PropTypes.oneOf(['center', 'left', 'right']),
  /** @prop Optional prop that prevents input from having null value | true */
  allowEmpty: PropTypes.bool,
  /** @prop Optional css class name for internal button | null */
  buttonClassName: PropTypes.string,
  /** @prop Optional props for internal button | '' */
  buttonProps: PropTypes.shape({}),
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the disable attribute for EditableTextField | false */
  disabled: PropTypes.bool,
  /** @prop Optional function for blur | null */
  handleDoneEditing: PropTypes.func,
  /** @prop Text to be shown within input field | null */
  inputText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

EditableTextfield.defaultProps = {
  alignment: 'left',
  allowEmpty: true,
  buttonClassName: '',
  buttonProps: null,
  className: '',
  disabled: false,
  handleDoneEditing: null,
  inputText: '',
};

export default EditableTextfield;
