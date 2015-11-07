import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash';


export default class ServerForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    onFocus: PropTypes.func,
    server: PropTypes.object,
    error: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = { server: props.server };
  }

  componentDidMount () {
    this.refs.form.focusNext();

    this.refs.mysql.uncheck();
    this.refs.postgresql.uncheck();
    if (this.state.server && this.state.server.client) {
      this.refs[this.state.server.client].check();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.server !== nextProps.server) {
      this.setState({ server: nextProps.server });
    }
  }

  componentDidUpdate () {
    this.refs.mysql.uncheck();
    this.refs.postgresql.uncheck();
    if (this.state.server && this.state.server.client) {
      this.refs[this.state.server.client].check();
    }
  }

  onFocus (name) {
    if (this.props.onFocus) this.props.onFocus(name);
  }

  handleSubmit (data) {
    const server = {};

    const clients = [ 'mysql', 'postgresql' ];
    Object.keys(data)
      .filter(key => data[key]) // ignore falsy
      .filter(key => key.split('ssh.').length === 1) // ignore ssh
      .forEach(key => {
        if (clients.includes(key)) return;
        server[key] = data[key];
      });

    server.client = clients.find(client => data[client]);

    if (this.props.server && this.props.server.id) {
      server.id = this.props.server.id;
    }

    Object.keys(data)
      .filter(key => data[key]) // ignore falsy
      .map(key => key.split('ssh.'))
      .filter(keys => keys.length > 1)
      .map(keys => keys[1])
      .forEach(key => {
        server.ssh = server.ssh || {};
        server.ssh = { ...server.ssh, [key]: data[`ssh.${key}`] };
      });

    if (this.props.onSubmit) this.props.onSubmit(server);

    this.refs.form.focusNext();
  }

  handleButtonSubmit () {
    this.refs.form.submit();
  }

  handleKeypress (ch, key) {
    if (key.full === 'escape' && this.props.onCancel) this.props.onCancel();
  }

  render () {
    const { server } = this.state;
    const { theme } = this.context;

    const styles = merge({}, theme.box.normal, theme.box.focus);

    return (
      <box
        border="line"
        label={server && server.id ? ' Edit server ' : ' Add server '}
        style={styles}
        position={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <form
          keys
          ref="form"
          onSubmit={::this.handleSubmit}
          style={styles}
          position={{ left: 1, right: 1, top: 1, bottom: 1 }}
        >
          <box border="line" width={36} label=" Database Server " style={styles}>
            <box position={{ left: 1, top: 1, right: 1, bottom: 1 }} style={styles}>
              <box position={{ left: 0, top: 0, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Name:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 6, height: 1 }}
                  ref="name"
                  name="name"
                  value={server && server.name || ''}
                  onFocus={this.onFocus.bind(this, 'name')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
              <box position={{ left: 0, top: 2, height: 2 }} style={styles}>
                <radioset style={styles}>
                  <text
                    position={{ left: 0, top: 0 }}
                    content="Client:"
                    style={styles}
                  />
                  <radiobutton
                    keys
                    name="mysql"
                    position={{ left: 8, top: 0 }}
                    style={styles}
                    value={server && server.client === 'mysql'}
                    content="MySQL"
                    ref="mysql"
                    onKeypress={::this.handleKeypress}
                  />
                  <radiobutton
                    keys
                    name="postgresql"
                    position={{ left: 18, top: 0 }}
                    style={styles}
                    value={server && server.client === 'postgresql'}
                    content="PostgreSQL"
                    ref="postgresql"
                    onKeypress={::this.handleKeypress}
                  />
                </radioset>
              </box>
              <box position={{ left: 0, top: 4, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Port:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 6, width: 6, height: 1}}
                  ref="port"
                  name="port"
                  value={ server && server.port && server.port.toString() || '' }
                  onFocus={this.onFocus.bind(this, 'port')}
                  onKeypress={::this.handleKeypress}
                />
                <text
                  position={{ left: 13 }}
                  content="Host:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 19, height: 1 }}
                  ref="host"
                  name="host"
                  value={server && server.host || ''}
                  onFocus={this.onFocus.bind(this, 'host')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
              <box position={{ left: 0, top: 6, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Unix Socket:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 13, height: 1 }}
                  ref="socketPath"
                  name="socketPath"
                  value={server && server.socketPath || ''}
                  onFocus={this.onFocus.bind(this, 'socketPath')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
              <box position={{ left: 0, top: 8, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="User:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 6, height: 1 }}
                  ref="user"
                  name="user"
                  value={server && server.user || ''}
                  onFocus={this.onFocus.bind(this, 'user')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
              <box position={{ left: 0, top: 10, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Password:"
                  style={styles}
                />
                <textbox
                  censor keys inputOnFocus
                  position={{ left: 10, height: 1 }}
                  ref="password"
                  name="password"
                  value={server && server.password || ''}
                  onFocus={this.onFocus.bind(this, 'password')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
              <box position={{ left: 0, top: 12, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Database:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 10, height: 1 }}
                  ref="database"
                  name="database"
                  value={server && server.database || ''}
                  onFocus={this.onFocus.bind(this, 'database')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
            </box>
          </box>
          <box
            position={{ left: 36, top: 0, height: 14 }}
            border="line"
            style={styles}
            label=" SSH Tunnel ">
            <box position={{ left: 1, top: 1, right: 1, bottom: 1 }} style={styles}>
              <box position={{ left: 0, top: 0, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Port:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 6, width: 6, height: 1 }}
                  ref="ssh.port"
                  name="ssh.port"
                  value={server && server.ssh && server.ssh.port && server.ssh.port.toString() || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.port')}
                  onKeypress={::this.handleKeypress}
                />
                <text
                  position={{ left: 13 }}
                  content="Host:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 19, height: 1 }}
                  ref="ssh.host"
                  name="ssh.host"
                  value={server && server.ssh && server.ssh.host || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.host')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
              <box position={{ left: 0, top: 2, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="User:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 6, height: 1 }}
                  ref="ssh.user"
                  name="ssh.user"
                  value={server && server.ssh && server.ssh.user || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.user')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
              <box position={{ left: 0, top: 4, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Password:"
                  style={styles}
                />
                <textbox
                  keys censor inputOnFocus
                  position={{ left: 10, height: 1 }}
                  ref="ssh.password"
                  name="ssh.password"
                  value={server && server.ssh && server.ssh.password || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.password')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
              <box position={{ left: 0, top: 6, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Private Key:"
                  style={styles}
                />
                <textbox
                  keys inputOnFocus
                  position={{ left: 13, height: 1 }}
                  ref="ssh.privateKey"
                  name="ssh.privateKey"
                  value={server && server.ssh && server.ssh.privateKey || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.privateKey')}
                  onKeypress={::this.handleKeypress}
                />
              </box>
            </box>
          </box>
          <box
            position={{ left: 36, top: 14 }}
            style={styles}
            border="line">
            <button
              keys
              position={{ left: 1, height: 1, width: 8 }}
              style={theme.button}
              onPress={::this.handleButtonSubmit}
              content=" Submit "
              onKeypress={::this.handleKeypress}
            />
          </box>
        </form>
      </box>
    );
  }

}
