import React, { Component } from 'react';
import { connect } from 'react-redux';


class DatabaseQuery extends Component {

  render () {
    return (
      <box left="center" top="center" shrink="true">
        database query
      </box>
    );
  }

}


export default connect()(DatabaseQuery);
