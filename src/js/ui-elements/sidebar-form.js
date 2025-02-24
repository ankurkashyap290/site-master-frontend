import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Typography, FormHelperText, Button, CircularProgress } from '@material-ui/core';

const SidebarForm = props => (
  <Drawer className="sidebar-form" anchor="right" open={props.isOpen} onClose={props.onClose}>
    {props.title ? <Typography variant="title">{props.title}</Typography> : ''}
    {props.children}
    {props.errors['data.attributes'] ?
      <FormHelperText error>{props.errors['data.attributes'].detail}</FormHelperText>
      : null}
    <div className="button-container">
      {props.loading ? <CircularProgress color="secondary" className="smallCircularProgress" /> : null}
      <Button onClick={props.onClose} color="primary">Discard</Button>
      <Button onClick={props.onSave} color="secondary" variant="raised" disabled={props.loading}>Save</Button>
    </div>
  </Drawer>
);

SidebarForm.defaultProps = {
  title: '',
};

SidebarForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  errors: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SidebarForm;
