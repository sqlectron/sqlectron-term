const red = '#ff0000';
const white = '#ffffff';
const blue = '#0000d3';
const green = '#00cfd0';
const cyan = '#00ffff';
const black = '#000000';
const yellow = '#ffff00';
const lightGray = '#e7e7e7';


const styles = {
  button: {
    fg: black,
    bg: lightGray,
    focus: {
      bg: green,
      fg: black,
    },
  },
  header: { fg: yellow, bg: blue, bold: true },
  main: { bg: lightGray },
  status: { bg: green, fg: black },
  shortcuts: {
    general: {
      fg: yellow,
      bg: blue,
      bold: true,
    },
    key: cyan,
  },
  box: {
    normal: {
      bg: blue,
      fg: yellow,
      border: { fg: white, bg: blue },
      scrollbar: { bg: green },
      label: { fg: white, bg: blue },
    },
    focus: {
      border: { fg: cyan },
    },
  },
  danger: {
    bg: red,
    border: { fg: white, bg: red },
  },
};

styles.list = { ...styles.box };
styles.list.normal.item = { fg: yellow };

export default styles;
