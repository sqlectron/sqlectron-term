import { Component, PropTypes } from 'react';


class Theme extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,

    theme: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    theme: PropTypes.object.isRequired,
  };

  getChildContext () {
    return { theme: this.props.theme };
  }

  render () {
    return this.props.children;
  }

}


export default Theme;
