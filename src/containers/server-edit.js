import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateServer } from '../actions/servers';
import { setStatus } from '../actions/status';

import ServerForm from '../widgets/server-form';


class ServerEdit extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    servers: PropTypes.object.isRequired,
    update: PropTypes.object.isRequired,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillMount () {
    this.props.dispatch(setStatus('Edit server information'));
  }

  componentWillReceiveProps ({ update }) {
    const { dispatch } = this.props;
    if (update.error) return dispatch(setStatus(update.error));
    if (update.loading) return dispatch(setStatus('Adding server...'));
  }

  async onSubmit (server) {
    const id = this.props.params.id;
    await this.props.dispatch(updateServer(id, server));
    if (!this.props.update.error) this.context.history.goBack();
  }

  render () {
    const { servers, params } = this.props;
    const server = servers.servers[parseInt(params.id, 10)];
    return (
      <box left="center" top="center" height={21} width={80} shadow="true">
        <ServerForm server={server} onSubmit={::this.onSubmit} />
      </box>
    );
  }

}


export default connect(
  state => ({
    servers: state.servers,
    update: state.updateServer,
  })
)(ServerEdit);
