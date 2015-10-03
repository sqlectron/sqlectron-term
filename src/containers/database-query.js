import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class DatabaseQuery extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render () {
    return (
      <box left="center" top="center" shrink="true">
        database query
      </box>
    );
  }

}


export default connect()(DatabaseQuery);
