import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

import NumberFormatFee from 'ui-elements/input-formats/number-format-fee';

const LastRow = (props) => {
  let ytdCostTotal = 0;
  let ytdPassengertTotal = 0;
  let mtdCostTotal = 0;
  let mtdPassengertTotal = 0;
  let projectedCostTotal = 0;
  let projectedPassengertTotal = 0;
  props.data.map((data) => {
    ytdCostTotal += parseFloat(data.attributes.ytd.cost);
    ytdPassengertTotal += parseFloat(data.attributes.ytd.passengers);
    mtdCostTotal += parseFloat(data.attributes.mtd.cost);
    mtdPassengertTotal += parseFloat(data.attributes.mtd.passengers);
    projectedCostTotal += parseFloat(data.attributes.projected.cost);
    projectedPassengertTotal += parseFloat(data.attributes.projected.passengers);
    return null;
  });
  return (
    <TableRow className="last-row">
      <TableCell className="border-right">Grand Total</TableCell>

      <TableCell>$<NumberFormatFee value={ytdCostTotal} displayType="text" /></TableCell>
      <TableCell className="dark-border-right">{ytdPassengertTotal}</TableCell>

      <TableCell>$<NumberFormatFee value={mtdCostTotal} displayType="text" /></TableCell>
      <TableCell className="border-right">{mtdPassengertTotal}</TableCell>

      <TableCell>$<NumberFormatFee value={projectedCostTotal} displayType="text" /></TableCell>
      <TableCell className="border-right">{projectedPassengertTotal}</TableCell>

      <TableCell>$<NumberFormatFee value={mtdCostTotal + projectedCostTotal} displayType="text" /></TableCell>
      <TableCell>{mtdPassengertTotal + projectedPassengertTotal}</TableCell>
      <TableCell />
    </TableRow>
  );
};

LastRow.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LastRow;
