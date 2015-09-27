import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setStatus, clearStatus } from '../actions/status';


class Session extends Component {

  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount () {
    this.handleEvents(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handleEvents(nextProps);
  }

  componentWillUnmount () {
    this.props.dispatch(clearStatus());
  }

  handleEvents ({ tunnel, server }) {
    const { dispatch } = this.props;

    if (tunnel.error) dispatch(setStatus(error));
    if (tunnel.connecting) dispatch(setStatus('Connecting to SSH Tunnel...'));
    if (tunnel.connected) dispatch(setStatus('Connection to SSH Tunnel established'));

    if (server.error) dispatch(setStatus(error));
    if (server.connecting) dispatch(setStatus('Connecting to server...'));
    if (server.connected) dispatch(setStatus('Connection to server established'));
  }

  render () {
    const { children } = this.props;
    return (
      <box top={1} left={1} right={1} bottom={1}>
        {children}
      </box>
    );
  }

}


export default connect(
  state => state.session,
)(Session);
