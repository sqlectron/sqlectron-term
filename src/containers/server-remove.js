import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeServer } from '../actions/servers';
import { setStatus } from '../actions/status';


class ServerRemove extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    servers: PropTypes.array.isRequired,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillMount () {
    const id = parseInt(this.props.params.id, 10);
    const server = this.props.servers[id];
    this.props.dispatch(
      setStatus(`Server "${server.client} - ${server.name}" will be removed`)
    );
  }

  onPress (choice) {
    if (choice === 'yes') {
      const id = parseInt(this.props.params.id, 10);
      this.props.dispatch(removeServer(id));
    }
    this.context.history.goBack();
  }

  render () {
    const { servers, params } = this.props;
    const server = servers[parseInt(params.id, 10)];
    return (
      <box shrink shadow left="center" top="center" height={8} border="line">
        <text
              top={1}
              height={2}
              content={` Are you sure you want to remove server [${server.client} - ${server.name}]? `}
        />
        <box left="center" bottom={1} height={1} width={10}>
          <button
            shrink mouse keys
            left={0}
            bottom={0}
            content=" Yes "
            onPress={this.onPress.bind(this, 'yes')}
          />
          <button
            shrink mouse keys
            left={6}
            bottom={0}
            content=" No "
            onPress={this.onPress.bind(this, 'no')}
          />
        </box>
      </box>
    );
  }

}


export default connect(
  state => state.servers
)(ServerRemove);
