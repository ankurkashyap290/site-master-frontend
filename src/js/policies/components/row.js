import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Icon, IconButton } from '@material-ui/core';

import { rolesGetNameById } from '../../config/roles';

const PolicyRow = props => (
  <TableRow key={props.data.id}>
    <TableCell>
      {rolesGetNameById(props.data.attributes.role_id)}
    </TableCell>
    <TableCell>
      {props.data.attributes.entity}
    </TableCell>
    <TableCell>
      {props.data.attributes.view ? <Icon>check</Icon> : <Icon>remove</Icon>}
    </TableCell>
    <TableCell>
      {props.data.attributes.create ? <Icon>check</Icon> : <Icon>remove</Icon>}
    </TableCell>
    <TableCell>
      {props.data.attributes.update ? <Icon>check</Icon> : <Icon>remove</Icon>}
    </TableCell>
    <TableCell>
      {props.data.attributes.delete ? <Icon>check</Icon> : <Icon>remove</Icon>}
    </TableCell>
    <TableCell className="control-buttons">
      <IconButton
        color="primary"
        onClick={() => props.setEditableModel(props.data)}
      >
        <Icon>mode_edit</Icon>
      </IconButton>
    </TableCell>
  </TableRow>
);

PolicyRow.propTypes = {
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
};

export default PolicyRow;
