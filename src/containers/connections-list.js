import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadConnections } from '../actions';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  error: { fg: 'red' },
};


export default class Connections extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    connections: PropTypes.array,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(loadConnections());
    if (this.refs.list) this.refs.list.focus();
  }

  componentDidUpdate () {
    if (this.refs.list) this.refs.list.focus();
  }

  onItemSelected (e, i) {
    if (!i) return this.context.history.pushState(null, '/connections/add');
  }

  render () {
    const { loading, connections, error } = this.props;
    if (error) {
      return (
        <box
          left="center" top="center" shrink="true" style={style.error}>
          failed to retrieve list of connections
        </box>
      );
    }
    if (loading) {
      return (
        <box left="center" top="center" shrink="true">
          loading list of connections...
        </box>
      );
    }

    const items = connections.map(c => c.name).sort();
    items.unshift('Add new connection...');
    return (
      <list
        ref="list"
        style={style.list}
        border={{ type: 'line' }}
        keys="true"
        mouse="true"
        label="Connections list"
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
  state => state.connections
)(Connections);
