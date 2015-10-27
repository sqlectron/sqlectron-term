import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash';


export default class ServerForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    onFocus: PropTypes.func,
    server: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = merge({ ssh: {} }, props.server);
  }

  componentDidMount () {
    if (this.refs.form) this.refs.form.focusNext();
  }

  onFocus (name) {
    if (this.props.onFocus) this.props.onFocus(name);
  }

  onBlur (name) {
    if (name === 'mysql' || name === 'postgresql') {
      if (this.refs[name].checked) this.setState({ client: name });
      return;
    }

    let value = this.refs[name].value;

    const keys = name.split('.');

    if (name === 'port' || keys[1] === 'port') value = parseInt(value, 10) || '';

    if (keys.length === 2 && keys[0] === 'ssh') {
      this.setState({
        ssh: {
          ...this.state.ssh,
          [keys[1]]: value,
        },
      });
      return;
    }

    this.setState({ [name]: value });
  }

  onPress () {
    if (this.props.onSubmit) this.props.onSubmit(this.state);
    this.refs.form.focusNext();
  }

  render () {
    const server = this.state;
    const { theme } = this.context;

    const styles = merge({}, theme.box.normal, theme.box.focus);
    return (
      <box
        border="line"
        label={server ? ' Edit server ' : ' Add server '}
        style={styles}
        position={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <form
          keys
          ref="form"
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
                  keys mouse inputOnFocus
                  position={{ left: 6, height: 1 }}
                  ref="name"
                  name="name"
                  value={server.name || ''}
                  onFocus={this.onFocus.bind(this, 'name')}
                  onBlur={this.onBlur.bind(this, 'name')}
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
                    keys mouse
                    name="client"
                    position={{ left: 8, top: 0 }}
                    style={styles}
                    checked={server.client === 'mysql'}
                    content="MySQL"
                    ref="mysql"
                    onBlur={this.onBlur.bind(this, 'mysql')}
                  />
                  <radiobutton
                    keys mouse
                    name="client"
                    position={{ left: 18, top: 0 }}
                    style={styles}
                    checked={server.client === 'postgresql'}
                    content="PostgreSQL"
                    ref="postgresql"
                    onBlur={this.onBlur.bind(this, 'postgresql')}
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
                  keys mouse inputOnFocus
                  position={{ left: 6, width: 6, height: 1}}
                  ref="port"
                  name="port"
                  value={ server.port && server.port.toString() || '' }
                  onFocus={this.onFocus.bind(this, 'port')}
                  onBlur={this.onBlur.bind(this, 'port')}
                />
                <text
                  position={{ left: 13 }}
                  content="Host:"
                  style={styles}
                />
                <textbox
                  keys mouse inputOnFocus
                  position={{ left: 19, height: 1 }}
                  ref="host"
                  name="host"
                  value={server.host || ''}
                  onFocus={this.onFocus.bind(this, 'host')}
                  onBlur={this.onBlur.bind(this, 'host')}
                />
              </box>
              <box position={{ left: 0, top: 6, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Unix Socket:"
                  style={styles}
                />
                <textbox
                  keys mouse inputOnFocus
                  position={{ left: 13, height: 1 }}
                  ref="socketPath"
                  name="socketPath"
                  value={server.socketPath || ''}
                  onFocus={this.onFocus.bind(this, 'socketPath')}
                  onBlur={this.onBlur.bind(this, 'socketPath')}
                />
              </box>
              <box position={{ left: 0, top: 8, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="User:"
                  style={styles}
                />
                <textbox
                  keys mouse inputOnFocus
                  position={{ left: 6, height: 1 }}
                  ref="user"
                  name="user"
                  value={server.user || ''}
                  onFocus={this.onFocus.bind(this, 'user')}
                  onBlur={this.onBlur.bind(this, 'user')}
                />
              </box>
              <box position={{ left: 0, top: 10, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Password:"
                  style={styles}
                />
                <textbox
                  censor keys mouse inputOnFocus
                  position={{ left: 10, height: 1 }}
                  ref="password"
                  name="password"
                  value={server.password || ''}
                  onFocus={this.onFocus.bind(this, 'password')}
                  onBlur={this.onBlur.bind(this, 'password')}
                />
              </box>
              <box position={{ left: 0, top: 12, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Database:"
                  style={styles}
                />
                <textbox
                  keys mouse inputOnFocus
                  position={{ left: 10, height: 1 }}
                  ref="database"
                  name="database"
                  value={server.database || ''}
                  onFocus={this.onFocus.bind(this, 'database')}
                  onBlur={this.onBlur.bind(this, 'database')}
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
                  keys mouse inputOnFocus
                  position={{ left: 6, width: 6, height: 1 }}
                  ref="ssh.port"
                  name="ssh.port"
                  value={server.ssh && server.ssh.port && server.ssh.port.toString() || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.port')}
                  onBlur={this.onBlur.bind(this, 'ssh.port')}
                />
                <text
                  position={{ left: 13 }}
                  content="Host:"
                  style={styles}
                />
                <textbox
                  keys mouse inputOnFocus
                  position={{ left: 19, height: 1 }}
                  ref="ssh.host"
                  name="ssh.host"
                  value={server && server.ssh && server.ssh.host || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.host')}
                  onBlur={this.onBlur.bind(this, 'ssh.host')}
                />
              </box>
              <box position={{ left: 0, top: 2, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="User:"
                  style={styles}
                />
                <textbox
                  keys mouse inputOnFocus
                  position={{ left: 6, height: 1 }}
                  ref="ssh.user"
                  name="ssh.user"
                  value={server && server.ssh && server.ssh.user || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.user')}
                  onBlur={this.onBlur.bind(this, 'ssh.user')}
                />
              </box>
              <box position={{ left: 0, top: 4, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Password:"
                  style={styles}
                />
                <textbox
                  keys mouse censor inputOnFocus
                  position={{ left: 10, height: 1 }}
                  ref="ssh.password"
                  name="ssh.password"
                  value={server && server.ssh && server.ssh.password || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.password')}
                  onBlur={this.onBlur.bind(this, 'ssh.password')}
                />
              </box>
              <box position={{ left: 0, top: 6, height: 2 }} style={styles}>
                <text
                  position={{ left: 0 }}
                  content="Private Key:"
                  style={styles}
                />
                <textbox
                  keys mouse inputOnFocus
                  position={{ left: 13, height: 1 }}
                  ref="ssh.privateKey"
                  name="ssh.privateKey"
                  value={server && server.ssh && server.ssh.privateKey || ''}
                  onFocus={this.onFocus.bind(this, 'ssh.privateKey')}
                  onBlur={this.onBlur.bind(this, 'ssh.privateKey')}
                />
              </box>
            </box>
          </box>
          <box
            position={{ left: 36, top: 14 }}
            style={styles}
            border="line">
            <button
              keys mouse
              position={{ left: 1, height: 1, width: 8 }}
              style={theme.button}
              onPress={::this.onPress}
              content=" Submit "
            />
          </box>
        </form>
      </box>
    );
  }

}
