import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

import TableControl from 'ui-elements/table-control';

const ClientRow = props => (
  <TableRow onClick={() => props.showDetails(props.data)} className="clickable">
    <TableCell>
      <div
        className="color-circle"
        style={{ backgroundColor: props.data.attributes.transport_status === 'on' ? '#ff3d00' : '#607d8b' }}
        title={`${props.data.attributes.transport_status} transport`}
      />
    </TableCell>
    <TableCell>
      {props.data.attributes.first_name}&nbsp;
      {props.data.attributes.middle_name ? `${props.data.attributes.middle_name} ` : ''}
      {props.data.attributes.last_name}
    </TableCell>
    <TableCell>
      {props.data.attributes.room_number}
    </TableCell>
    <TableCell>
      {props.data.attributes.responsible_party_email}
    </TableCell>
    <TableControl
      module="Clients"
      data={props.data}
      setEditableModel={props.setEditableModel}
      setDeletableModel={props.setDeletableModel}
    />
  </TableRow>
);

ClientRow.propTypes = {
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  setDeletableModel: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
};

export default ClientRow;
