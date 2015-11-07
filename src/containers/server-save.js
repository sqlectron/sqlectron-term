import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { prepareSaveServer, saveServer } from '../actions/servers';
import { setStatus } from '../actions/status';

import ServerForm from '../widgets/server-form';


class ServerSave extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    params: PropTypes.object.isRequired,
    servers: PropTypes.object.isRequired,
    saveServer: PropTypes.object.isRequired,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillMount () {
    this.handleProps(null, this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handleProps(this.props, nextProps);
  }

  async handleSubmit (server) {
    await this.props.dispatch(saveServer(server));
  }

  handleCancel () {
    this.context.history.goBack();
  }

  handleProps (prevProps, nextProps) {
    const saveSuccess = prevProps
      && prevProps.saveServer.isSaving
      && !nextProps.saveServer.isSaving
      && !nextProps.saveServer.error;

    if (saveSuccess) {
      this.context.history.goBack();
      return;
    }

    const shouldPrepare = !prevProps
      || prevProps.params.id !== nextProps.params.id;
    if (shouldPrepare) {
      const server = nextProps.params.id
        ? nextProps.servers.items.find(item => item.id === nextProps.params.id)
        : null;
      nextProps.dispatch(prepareSaveServer(server));
    }

    const editMode = nextProps.params.id ? true : false;

    if (nextProps.saveServer.error) {
      nextProps.dispatch(setStatus('Failed to save server'));
      return;
    }
    if (nextProps.saveServer.isSaving) {
      nextProps.dispatch(setStatus('Saving server...'));
      return;
    }
    nextProps.dispatch(setStatus(`${editMode ? 'Edit' : 'Add'} server information`));
  }

  render () {
    const { saveServer: { server, error } } = this.props;

    return (
      <box shadow position={{ left: 'center', top: 'center', height: 21, width: 80 }}>
        <ServerForm
          server={server}
          error={error}
          onSubmit={::this.handleSubmit}
          onCancel={::this.handleCancel}
        />
      </box>
    );
  }

}


export default connect(
  state => ({
    servers: state.servers,
    saveServer: state.saveServer,
  })
)(ServerSave);
