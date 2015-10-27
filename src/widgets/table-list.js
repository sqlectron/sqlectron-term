import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash';


export default class TableList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
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

    this.state = { focused: false };
  }

  selected () {
    if (this.refs.list) return this.refs.list.selected;
    return 0;
  }

  focus () {
    this.refs.list.focus();
  }

  handleFocus () {
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus();
  }

  handleBlur () {
    this.setState({ focused: false });
    if (this.props.onBlur) this.props.onBlur();
  }

  handleKeypress (ch, key) {
    if (this.props.onKeypress) this.props.onKeypress(ch, key);
    switch (key.full) {
    case 'tab':
      this.refs.list.screen.focusNext();
      break;
    case 'S-tab':
      this.refs.list.screen.focusPrev();
      break;
    default: return false;
    }
  }

  render () {
    const { items } = this.props;
    const { theme } = this.context;

    return (
      <list
        ref="list"
        keys="true"
        mouse="true"
        border="line"
        label=" Tables "
        scrollbar="true"
        style={this.state.focused ? merge({}, theme.list.normal, theme.list.focus) : theme.list.normal}
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
        onKeypress={::this.handleKeypress}
        items={items}
      />
    );
  }

}
