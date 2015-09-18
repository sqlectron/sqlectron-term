import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


const style = {
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


class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    status: PropTypes.string,
  };

  render () {
    const { children, status } = this.props;

    return (
      <box top={0} left={0} bottom={0} right={0} style={style.header}>
        <text tags="true" style={style.header} content=" SQLectron" />
        <box top={1} left={0} right={0} bottom={status ? 2 : 1} style={style.center}>
          {children}
        </box>
        { status && <text right={0} bottom={1} left={0} style={style.status} content={' ' + status}/> }
        <text tags="true" bottom={0} style={style.header}>
          {` {${style.shortcut.fg}-fg}Q{/}-Quit`}
        </text>
      </box>
    );
  }

}


export default connect(
  state => state.app
)(App);
