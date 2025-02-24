import React from 'react';
import { CircularProgress, Paper } from '@material-ui/core';

const Loader = () => (
  <Paper className="loader">
    <img src="/images/logo.png" alt="Journey" />
    <CircularProgress color="secondary" />
  </Paper>
);

export default Loader;
