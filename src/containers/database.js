import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTablesIfNeeded, executeQueryIfNeeded } from '../actions/db';
import { setStatus, clearStatus } from '../actions/status';

import Shortcuts from './shortcuts';
import TableList from '../widgets/table-list';
import QueryArea from '../widgets/query-area';
import QueryResults from '../widgets/query-results';


class Database extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    tables: PropTypes.any,
    query: PropTypes.any,
  };

  componentWillMount () {
    this.props.dispatch(fetchTablesIfNeeded());
    this.handleEvents(this.props);
  }

  componentDidMount () {
    this.refs.tableList.focus();
  }

  componentWillReceiveProps (nextProps) {
    this.handleEvents(nextProps);
  }

  handleEvents ({ tables, query }) {
    const { dispatch } = this.props;

    if (tables.error) return dispatch(setStatus(tables.error));
    if (tables.isFetching) return dispatch(setStatus('Loading list of tables...'));
    if (query.isExecuting) return dispatch(setStatus('Executing query...'));
    if (query.error) return dispatch(setStatus(query.error));

    dispatch(clearStatus());
  }

  handleExecuteQuery (query) {
    this.props.dispatch(executeQueryIfNeeded(query));
  }

  handleExecuteTable (table) {
    const query = `select * from "${table}" limit 1000`;
    this.props.dispatch(executeQueryIfNeeded(query));
  }

  render () {
    const { tables, query } = this.props;

    const tableListShortcuts = [ { key: 'Enter', label: 'Select' } ];
    const queryAreaShortcuts = [
      { key: 'C-c', label: 'Clear' },
      { key: 'C-e', label: 'Editor' },
      { key: 'C-x', label: 'Execute' },
    ];
    const queryResultsShortcuts = [ { key: 'C-e', label: 'Editor' } ];

    return (
      <box top={1} left={1} bottom={2} right={3} shadow="true">
        <box left={0} top={0} bottom={0} width={30}>
          <Shortcuts items={tableListShortcuts}>
            <TableList
              ref="tableList"
              items={tables.items}
              onExecute={::this.handleExecuteTable}
            />
          </Shortcuts>
        </box>
        <box left={30} top={0} right={0} height={5}>
          <Shortcuts items={queryAreaShortcuts}>
            <QueryArea ref="queryArea" query={query.query} onExecute={::this.handleExecuteQuery} />
          </Shortcuts>
        </box>
        <box left={30} top={5} bottom={0} right={0}>
          <Shortcuts items={queryResultsShortcuts}>
            <QueryResults ref="queryResults" result={query.result} />
          </Shortcuts>
        </box>
      </box>
    );
  }

}


function mapStateToProps (state) {
  return {
    tables: state.tables,
    query: state.query,
  };
}

export default connect(mapStateToProps)(Database);
