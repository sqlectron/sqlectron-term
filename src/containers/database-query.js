import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class DatabaseQuery extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount () {
    const { dispatch } = this.props;
    // if (loading) dispatch(setStatus('Loading list of servers...'));
    // dispatch(setShortcuts([
    //   { key: 'A', label: 'Add new' },
    //   { key: 'E', label: 'Edit' },
    //   { key: 'R', label: 'Remove' },
    //   { key: 'Enter', label: 'Connect' },
    // ]));
    // dispatch(loadServerList());
  }

  render () {
    return (
      <box left="center" top="center" shrink="true">
        database query
      </box>
    );
  }

}


export default connect()(DatabaseQuery);
