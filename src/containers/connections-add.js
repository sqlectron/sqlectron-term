import React, { Component } from 'react';
import { connect } from 'react-redux';


class Container extends Component {

  render () {
    return (
      <box left="center" top="center" shrink="true">
        add connection screen
      </box>
    );
  }

}


export default connect()(Container);
