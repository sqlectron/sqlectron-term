import React, { PropTypes } from 'react';


const style = {
  list: {
    selected: { bg: 'blue', bold: true },
  },
  error: { fg: 'red' },
};


export default function TableList ({ items }) {
  return (
    <list
      style={style.list}
      keys="true"
      mouse="true"
      border="line"
      label="Tables"
      scrollbar={{
        ch: 'x',
        track: { bg: 'cyan' },
        style: { inverse: true },
      }}
      items={items}
    />
  );
}


TableList.propTypes = {
  items: PropTypes.array.isRequired,
};
