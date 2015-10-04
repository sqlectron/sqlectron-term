import React, { PropTypes } from 'react';


const style = {
  status: {
    bg: '#00cfd0',
    fg: '#000000',
  },
};


export default function Status ({ status = '' }) {
  return (
    <text right={0} bottom={1} left={0} style={style.status} content={' ' + status} />
  );
}

Status.propTypes = {
  status: PropTypes.string,
};
