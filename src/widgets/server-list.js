import React, { Component, PropTypes } from 'react';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  error: { fg: 'red' },
};


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

    const items = servers.map(server => server.name);

    return (
      <list ref="list"
            style={style.list}
            left="center"
            top="center"
            border="line"
            keys="true"
            mouse="true"
            shadow="true"
            label=" Server list "
            scrollbar={{
              ch: ' ',
              track: { bg: 'cyan' },
              style: { inverse: true },
            }}
            items={items}
            onFocus={::this.handleFocus}
            onBlur={::this.handleBlur}
            onKeypress={::this.handleKeypress}
            {...{ 'onSelect Item': ::this.handleSelectItem } }
      />
    );
  }

}
