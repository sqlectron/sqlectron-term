import React, { Component, PropTypes } from 'react';


const style = {
  focus: {
    border: { fg: 'cyan' },
  },
  blur: {
    border: { fg: 'white' },
  },
};


export default class QueryResults extends Component {

  static propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  constructor (props) {
    super(props);

    this.state = { focused: false };
  }

  handleFocus () {
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus(this);
  }

  handleBlur () {
    this.setState({ focused: false });
    if (this.props.onBlur) this.props.onBlur(this);
  }

  render () {
    return (
      <box
        border="line"
        label="Result"
        content="query result area"
        input="true"
        style={this.state.focused ? style.focus : style.blur }
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
      />
    );
  }

}
