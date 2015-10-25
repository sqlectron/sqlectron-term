import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadServerList } from '../actions/servers';
import { setStatus } from '../actions/status';

import Shortcuts from './shortcuts';
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
  }

  componentWillReceiveProps (nextProps) {
    this.handleProps(nextProps);
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

  handleEdit () {
    const { servers } = this.props;
    if (!servers.length) return;

    const selected = this.refs.serverList.selected();
    this.context.history.pushState(null, `/server/${selected}/edit`);
  }

  handleRemove () {
    const { servers } = this.props;
    if (!servers.length) return;

    const selected = this.refs.serverList.selected();
    this.context.history.pushState(null, `/server/${selected}/remove`);
  }

  handleConnect () {
    const { servers } = this.props;
    if (!servers.length) return;

    const selected = this.refs.serverList.selected();
    const server = servers[selected];

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
      <Shortcuts items={[
        { key: 'a', label: 'Add new', handler: ::this.handleAdd },
        { key: 'e', label: 'Edit', handler: ::this.handleEdit },
        { key: 'r', label: 'Remove', handler: ::this.handleRemove },
        { key: 'return', label: 'Connect', handler: ::this.handleConnect },
      ]}>
        <ServerList
          ref="serverList"
          servers={servers}
          onSelected={::this.handleSelected}
        />
      </Shortcuts>
    );
  }

}


export default connect(
  state => state.servers
)(ServerListContainer);
