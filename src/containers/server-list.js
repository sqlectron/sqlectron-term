import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadServerList } from '../actions/servers';
import { setStatus, clearStatus } from '../actions/status';


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
        : 'No servers found, add a new one.'
      ));
    }
  }

  componentDidUpdate () {
    this.refs.list.focus();
  }

  componentWillUnmount () {
    this.props.dispatch(clearStatus());
  }

  onItemSelected (e, i) {
    // if (i === 0) return this.context.history.pushState(null, '/server/add');
  }

  onSelectItem () {
    const server = this.props.servers[this.refs.list.selected];
    this.props.dispatch(
      setStatus(`${server.client} server at ${server.host}:${server.port}`)
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
            onSelect={::this.onItemSelected}
            {...{ 'onSelect Item': ::this.onSelectItem } }
      />
    );
  }

}


export default connect(
  state => state.servers
)(ServerList);
