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
    // actions
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onConnect: PropTypes.func,
    onSelected: PropTypes.func,
  };

  componentDidMount () {
    if (this.refs.list) this.refs.list.focus();
  }

  handleKeypress (ch, key) {
    const { servers, onAdd, onEdit, onRemove, onConnect } = this.props;

    switch (key.name) {
    case 'enter': {
      if (onConnect && servers && servers.length) {
        const serverId = this.refs.list.selected;
        onConnect(servers[serverId]);
      }
      break;
    }
    case 'a': {
      if (onAdd) onAdd();
      break;
    }
    case 'e': {
      if (onEdit && servers && servers.length) {
        const serverId = this.refs.list.selected;
        onEdit(servers[serverId]);
      }
      break;
    }
    case 'r': {
      if (onRemove && servers && servers.length) {
        const serverId = this.refs.list.selected;
        onRemove(servers[serverId]);
      }
      break;
    }
    default: return;
    }
  }

  handleSelectItem () {
    const { servers, onSelected } = this.props;
    if (onSelected) {
      const { list } = this.refs;
      onSelected(servers[list.selected]);
    }
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
            onKeypress={::this.handleKeypress}
            {...{ 'onSelect Item': ::this.handleSelectItem } }
      />
    );
  }

}
