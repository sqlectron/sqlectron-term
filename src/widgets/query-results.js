import React, { Component } from 'react';


const style = {
  focus: {
    border: { fg: 'cyan' },
  },
  blur: {
    border: { fg: 'white' },
  },
};


export default class QueryResults extends Component {

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
