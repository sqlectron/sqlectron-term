import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash';


export default class DatabaseList extends Component {

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

  componentDidMount () {
    if (this.refs.list) this.refs.list.focus();
  }

  selected () {
    if (this.refs.list) return this.refs.list.selected;
    return 0;
  }

  focus () {
    this.refs.list.focus();
  }

  handleKeypress (ch, info) {
    if (this.props.onKeypress) this.props.onKeypress(ch, info);
  }

  handleFocus () {
    if (this.props.onFocus) this.props.onFocus();
  }

  handleBlur () {
    if (this.props.onBlur) this.props.onBlur();
  }

  render () {
    const { items } = this.props;
    const { theme } = this.context;

    return (
      <list
        keys mouse shadow scrollbar
        ref="list"
        style={merge({}, theme.list.normal, theme.list.focus)}
        position={{ left: 'center', top: 'center' }}
        border="line"
        label=" Database list "
        items={items}
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
        onKeypress={::this.handleKeypress}
      />
    );
  }

}
