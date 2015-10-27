import React, { Component, PropTypes } from 'react';
import { merge } from 'lodash';


export default class QueryResults extends Component {

  static propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    result: PropTypes.any,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  constructor (props) {
    super(props);

    this.state = { focused: false };
  }

  componentDidMount () {
    this.refs.textarea.setScrollPerc(0);
  }

  componentDidUpdate () {
    this.refs.textarea.setScrollPerc(0);
  }

  handleFocus () {
    this.refs.textarea.readInput();
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus();
  }

  handleBlur () {
    this.setState({ focused: false });
    if (this.props.onBlur) this.props.onBlur();
  }

  handleKeypress (ch, info) {
    switch (info.full) {
    case 'tab':
      this.refs.textarea.screen.focusNext();
      break;
    case 'S-tab':
      this.refs.textarea.screen.focusPrev();
      break;
    default: return false;
    }
  }

  render () {
    const { result } = this.props;
    const { theme } = this.context;

    let content = 'no results';

    if (result) {
      const { rows, fields } = result;
      if (fields) {
        const data = [];
        const colsMax = fields.map(() => 0);

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const row = rows[rowIndex];
          data.push([]);
          for (let colIndex = 0; colIndex < fields.length; colIndex++) {
            const field = fields[colIndex];

            let value = row[field.name];
            if (value === null) value = 'null';
            if (value === undefined) value = 'undefined';
            value = value.toString();

            colsMax[colIndex] = colsMax[colIndex] < value.length
              ? value.length
              : colsMax[colIndex];

            data[rowIndex].push(value);
          }
        }
        data.unshift([]);
        for (let colIndex = 0; colIndex < fields.length; colIndex++) {
          const field = fields[colIndex];
          const value = field.name;
          data[0].push(value);
          colsMax[colIndex] = colsMax[colIndex] < value.length
            ? value.length
            : colsMax[colIndex];
        }
        content = data.map(row => {
          return row.map((col, index) => {
            const spaces = new Array(colsMax[index] - col.length + 2).join(' ');
            return col + spaces;
          }).join(' ');
        }).join('\n');
      }
    }

    return (
      <box
        border="line"
        label=" Result "
        style={this.state.focused ? merge({}, theme.box.normal, theme.box.focus) : theme.box.normal}
      >
        <textarea
          mouse keys scrollbar
          ref="textarea"
          style={theme.box.normal}
          onFocus={::this.handleFocus}
          onBlur={::this.handleBlur}
          onKeypress={::this.handleKeypress}
          value={content}
        />
      </box>
    );
  }

}
