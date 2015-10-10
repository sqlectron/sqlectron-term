import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setStatus } from '../actions/status';
import { connect as connectDatabase } from '../actions/db';


class Connection extends Component {

  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    connected: PropTypes.bool,
    connecting: PropTypes.bool,
    error: PropTypes.any,
    isSameServer: PropTypes.bool.isRequired,
  };

  componentWillMount () {
    const { dispatch, params, isSameServer, error } = this.props;
    if (error || !isSameServer) dispatch(connectDatabase(params.id, params.database));
    this.handleProps(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handleProps(nextProps);
  }

  handleProps (props) {
    const { dispatch, connected, connecting, error } = props;

    if (error) dispatch(setStatus(error));
    if (connecting) dispatch(setStatus('Connecting to server...'));
    if (connected) dispatch(setStatus('Connection to server established'));
  }

  render () {
    const { children, connected, isSameServer } = this.props;

    if (!connected || !isSameServer) return <element width={0} />;

    return (
      <box top={1} left={1} right={1} bottom={1}>
        { children }
      </box>
    );
  }

}


function mapStateToProps (state, props) {
  const { connection } = state;

  const isSameServer =
    connection
    && connection.server
    && parseInt(props.params.id, 10) === connection.server.id
    && props.params.database === connection.database;

  return { ...connection, isSameServer: !!isSameServer };
}

export default connect(mapStateToProps)(Connection);
