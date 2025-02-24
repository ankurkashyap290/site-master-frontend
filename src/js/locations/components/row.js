import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

import TableControl from 'ui-elements/table-control';

const Row = props => (
  <TableRow>
    <TableCell numeric>{props.data.id}</TableCell>
    <TableCell>{props.data.attributes.name}</TableCell>
    <TableCell>{props.data.attributes.phone}</TableCell>
    <TableCell>
      {props.data.attributes.address},
      {' '}
      {props.data.attributes.city},
      {' '}
      {props.data.attributes.state}
      {' '}
      {props.data.attributes.postcode}
    </TableCell>
    <TableControl
      module="Locations"
      data={props.data}
      setEditableModel={props.setEditableModel}
      setDeletableModel={props.setDeletableModel}
    />
  </TableRow>
);

Row.propTypes = {
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  setDeletableModel: PropTypes.func.isRequired,
};

export default Row;
