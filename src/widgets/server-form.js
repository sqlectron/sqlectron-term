import React, { Component, PropTypes } from 'react';


const style = {
  button: {
    bg: '#00cfd0',
    fg: '#000000',
    focus: {
      fg: '#ffff00',
      bg: '#0000d3',
    },
  },
  header: {
    fg: '#ffff00',
    bg: '#0000d3',
    bold: true,
  },
  shortcut: {
    fg: '#00ffff',
  },
  center: {
    bg: '#e7e7e7',
  },
  status: {
    bg: '#00cfd0',
    fg: '#000000',
  },
};


export default class ServerForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    onFocus: PropTypes.func,
    server: PropTypes.object,
  };

  componentDidMount () {
    if (this.refs.form) this.refs.form.focusNext();
  }

  onFocus (name) {
    if (this.refs[name] && this.refs[name].readInput) {
      this.refs[name].readInput();
    }
    if (this.props.onFocus) this.props.onFocus(name);
  }

  onPress () {
    this.refs.form.submit();
  }

  onSubmit (data) {
    if (this.props.onSubmit) {
      const server = {
        name: data.name,
        database: data.database,
        user: data.username,
        password: data.password,
        host: data.host,
        port: data.port,
        socketPath: data.socketPath,
        ssh: {
          port: data.sshPort,
          host: data.sshHost,
          user: data.sshUsername,
          password: data.sshPassword,
          privateKey: data.sshPrivateKey,
        },
      };

      if (data.client) server.client = data.client[0] ? 'mysql' : 'postgresql';

      this.props.onSubmit(server);
    }
  }

  render () {
    const { server } = this.props;
    return (
      <box border="line"
           label={server ? ' Edit server ' : ' Add server '}
           padding={1}>
        <form ref="form"
              keys="true"
              mouse="true"
              onSubmit={::this.onSubmit}>
          <box border="line" width={36} padding={1} label="Database Server">
            <box left={0} top={0} height={2}>
              <text left={0}
                    content="Name:"
              />
              <textbox left={6}
                       keys="true"
                       mouse="true"
                       ref="name"
                       name="name"
                       value={server && server.name || ''}
                       onFocus={this.onFocus.bind(this, 'name')}
              />
            </box>
            <box left={0} top={2} height={2}>
              <radioset>
                <text left={0}
                      top={0}
                      content="Client:"
                />
                <radiobutton name="client"
                             keys="true"
                             mouse="true"
                             left={8}
                             top={0}
                             checked={server && server.client === 'mysql'}
                             content="MySQL"
                />
                <radiobutton name="client"
                             keys="true"
                             mouse="true"
                             left={18}
                             top={0}
                             checked={server && server.client === 'postgresql'}
                             content="PostgreSQL"
                />
              </radioset>
            </box>
            <box left={0} top={4} height={2}>
              <text left={0}
                    content="Port:"
              />
              <textbox left={6}
                       width={6}
                       keys="true"
                       mouse="true"
                       ref="port"
                       name="port"
                       value={server && server.port + '' || ''}
                       onFocus={this.onFocus.bind(this, 'port')}
              />
              <text left={13}
                    content="Host:"
              />
              <textbox left={19}
                       keys="true"
                       mouse="true"
                       ref="host"
                       name="host"
                       value={server && server.host || ''}
                       onFocus={this.onFocus.bind(this, 'host')}
              />
            </box>
            <box left={0} top={6} height={2}>
              <text left={0}
                    content="Unix Socket:"
              />
              <textbox left={13}
                       keys="true"
                       mouse="true"
                       ref="socketPath"
                       name="socketPath"
                       value={server && server.socketPath || ''}
                       onFocus={this.onFocus.bind(this, 'socketPath')}
              />
            </box>
            <box left={0} top={8} height={2}>
              <text left={0}
                    content="Username:"
              />
              <textbox left={10}
                       keys="true"
                       mouse="true"
                       ref="username"
                       name="username"
                       value={server && server.user || ''}
                       onFocus={this.onFocus.bind(this, 'username')}
              />
            </box>
            <box left={0} top={10} height={2}>
              <text left={0}
                    content="Password:"
              />
              <textbox left={10}
                       keys="true"
                       mouse="true"
                       secret="true"
                       ref="password"
                       name="password"
                       value={server && server.password || ''}
                       onFocus={this.onFocus.bind(this, 'password')}
              />
            </box>
            <box left={0} top={12} height={2}>
              <text left={0}
                    content="Database:"
              />
              <textbox left={10}
                       keys="true"
                       mouse="true"
                       ref="database"
                       name="database"
                       value={server && server.database || ''}
                       onFocus={this.onFocus.bind(this, 'database')}
              />
            </box>
          </box>
          <box left={36}
               top={0}
               height={14}
               padding={1}
               border="line"
               label="SSH Tunnel">
            <box left={0} top={0} height={2}>
              <text left={0}
                    content="Port:"
              />
              <textbox left={6}
                       width={6}
                       keys="true"
                       mouse="true"
                       ref="sshPort"
                       name="sshPort"
                       value={server && server.ssh && server.ssh.port + '' || ''}
                       onFocus={this.onFocus.bind(this, 'sshPort')}
              />
              <text left={13}
                    content="Host:"
              />
              <textbox left={19}
                       keys="true"
                       mouse="true"
                       ref="sshHost"
                       name="sshHost"
                       value={server && server.ssh && server.ssh.host || ''}
                       onFocus={this.onFocus.bind(this, 'sshHost')}
              />
            </box>
            <box left={0} top={2} height={2}>
              <text left={0}
                    content="Username:"
              />
              <textbox left={10}
                       keys="true"
                       mouse="true"
                       ref="sshUsername"
                       name="sshUsername"
                       value={server && server.ssh && server.ssh.user || ''}
                       onFocus={this.onFocus.bind(this, 'sshUsername')}
              />
            </box>
            <box left={0} top={4} height={2}>
              <text left={0}
                    content="Password:"
              />
              <textbox left={10}
                       keys="true"
                       mouse="true"
                       secret="true"
                       ref="sshPassword"
                       name="sshPassword"
                       value={server && server.ssh && server.ssh.password || ''}
                       onFocus={this.onFocus.bind(this, 'sshPassword')}
              />
            </box>
            <box left={0} top={6} height={2}>
              <text left={0}
                    content="Private Key:"
              />
              <textbox left={13}
                       keys="true"
                       mouse="true"
                       ref="sshPrivateKey"
                       name="sshPrivateKey"
                       value={server && server.ssh && server.ssh.privateKey || ''}
                       onFocus={this.onFocus.bind(this, 'sshPrivateKey')}
              />
            </box>
          </box>
          <box left={36}
               top={14}
               border="line">
            <button height={1}
                    width={8}
                    left={1}
                    keys="true"
                    mouse="true"
                    style={style.button}
                    onPress={::this.onPress}
                    content=" Submit "
            />
          </box>
        </form>
      </box>
    );
  }

}
