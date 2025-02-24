import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

import NumberFormatFee from 'ui-elements/input-formats/number-format-fee';

const EtcDailyRow = props => (
  <TableRow>
    <TableCell>{props.data.id}</TableCell>
    <TableCell>{props.data.attributes.passengers.map(passenger => passenger.name).join(', ')}</TableCell>
    <TableCell>{props.data.attributes.user.name}</TableCell>
    <TableCell>{props.data.attributes.facility_name}</TableCell>
    <TableCell>$<NumberFormatFee value={props.data.attributes.accepted_driver.fee} displayType="text" /></TableCell>
  </TableRow>
);

EtcDailyRow.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EtcDailyRow;
