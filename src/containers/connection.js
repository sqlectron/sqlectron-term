import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setStatus } from '../actions/status';
import { connectIfNeeded } from '../actions/connections';


class Connection extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,

    children: PropTypes.element.isRequired,

    isConnecting: PropTypes.bool,
    isConnected: PropTypes.bool,
    error: PropTypes.any,
    isSameServer: PropTypes.bool.isRequired,
  };

  componentWillMount () {
    this.handleProps(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handleProps(nextProps);
  }

  handleProps (props) {
    const { dispatch, params, isConnecting, isConnected, error } = props;

    dispatch(connectIfNeeded(params.id, params.database));

    if (error) return dispatch(setStatus(error));
    if (isConnecting) return dispatch(setStatus('Connecting to server...'));
    if (isConnected) return dispatch(setStatus('Connection to server established'));
  }

  render () {
    const { children, isConnected, isSameServer } = this.props;

    if (!isConnected || !isSameServer) return <element hidden />;

    return children;
  }
}


function mapStateToProps (state, props) {
  const { connections } = state;

  const isSameServer =
      connections
      && connections.server
      && connections.server.id === props.params.id
      && connections.database === props.params.database;

  return { ...connections, isSameServer: !!isSameServer };
}

export default connect(mapStateToProps)(Connection);
