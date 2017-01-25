import React, {PropTypes} from 'react'
import styles from 'part:@sanity/components/textinputs/default-style'
import CloseIcon from 'part:@sanity/base/close-icon'
import {omit} from 'lodash'

export default class DefaultTextInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    type: PropTypes.string,
    onBlur: PropTypes.func,
    onClear: PropTypes.func,
    value: PropTypes.string,
    selected: PropTypes.bool,
    error: PropTypes.bool,
    placeholder: PropTypes.string,
    showClearButton: PropTypes.bool,
    id: PropTypes.string.isRequired,
    hasFocus: PropTypes.bool,
    focus: PropTypes.bool
  }

  static defaultProps = {
    value: '',
    type: 'text',
    onKeyPress() {},
    onChange() {},
    onFocus() {},
    onClear() {},
    onBlur() {}
  }

  handleKeyPress = event => {
    this.props.onKeyPress(event)
  }

  handleFocus = event => {
    this.props.onFocus(event)
  }

  handleBlur = event => {
    this.props.onBlur(event)
  }

  selectInput = event => {
    // Triggers only when the input is focused
    this._input.setSelectionRange(0, this.props.value.length)
  }

  handleClear = event => {
    this.props.onClear(event)
  }

  setInputElement = element => {
    this._input = element
  }

  handleChange = event => {
    this.props.onChange(event)
  }

  componentDidMount() {
    if (this.props.selected) {
      this.selectInput()
    }
    if (this.props.focus) {
      this._input.focus()
    }
  }

  componentDidUpdate() {
    if (this.props.selected) {
      this.selectInput()
    }
    if (this.props.focus) {
      this._input.focus()
    }
  }

  render() {
    const {value, placeholder, error, showClearButton, id, type, hasFocus, level, ...rest} = omit(this.props, 'onClear', 'focus')

    const rootClass = error ? styles.error : styles.root
    const levelClass = `styles[level_${level}]`

    return (
      <div className={rootClass}>
        <input
          {...rest}
          className={`
            ${error ? styles.inputError : styles.input}
            ${showClearButton && styles.hasClearButton}
            ${hasFocus && styles.hasFocus}
            ${level && levelClass}
          `}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoComplete="off"
          ref={this.setInputElement}
        />
        {
          showClearButton && (
            <button className={styles.clearButton} onClick={this.handleClear}>
              <CloseIcon color="inherit" />
            </button>
          )
        }
      </div>
    )
  }
}