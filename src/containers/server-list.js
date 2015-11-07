import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchServersIfNeeded } from '../actions/servers';
import { setStatus } from '../actions/status';

import Shortcuts from './shortcuts';
import ServerList from '../widgets/server-list';


class ServerListContainer extends Component {

  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,

    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.any,
    items: PropTypes.array,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillMount () {
    this.handleProps(this.props);
  }

  componentDidMount () {
    this.handleProps(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handleProps(nextProps);
  }

  handleProps (props) {
    const { dispatch, error, isFetching, items } = props;

    dispatch(fetchServersIfNeeded());

    if (error) dispatch(setStatus(error));
    if (isFetching) dispatch(setStatus('Loading list of servers...'));
    if (items) {
      const [ server ] = items;
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
    const { items } = this.props;
    if (!items.length) return;

    const selected = this.refs.serverList.selected();
    this.context.history.pushState(null, `/server/${items[selected].id}/edit`);
  }

  handleRemove () {
    const { items } = this.props;
    if (!items.length) return;

    const selected = this.refs.serverList.selected();
    this.context.history.pushState(null, `/server/${items[selected].id}/remove`);
  }

  handleConnect () {
    const { items } = this.props;
    if (!items.length) return;

    const selected = this.refs.serverList.selected();
    const server = items[selected];

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
    const { isFetching, items, error } = this.props;

    if (error || isFetching) return <element hidden />;

    return (
      <Shortcuts items={[
        { key: 'a', label: 'Add new', handler: ::this.handleAdd },
        { key: 'e', label: 'Edit', handler: ::this.handleEdit },
        { key: 'r', label: 'Remove', handler: ::this.handleRemove },
        { key: 'return', label: 'Connect', handler: ::this.handleConnect },
      ]}>
        <ServerList
          ref="serverList"
          servers={items}
          onSelected={::this.handleSelected}
        />
      </Shortcuts>
    );
  }

}


export default connect(
  state => state.servers
)(ServerListContainer);
