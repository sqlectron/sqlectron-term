import React, { Component } from 'react';


const style = {
  focus: {
    border: { fg: 'cyan' },
  },
  blur: {
    border: { fg: 'white' },
  },
};


export default class QueryArea extends Component {

  constructor (props) {
    super(props);

    this.state = { focused: false };
  }

  setValue (value) {
    this.refs.textarea.setValue(value);
  }

  focus () {
    this.refs.textarea.focus();
  }

  handleFocus () {
    this.refs.textarea.readInput();
    this.setState({ focused: true });
  }

  handleBlur () {
    this.setState({ focused: false });
  }

  handleKeypress (ch, info) {
    if (info.name === 'tab') this.refs.textarea.screen.focusNext();
  }

  render () {
    return (
      <box>
        <textarea
          ref="textarea"
          keys="true"
          mouse="true"
          border="line"
          style={this.state.focused ? style.focus : style.blur }
          onFocus={::this.handleFocus}
          onBlur={::this.handleBlur}
          onKeypress={::this.handleKeypress}
        />
        <text top={0} left={2} content="Query" />
      </box>
    );
  }

}
