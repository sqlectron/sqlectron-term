import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTablesIfNeeded } from '../actions/db';
import { setStatus } from '../actions/status';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  error: { fg: 'red' },
};


class Database extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    error: PropTypes.any,
  };

  componentWillMount () {
    this.props.dispatch(fetchTablesIfNeeded());
    this.handleEvents(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handleEvents(nextProps);
  }

  handleEvents ({ isFetching, error }) {
    const { dispatch } = this.props;

    if (error) return dispatch(setStatus(error));
    if (isFetching) return dispatch(setStatus('Loading list of tables...'));
    dispatch(setStatus('List of tables loaded'));
  }

  render () {
    const { items } = this.props;
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
              items={items}
        />
      </box>
    );
  }

}


function mapStateToProps (state) {
  return state.tables;
}

export default connect(mapStateToProps)(Database);
