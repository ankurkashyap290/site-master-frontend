import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import NumberFormatFee from 'ui-elements/input-formats/number-format-fee';

const Row = (props) => {
  const mtdSumCost = parseFloat(props.data.attributes.mtd.cost)
    + parseFloat(props.data.attributes.projected.cost);
  const mtdSumPassengers = parseFloat(props.data.attributes.mtd.passengers)
    + parseFloat(props.data.attributes.projected.passengers);
  let mtdAverage = 0;
  if (mtdSumPassengers > 0) {
    mtdAverage = Math.round(mtdSumCost / mtdSumPassengers);
  }
  return (
    <TableRow className="clickable" onClick={() => props.history.push(`/reporting/facility/${props.data.id}`)}>
      <TableCell className="border-right">{props.data.attributes.name}</TableCell>

      <TableCell>
        $<NumberFormatFee value={props.data.attributes.ytd.cost} displayType="text" />
      </TableCell>
      <TableCell className="dark-border-right">
        {props.data.attributes.ytd.passengers}
      </TableCell>

      <TableCell>
        $<NumberFormatFee value={props.data.attributes.mtd.cost} displayType="text" />
      </TableCell>
      <TableCell className="border-right">
        {props.data.attributes.mtd.passengers}
      </TableCell>

      <TableCell>
        $<NumberFormatFee value={props.data.attributes.projected.cost} displayType="text" />
      </TableCell>
      <TableCell className="border-right">
        {props.data.attributes.projected.passengers}
      </TableCell>

      <TableCell>$<NumberFormatFee value={mtdSumCost} displayType="text" /></TableCell>
      <TableCell>{mtdSumPassengers}</TableCell>
      <TableCell>$<NumberFormatFee value={mtdAverage} displayType="text" /></TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Row);
