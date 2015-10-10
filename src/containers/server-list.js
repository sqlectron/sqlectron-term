import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadServerList } from '../actions/servers';
import { setStatus } from '../actions/status';
import { setShortcuts, clearShortcuts } from '../actions/shortcuts';

import ServerList from '../widgets/server-list';


class ServerListContainer extends Component {

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
    this.props.dispatch(loadServerList());
  }

  componentDidMount () {
    this.handleProps(this.props);

    this.props.dispatch(setShortcuts([
      { key: 'A', label: 'Add new' },
      { key: 'E', label: 'Edit' },
      { key: 'R', label: 'Remove' },
      { key: 'Enter', label: 'Connect' },
    ]));
  }

  componentWillReceiveProps (nextProps) {
    this.handleProps(nextProps);
  }

  componentWillUnmount () {
    const { dispatch } = this.props;
    dispatch(clearShortcuts());
  }

  handleProps (props) {
    const { dispatch, error, loading, servers } = props;
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

  handleAdd () {
    this.context.history.pushState(null, '/server/add');
  }

  handleEdit (server) {
    this.context.history.pushState(null, `/server/${server.id}/edit`);
  }

  handleRemove (server) {
    this.context.history.pushState(null, `/server/${server.id}/remove`);
  }

  handleConnect (server) {
    const route = `/server/${server.id}/database/${server.database}`;
    this.context.history.pushState(null, route);
  }

  handleSelected (server) {
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

    return (
      <ServerList
        servers={servers}
        onAdd={::this.handleAdd}
        onEdit={::this.handleEdit}
        onRemove={::this.handleRemove}
        onConnect={::this.handleConnect}
        onSelected={::this.handleSelected}
      />
    );
  }

}


export default connect(
  state => state.servers
)(ServerListContainer);
