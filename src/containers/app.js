import React, { Component, PropTypes } from 'react';


class App extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render () {
    const { children } = this.props;
    return (
      <box top={0} left={0} width="100%" height="100%">
        {children}
      </box>
    );
  }

}

export default App;
