import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash';


export default class ServerList extends Component {

  static propTypes = {
    servers: PropTypes.array.isRequired,
    // events
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeypress: PropTypes.func,
    // actions
    onSelected: PropTypes.func,
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

  handleSelectItem () {
    const { servers, onSelected } = this.props;
    if (onSelected) {
      const { list } = this.refs;
      onSelected(servers[list.selected]);
    }
  }

  handleFocus () {
    if (this.props.onFocus) this.props.onFocus();
  }

  handleBlur () {
    if (this.props.onBlur) this.props.onBlur();
  }

  handleKeypress (ch, info) {
    if (this.props.onKeypress) this.props.onKeypress(ch, info);
  }

  render () {
    const { servers } = this.props;
    const { theme } = this.context;

    const items = servers.map(server => server.name);

    return (
      <list
        keys mouse shadow scrollbar
        ref="list"
        style={merge({}, theme.list.normal, theme.list.focus)}
        left="center"
        top="center"
        border="line"
        label=" Server list "
        items={items}
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
        onKeypress={::this.handleKeypress}
        {...{ 'onSelect Item': ::this.handleSelectItem } }
      />
    );
  }

}
