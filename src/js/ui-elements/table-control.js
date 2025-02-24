import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconButton, Icon, TableCell } from '@material-ui/core';

const TableControl = props => (
  <TableCell
    className="control-buttons"
    onClick={e => e.stopPropagation()}
  >
    <IconButton
      color="primary"
      aria-label="edit"
      onClick={() => props.setEditableModel(props.data)}
      disabled={!props.journeyUser.isAllowed('update', props.module)}
    >
      <Icon>mode_edit</Icon>
    </IconButton>
    <IconButton
      color="primary"
      aria-label="delete"
      onClick={() => props.setDeletableModel(props.data)}
      disabled={!props.journeyUser.isAllowed('delete', props.module)}
    >
      <Icon>delete</Icon>
    </IconButton>
  </TableCell>
);

TableControl.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  setDeletableModel: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

export default connect(
  mapStateToProps,
  null,
)(TableControl);
