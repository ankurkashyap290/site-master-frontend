import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, IconButton, Icon } from '@material-ui/core';

import { rolesGetNameById } from '../../config/roles';

const UserRow = props => (
  <TableRow key={props.data.id}>
    <TableCell numeric>{props.data.id}</TableCell>
    <TableCell>
      {props.data.attributes.first_name}&nbsp;
      {props.data.attributes.middle_name ? `${props.data.attributes.middle_name} ` : ''}
      {props.data.attributes.last_name}
    </TableCell>
    <TableCell>
      {props.data.attributes.email}
    </TableCell>
    <TableCell>{rolesGetNameById(props.data.attributes.role_id)}</TableCell>
    <TableCell
      className="control-buttons"
      onClick={e => e.stopPropagation()}
    >
      <IconButton
        color="primary"
        onClick={() => props.setResetableModel(props.data)}
        disabled={!props.journeyUser.isAllowed('update', props.module)}
      >
        <Icon>vpn_key</Icon>
      </IconButton>
      <IconButton
        color="primary"
        onClick={() => props.setEditableModel(props.data)}
        disabled={!props.journeyUser.isAllowed('update', props.module)}
      >
        <Icon>mode_edit</Icon>
      </IconButton>
      <IconButton
        color="primary"
        onClick={() => props.setDeletableModel(props.data)}
        disabled={!props.journeyUser.isAllowed('delete', props.module)}
      >
        <Icon>delete</Icon>
      </IconButton>
    </TableCell>
  </TableRow>
);

UserRow.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  setResetableModel: PropTypes.func.isRequired,
  setDeletableModel: PropTypes.func.isRequired,
};

export default UserRow;
