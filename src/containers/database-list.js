import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDatabasesIfNeeded } from '../actions/databases';
import { setStatus, clearStatus } from '../actions/status';

import Shortcuts from './shortcuts';
import DatabaseList from '../widgets/database-list';


class DatabaseListContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    children: PropTypes.node,
    params: PropTypes.object.isRequired,

    isFetching: PropTypes.bool,
    items: PropTypes.array,
    error: PropTypes.any,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillMount () {
    this.props.dispatch(fetchDatabasesIfNeeded());
    this.handleEvents(this.props);
  }

  componentDidMount () {
    this.refs.databaseList.focus();
  }

  componentWillReceiveProps (nextProps) {
    this.handleEvents(nextProps);
  }

  handleEvents ({ error, isFetching }) {
    const { dispatch } = this.props;

    if (error) return dispatch(setStatus(error));
    if (isFetching) return dispatch(setStatus('Loading list of databases...'));

    dispatch(clearStatus());
  }

  handleSelect () {
    const { items, params } = this.props;
    if (!items.length) return;

    const selected = this.refs.databaseList.selected();
    const database = items[selected];

    const route = `/server/${params.id}/database/${database}`;
    this.context.history.pushState(null, route);
  }

  render () {
    const { isFetching, items, error } = this.props;

    const shortcuts = [
      { key: 'return', label: 'Select', handler: ::this.handleSelect },
    ];

    if (error || isFetching) return <element width={0} />;

    return (
      <Shortcuts items={shortcuts}>
        <DatabaseList ref="databaseList" items={items} />
      </Shortcuts>
    );
  }

}


export default connect(
  state => state.databases
)(DatabaseListContainer);
