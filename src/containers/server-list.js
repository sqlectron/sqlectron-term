import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadServerList } from '../actions/servers';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  error: { fg: 'red' },
};


class ServerList extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    servers: PropTypes.array,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(loadServerList());
    if (this.refs.list) this.refs.list.focus();
  }

  componentDidUpdate () {
    if (this.refs.list) this.refs.list.focus();
  }

  onItemSelected (e, i) {
    if (!i) return this.context.history.pushState(null, '/server/add');
  }

  render () {
    const { loading, servers, error } = this.props;
    if (error) {
      return (
        <box
          left="center" top="center" shrink="true" style={style.error}>
          failed to retrieve list of servers
        </box>
      );
    }
    if (loading) {
      return (
        <box left="center" top="center" shrink="true">
          loading list of servers...
        </box>
      );
    }

    const items = servers.map(c => c.name).sort();
    items.unshift('Add new server...');
    return (
      <list
        ref="list"
        style={style.list}
        border={{ type: 'line' }}
        keys="true"
        mouse="true"
        label="Server list"
        scrollbar={{
          ch: ' ',
          track: { bg: 'cyan' },
          style: { inverse: true },
        }}
        items={items}
        onSelect={::this.onItemSelected}
      />
    );
  }

}


export default connect(
  state => state.servers
)(ServerList);
