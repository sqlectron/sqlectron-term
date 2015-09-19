import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class Database extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render () {
    const { children } = this.props;
    return (
      <box left="center" top="center" shrink="true">
        database info
        {children}
      </box>
    );
  }

}


export default connect()(Database);
