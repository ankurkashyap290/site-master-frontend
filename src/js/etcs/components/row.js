import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

import TableControl from 'ui-elements/table-control';
import colors from '../../config/colors';

const ETCRow = props => (
  <TableRow onClick={() => props.showDetails(props.data)} className="clickable">
    <TableCell numeric>{props.data.id}</TableCell>
    <TableCell>
      {props.data.attributes.name}
    </TableCell>
    <TableCell>
      <div className="color-circle" style={{ background: `#${colors[props.data.attributes.color_id].value}` }} />
    </TableCell>
    <TableControl
      module="External Transportation Companies"
      data={props.data}
      setEditableModel={props.setEditableModel}
      setDeletableModel={props.setDeletableModel}
    />
  </TableRow>
);

ETCRow.propTypes = {
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  setDeletableModel: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
};

export default ETCRow;
