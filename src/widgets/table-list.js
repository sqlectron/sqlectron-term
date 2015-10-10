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
  };

  constructor (props) {
    super(props);

    this.state = { focused: false };
  }

  handleFocus () {
    this.setState({ focused: true });
  }

  handleBlur () {
    this.setState({ focused: false });
  }

  render () {
    const { items } = this.props;
    return (
      <list
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
        items={items}
      />
    );
  }

}
