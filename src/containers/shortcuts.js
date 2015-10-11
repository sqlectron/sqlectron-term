import { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';

import { addShortcuts, removeShortcuts } from '../actions/shortcuts';


class Shortcuts extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,

    children: PropTypes.element.isRequired,
    items: PropTypes.array.isRequired,
  };

  componentWillUnmount () {
    this.props.dispatch(removeShortcuts(this.props.items));
  }

  handleFocus () {
    this.props.dispatch(addShortcuts(this.props.items));
  }

  handleBlur () {
    this.props.dispatch(removeShortcuts(this.props.items));
  }

  render () {
    return cloneElement(this.props.children, {
      onFocus: ::this.handleFocus,
      onBlur: ::this.handleBlur,
    });
  }

}


export default connect()(Shortcuts);
