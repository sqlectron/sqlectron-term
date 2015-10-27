import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash';


export default class Textarea extends Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    // events
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeypress: PropTypes.func,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = { value: props.defaultValue || '', focused: false };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.defaultValue !== this.state.value) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  setValue (value) {
    this.setState({ value });
  }

  getValue () {
    return this.state.value;
  }

  focus () {
    this.refs.textarea.focus();
  }

  handleFocus () {
    this.refs.textarea.readInput();
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus(this);
  }

  handleBlur () {
    this.setState({ focused: false });
    if (this.props.onBlur) this.props.onBlur(this);
  }

  handleKeypress (ch, info) {
    const value = this.refs.textarea.value;
    if (value !== this.state.value) this.setState({ value });

    if (this.props.onKeypress) this.props.onKeypress(ch, info);

    switch (info.full) {
    case 'tab':
      this.refs.textarea.screen.focusNext();
      break;
    case 'S-tab':
      this.refs.textarea.screen.focusPrev();
      break;
    default: return false;
    }
  }

  render () {
    const { theme } = this.context;
    return (
      <textarea
        keys mouse
        ref="textarea"
        border="line"
        style={this.state.focused ? merge({}, theme.box.normal, theme.box.focus) : theme.box.normal}
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
        onKeypress={::this.handleKeypress}
        value={this.state.value}
      />
    );
  }

}
