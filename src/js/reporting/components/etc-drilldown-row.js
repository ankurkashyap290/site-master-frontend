import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TableCell, TableRow } from '@material-ui/core';
import withRouter from 'react-router-dom/withRouter';

import dateformats from 'config/dateformats';
import NumberFormatFee from 'ui-elements/input-formats/number-format-fee';

const formatDate = date => moment(date, dateformats.dbDateFormat)
  .format(dateformats.dateFormat);

const EtcDrilldownRow = (props) => {
  let cost = 0;
  let passengers = 0;
  props.data.map((data) => {
    cost += parseFloat(data.fee);
    passengers += parseInt(data.passenger_count, 10);
    return null;
  });
  return (
    <TableRow className="clickable" onClick={() => props.history.push(`/reporting/etc/${props.etcId}/${props.date}`)}>
      <TableCell>{formatDate(props.date)}</TableCell>
      <TableCell>{props.type}</TableCell>
      <TableCell numeric>$<NumberFormatFee value={cost} displayType="text" /></TableCell>
      <TableCell numeric>{passengers}</TableCell>
    </TableRow>
  );
};

EtcDrilldownRow.propTypes = {
  date: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  etcId: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(EtcDrilldownRow);
