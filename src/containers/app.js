import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Shortcuts from '../widgets/shortcuts';
import Status from '../widgets/status';


const style = {
  header: {
    fg: '#ffff00',
    bg: '#0000d3',
    bold: true,
  },
  center: {
    bg: '#e7e7e7',
  },
};


class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    status: PropTypes.string,
    shortcuts: PropTypes.array,
  };

  render () {
    const { children, status } = this.props;
    const shortcuts = [
      { key: 'Q', label: 'Quit' },
      { key: 'Escape', label: 'Back' },
      ...this.props.shortcuts,
    ];
    return (
      <box top={0} left={0} bottom={0} right={0} style={style.header}>
        <text tags="true" style={style.header} content=" SQLectron" />
        <box top={1} left={0} right={0} bottom={2} style={style.center}>
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
