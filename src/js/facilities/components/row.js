import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

import TableControl from 'ui-elements/table-control';
import { cityToTimezoneViewDictionary } from '../store/adapters';

const FacilityRowComponent = props => (
  <TableRow key={props.data.id}>
    <TableCell numeric>
      {props.data.id}
    </TableCell>
    <TableCell>
      {props.data.attributes.name}
    </TableCell>
    <TableCell>
      {cityToTimezoneViewDictionary(props.data.attributes.timezone)} Time Zone
    </TableCell>
    <TableControl
      module="Facilities"
      data={props.data}
      setEditableModel={props.setEditableModel}
      setDeletableModel={props.setDeletableModel}
    />
  </TableRow>
);

FacilityRowComponent.propTypes = {
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  setDeletableModel: PropTypes.func.isRequired,
};

export default FacilityRowComponent;
