import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTablesIfNeeded } from '../actions/tables';
import { executeQueryIfNeeded } from '../actions/queries';
import { setStatus, clearStatus } from '../actions/status';

import Shortcuts from './shortcuts';
import TableList from '../widgets/table-list';
import Textarea from '../widgets/textarea';
import QueryResults from '../widgets/query-results';


class Database extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    params: PropTypes.object.isRequired,

    connections: PropTypes.any,
    tables: PropTypes.any,
    query: PropTypes.any,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
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

  componentDidUpdate () {
    this.refs.tableList.focus();
  }

  handleEvents ({ tables, query }) {
    const { dispatch } = this.props;

    if (tables.error) return dispatch(setStatus(tables.error));
    if (tables.isFetching) return dispatch(setStatus('Loading list of tables...'));
    if (query.isExecuting) return dispatch(setStatus('Executing query...'));
    if (query.error) return dispatch(setStatus(query.error));

    dispatch(clearStatus());
  }

  handleExecuteQuery () {
    const query = this.refs.queryArea.getValue();
    this.props.dispatch(executeQueryIfNeeded(query));
  }

  handleSelectTable () {
    const { tables, connections } = this.props;
    if (!tables.items.length) return;

    const selected = this.refs.tableList.selected();
    const item = tables.items[selected];

    let query;
    switch (connections.server.client) {
    case 'postgresql':
      query = `select * from "${item}" limit 1000`;
      break;
    case 'mysql':
      query = `select * from \`${item}\` limit 1000`;
      break;
    default: query = `select * from ${item} limit 1000`;
    }

    this.props.dispatch(executeQueryIfNeeded(query));
  }

  handleChangeDatabase () {
    const { id, database } = this.props.params;
    const route = `/server/${id}/database/${database}/databases`;
    this.context.history.pushState(null, route);
  }

  handleListServers () {
    this.context.history.pushState(null, '/server/list');
  }

  handleClearQuery () {
    this.refs.queryArea.setValue('');
  }

  render () {
    const { tables, query } = this.props;
    const { theme } = this.context;

    const tableListShortcuts = [
      { key: 'return', label: 'Select', handler: ::this.handleSelectTable },
      { key: 'c', label: 'Change database', handler: ::this.handleChangeDatabase },
      { key: 's', label: 'List servers', handler: ::this.handleListServers },
    ];
    const queryAreaShortcuts = [
      { key: 'C-c', label: 'Clear', handler: ::this.handleClearQuery },
      { key: 'C-e', label: 'Editor' },
      { key: 'C-x', label: 'Execute', handler: ::this.handleExecuteQuery },
    ];
    const queryResultsShortcuts = [ { key: 'C-e', label: 'Editor' } ];

    return (
      <box shadow top={1} left={1} bottom={2} right={3}>
        <box left={0} top={0} bottom={0} width={30}>
          <Shortcuts items={tableListShortcuts}>
            <TableList ref="tableList" items={tables.items} />
          </Shortcuts>
        </box>
        <box left={30} top={0} right={0} height={5}>
          <Shortcuts items={queryAreaShortcuts}>
            <Textarea ref="queryArea" defaultValue={query.query} />
          </Shortcuts>
          <text top={0} left={2} style={theme.box.normal} content=" Query " />
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
    connections: state.connections,
    tables: state.tables,
    query: state.queries,
  };
}

export default connect(mapStateToProps)(Database);
