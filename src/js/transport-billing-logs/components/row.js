import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';

import TableControl from 'ui-elements/table-control';
import dateformats from 'config/dateformats';

const formatDate = date => moment(date, dateformats.dbDateTimeFormat)
  .format([dateformats.dateFormat, dateformats.timeFormat].join(' '));

const Row = props => (
  <TableRow onClick={() => props.showDetails(props.data)} className="clickable">
    <TableCell numeric>{props.data.id}</TableCell>
    <TableCell>{props.data.attributes.client_name}</TableCell>
    <TableCell>{props.data.attributes.location_name}</TableCell>
    <TableCell>{formatDate(props.data.attributes.date)}</TableCell>
    <TableControl
      module="Transport Billing Logs"
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
  showDetails: PropTypes.func.isRequired,
};

export default Row;
