import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TableCell, TableRow, IconButton, Icon } from '@material-ui/core';
import dateformats from '../../config/dateformats';

const BiddingRow = props => (
  <TableRow
    onClick={() => props.setEditableModel(props.data)}
    className="clickable"
  >
    <TableCell numeric>{props.data.id}</TableCell>
    <TableCell>
      {props.data.attributes.name}
    </TableCell>
    <TableCell>
      {moment(props.data.attributes.date).format(dateformats.dateFormat)}
    </TableCell>
    <TableCell>
      <IconButton
        color="primary"
        aria-label="update"
        onClick={() => props.setEditableModel(props.data)}
        disabled={!props.journeyUser.isAllowed('update', 'Bidding')}
      >
        <Icon>gavel</Icon>
      </IconButton>
    </TableCell>
  </TableRow>
);

BiddingRow.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
};

export default BiddingRow;
