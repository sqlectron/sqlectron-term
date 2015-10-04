import React, { PropTypes } from 'react';


const style = {
  header: {
    fg: '#ffff00',
    bg: '#0000d3',
    bold: true,
  },
  shortcut: {
    fg: '#00ffff',
  },
};


export default function Shortcuts ({ shortcuts }) {
  return (
    <text tags="true" bottom={0} style={style.header}>
      { shortcuts.map(shortcut => ` {${style.shortcut.fg}-fg}${shortcut.key}{/}-${shortcut.label}`).join('') }
    </text>
  );
}

Shortcuts.propTypes = {
  shortcuts: PropTypes.array.isRequired,
};
