import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadServerList } from '../actions/servers';
import { setStatus, clearStatus } from '../actions/status';
import { setShortcuts, clearShortcuts } from '../actions/shortcuts';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  error: { fg: 'red' },
};


class ServerList extends Component {

  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    servers: PropTypes.array,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillMount () {
    const { dispatch, loading } = this.props;
    if (loading) dispatch(setStatus('Loading list of servers...'));
    dispatch(setShortcuts([
      { key: 'A', label: 'Add new' },
      { key: 'E', label: 'Edit' },
      { key: 'R', label: 'Remove' },
      { key: 'Enter', label: 'Connect' },
    ]));
    dispatch(loadServerList());
  }

  componentWillReceiveProps ({ error, loading, servers }) {
    const { dispatch } = this.props;
    if (error) dispatch(setStatus(error));
    if (loading) dispatch(setStatus('Loading list of servers...'));
    if (servers) {
      const [ server ] = servers;
      dispatch(setStatus(server
        ? `${server.client} server at ${server.host}:${server.port}`
        : 'No servers found.'
      ));
    }
  }

  componentDidUpdate () {
    if (this.refs.list) this.refs.list.focus();
  }

  componentWillUnmount () {
    const { dispatch } = this.props;
    dispatch(clearShortcuts());
    dispatch(clearStatus());
  }

  onKeypress (ch, key) {
    const { history } = this.context;
    const { servers } = this.props;

    switch (key.name) {
    case 'enter': {
      if (!servers || !servers.length) return;
      const serverId = this.refs.list.selected;
      const server = servers[serverId];
      const route = `/server/${serverId}/database/${server.database}/query`;
      history.pushState(null, route);
      break;
    }
    case 'a': {
      history.pushState(null, '/server/add');
      break;
    }
    case 'e': {
      if (!servers || !servers.length) return;
      const serverId = this.refs.list.selected;
      history.pushState(null, `/server/${serverId}/edit`);
      break;
    }
    default: return;
    }
  }

  onSelectItem () {
    const server = this.props.servers[this.refs.list.selected];
    const host = server.host
      ? `${server.host}:${server.port}`
      : server.socketPath;
    this.props.dispatch(
      setStatus(`${server.client} server at ${host}`)
    );
  }

  render () {
    const { loading, servers, error } = this.props;
    if (error || loading) return <element width={0} />;

    const items = servers.map(c => c.name);
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
            onKeypress={::this.onKeypress}
            {...{ 'onSelect Item': ::this.onSelectItem } }
      />
    );
  }

}


export default connect(
  state => state.servers
)(ServerList);
