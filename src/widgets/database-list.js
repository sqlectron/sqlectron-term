import React, { Component, PropTypes } from 'react';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  error: { fg: 'red' },
};


export default class DatabaseList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    // events
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeypress: PropTypes.func,
  };

  componentDidMount () {
    if (this.refs.list) this.refs.list.focus();
  }

  selected () {
    if (this.refs.list) return this.refs.list.selected;
    return 0;
  }

  focus () {
    this.refs.list.focus();
  }

  handleKeypress (ch, info) {
    if (this.props.onKeypress) this.props.onKeypress(ch, info);
  }

  handleFocus () {
    if (this.props.onFocus) this.props.onFocus();
  }

  handleBlur () {
    if (this.props.onBlur) this.props.onBlur();
  }

  render () {
    const { items } = this.props;

    return (
      <list ref="list"
            style={style.list}
            left="center"
            top="center"
            border="line"
            keys="true"
            mouse="true"
            shadow="true"
            label=" Database list "
            scrollbar={{
              ch: ' ',
              track: { bg: 'cyan' },
              style: { inverse: true },
            }}
            items={items}
            onFocus={::this.handleFocus}
            onBlur={::this.handleBlur}
            onKeypress={::this.handleKeypress}
      />
    );
  }

}
