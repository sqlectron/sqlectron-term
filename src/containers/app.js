import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Shortcuts from '../widgets/shortcuts';
import Status from '../widgets/status';


class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    status: PropTypes.string,
    shortcuts: PropTypes.array,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  render () {
    const { children, status } = this.props;
    const { theme } = this.context;
    const shortcuts = [
      { key: 'q', label: 'Quit' },
      { key: 'escape', label: 'Back' },
      ...this.props.shortcuts,
    ];
    return (
      <box top={0} left={0} bottom={0} right={0} style={theme.header}>
        <text tags="true" style={theme.header} content=" SQLECTRON" />
        <box top={1} left={0} right={0} bottom={2} style={theme.main}>
          {children}
        </box>
        <Status status={status} />
        <Shortcuts shortcuts={shortcuts} />
      </box>
    );
  }
}


export default connect(
  state => ({
    status: state.status,
    shortcuts: state.shortcuts,
  })
)(App);
