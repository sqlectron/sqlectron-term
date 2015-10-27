import React, { PropTypes } from 'react';


export default function Status ({ status = '' }, { theme }) {
  return (
    <text position={{ right: 0, bottom: 1, left: 0 }} style={theme.status} content={' ' + status} />
  );
}

Status.propTypes = {
  status: PropTypes.string,
};

Status.contextTypes = {
  theme: PropTypes.object.isRequired,
};
