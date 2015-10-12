import React, { Component, PropTypes } from 'react';


const style = {
  focus: {
    border: { fg: 'cyan' },
  },
  blur: {
    border: { fg: 'white' },
  },
};


export default class QueryArea extends Component {

  static propTypes = {
    query: PropTypes.string,
    // events
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    // actions
    onExecute: PropTypes.func,
  };

  constructor (props) {
    super(props);

    this.state = { query: props.query || '', focused: false };
  }

  focus () {
    this.refs.textarea.focus();
  }

  handleFocus () {
    this.refs.textarea.readInput();
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus(this);
  }

  handleBlur () {
    this.setState({ focused: false });
    if (this.props.onBlur) this.props.onBlur(this);
  }

  handleKeypress (ch, info) {
    switch (info.full) {
    case 'C-c':
      this.setState({ query: '' });
      break;
    case 'C-x':
      if (this.props.onExecute) {
        this.props.onExecute(this.refs.textarea.getValue());
      }
      break;
    case 'tab':
      this.refs.textarea.screen.focusNext();
      break;
    case 'S-tab':
      this.refs.textarea.screen.focusPrev();
      break;
    default: return false;
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.query !== this.state.query) {
      this.setState({ query: nextProps.query });
    }
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
          value={this.state.query}
        />
        <text top={0} left={2} content="Query" />
      </box>
    );
  }

}
