import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const EmptyTable = ({ empty }) => {
  if (empty) {
    return null;
  }
  return (
    <Typography className="table-empty" align="center" paragraph variant="caption">
      No entry present.
    </Typography>
  );
};

EmptyTable.propTypes = {
  empty: PropTypes.bool.isRequired,
};

export default EmptyTable;
