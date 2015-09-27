import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadTables } from '../actions/db';
import { setStatus, clearStatus } from '../actions/status';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  error: { fg: 'red' },
};


class Database extends Component {

  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    tables: PropTypes.array,
  };

  componentWillMount () {
    const { dispatch, params } = this.props;
    dispatch(loadTables(params.id, params.database));
    this.handleEvents(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handleEvents(nextProps);
  }

  componentWillUnmount () {
    this.props.dispatch(clearStatus());
  }

  handleEvents ({ loading, tables, error }) {
    const { dispatch } = this.props;

    if (error) dispatch(setStatus(error));
    if (loading) dispatch(setStatus('Loading list of tables...'));
    if (tables) dispatch(setStatus('List of tables loaded'));
  }

  render () {
    const { children, tables = [] } = this.props;
    return (
      <box border="line">
        <list left={-1}
              style={style.list}
              top={-1}
              bottom={-1}
              width={30}
              keys="true"
              mouse="true"
              border="line"
              label="Tables"
              scrollbar={{
                ch: 'x',
                track: { bg: 'cyan' },
                style: { inverse: true },
              }}
              items={tables}
        />
        database info
        {children}
      </box>
    );
  }

}


export default connect(
  state => state.tables
)(Database);
