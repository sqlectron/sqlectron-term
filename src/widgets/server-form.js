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

  constructor (props) {
    super(props);

    this.state = { ...props.server || {} };
    this.state = {
      ...this.state,
      ssh: {
        ...this.state.ssh || {},
      },
    };
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

    if (name === 'port' || keys[1] === 'port') value = parseInt(value, 10);

    if (keys.length === 2 && keys[0] === 'ssh') {
      this.setState({
        ...this.state,
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

    return (
      <box border="line"
           label={server ? ' Edit server ' : ' Add server '}
           left={0}
           right={0}
           top={0}
           bottom={0}>
        <form ref="form"
              keys="true"
              mouse="true"
              left={1}
              right={1}
              top={1}
              bottom={1}
              >
          <box border="line" width={36} label="Database Server">
            <box left={1} top={1} right={1} bottom={1}>
              <box left={0} top={0} height={2}>
                <text left={0}
                      content="Name:"
                />
                <textbox left={6}
                         keys="true"
                         mouse="true"
                         ref="name"
                         name="name"
                         inputOnFocus="true"
                         value={server.name || ''}
                         onFocus={this.onFocus.bind(this, 'name')}
                         onBlur={this.onBlur.bind(this, 'name')}
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
                               checked={server.client === 'mysql'}
                               content="MySQL"
                               ref="mysql"
                               onBlur={this.onBlur.bind(this, 'mysql')}
                  />
                  <radiobutton name="client"
                               keys="true"
                               mouse="true"
                               left={18}
                               top={0}
                               checked={server.client === 'postgresql'}
                               content="PostgreSQL"
                               ref="postgresql"
                               onBlur={this.onBlur.bind(this, 'postgresql')}
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
                         inputOnFocus="true"
                         value={ server.port && server.port.toString() || '' }
                         onFocus={this.onFocus.bind(this, 'port')}
                         onBlur={this.onBlur.bind(this, 'port')}
                />
                <text left={13}
                      content="Host:"
                />
                <textbox left={19}
                         keys="true"
                         mouse="true"
                         ref="host"
                         name="host"
                         inputOnFocus="true"
                         value={server.host || ''}
                         onFocus={this.onFocus.bind(this, 'host')}
                         onBlur={this.onBlur.bind(this, 'host')}
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
                         inputOnFocus="true"
                         value={server.socketPath || ''}
                         onFocus={this.onFocus.bind(this, 'socketPath')}
                         onBlur={this.onBlur.bind(this, 'socketPath')}
                />
              </box>
              <box left={0} top={8} height={2}>
                <text left={0}
                      content="User:"
                />
                <textbox left={6}
                         keys="true"
                         mouse="true"
                         ref="user"
                         name="user"
                         inputOnFocus="true"
                         value={server.user || ''}
                         onFocus={this.onFocus.bind(this, 'user')}
                         onBlur={this.onBlur.bind(this, 'user')}
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
                         censor="true"
                         ref="password"
                         name="password"
                         inputOnFocus="true"
                         value={server.password || ''}
                         onFocus={this.onFocus.bind(this, 'password')}
                         onBlur={this.onBlur.bind(this, 'password')}
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
                         inputOnFocus="true"
                         value={server.database || ''}
                         onFocus={this.onFocus.bind(this, 'database')}
                         onBlur={this.onBlur.bind(this, 'database')}
                />
              </box>
            </box>
          </box>
          <box left={36}
               top={0}
               height={14}
               border="line"
               label="SSH Tunnel">
            <box left={1} top={1} right={1} bottom={1}>
              <box left={0} top={0} height={2}>
                <text left={0}
                      content="Port:"
                />
                <textbox left={6}
                         width={6}
                         keys="true"
                         mouse="true"
                         ref="ssh.port"
                         name="ssh.port"
                         inputOnFocus="true"
                         value={server.ssh && server.ssh.port && server.ssh.port.toString() || '22'}
                         onFocus={this.onFocus.bind(this, 'ssh.port')}
                         onBlur={this.onBlur.bind(this, 'ssh.port')}
                />
                <text left={13}
                      content="Host:"
                />
                <textbox left={19}
                         keys="true"
                         mouse="true"
                         ref="ssh.host"
                         name="ssh.host"
                         inputOnFocus="true"
                         value={server && server.ssh && server.ssh.host || ''}
                         onFocus={this.onFocus.bind(this, 'ssh.host')}
                         onBlur={this.onBlur.bind(this, 'ssh.host')}
                />
              </box>
              <box left={0} top={2} height={2}>
                <text left={0}
                      content="User:"
                />
                <textbox left={6}
                         keys="true"
                         mouse="true"
                         ref="ssh.user"
                         name="ssh.user"
                         inputOnFocus="true"
                         value={server && server.ssh && server.ssh.user || ''}
                         onFocus={this.onFocus.bind(this, 'ssh.user')}
                         onBlur={this.onBlur.bind(this, 'ssh.user')}
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
                         censor="*"
                         ref="ssh.password"
                         name="ssh.password"
                         inputOnFocus="true"
                         value={server && server.ssh && server.ssh.password || ''}
                         onFocus={this.onFocus.bind(this, 'ssh.password')}
                         onBlur={this.onBlur.bind(this, 'ssh.password')}
                />
              </box>
              <box left={0} top={6} height={2}>
                <text left={0}
                      content="Private Key:"
                />
                <textbox left={13}
                         keys="true"
                         mouse="true"
                         ref="ssh.privateKey"
                         name="ssh.privateKey"
                         inputOnFocus="true"
                         value={server && server.ssh && server.ssh.privateKey || ''}
                         onFocus={this.onFocus.bind(this, 'ssh.privateKey')}
                         onBlur={this.onBlur.bind(this, 'ssh.privateKey')}
                />
              </box>
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
