import React, { Component } from 'react';


export default class QueryArea extends Component {

  setValue (value) {
    this.refs.textarea.setValue(value);
  }

  focus () {
    this.refs.textarea.focus();
  }

  handleFocus () {
    this.refs.textarea.readInput();
  }

  render () {
    return (
      <box>
        <textarea
          ref="textarea"
          keys="true"
          mouse="true"
          border="line"
          onFocus={::this.handleFocus}
        />
        <text top={0} left={2} content="Query" />
      </box>
    );
  }

}
