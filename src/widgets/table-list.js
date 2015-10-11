import React, { Component, PropTypes } from 'react';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  focus: {
    border: { fg: 'cyan' },
  },
  blur: {
    border: { fg: 'white' },
  },
};


export default class TableList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    // events
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    // actions
    onExecute: PropTypes.func,
  };

  constructor (props) {
    super(props);

    this.state = { focused: false };
  }

  focus () {
    this.refs.list.focus();
  }

  handleFocus () {
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus(this);
  }

  handleBlur () {
    this.setState({ focused: false });
    if (this.props.onBlur) this.props.onBlur(this);
  }

  handleKeypress (ch, key) {
    const { onExecute, items } = this.props;

    switch (key.full) {
    case 'enter': {
      if (onExecute && items && items.length) {
        onExecute(items[this.refs.list.selected]);
      }
      break;
    }
    default: return;
    }
  }

  render () {
    const { items } = this.props;
    return (
      <list
        ref="list"
        keys="true"
        mouse="true"
        border="line"
        label="Tables"
        scrollbar={{
          ch: 'x',
          track: { bg: 'cyan' },
          style: { inverse: true },
        }}
        style={{ ...style.list, ...(this.state.focused ? style.focus : style.blur)}}
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
        onKeypress={::this.handleKeypress}
        items={items}
      />
    );
  }

}
