import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

import NumberFormatFee from 'ui-elements/input-formats/number-format-fee';

const LastRow = (props) => {
  let ytdCostTotal = 0;
  let ytdPassengertTotal = 0;
  let mtdCostTotal = 0;
  let mtdPassengertTotal = 0;
  let mtdProjectedCostTotal = 0;
  let mtdProjectedPassengertTotal = 0;
  props.data.map((data) => {
    ytdCostTotal += parseFloat(data.ytd_soc);
    ytdPassengertTotal += parseFloat(data.ytd_passengers);
    mtdCostTotal += parseFloat(data.mtd_soc);
    mtdPassengertTotal += parseFloat(data.mtd_passengers);
    mtdProjectedCostTotal += parseFloat(data.mtd_projected_soc);
    mtdProjectedPassengertTotal += parseFloat(data.mtd_projected_passengers);
    return null;
  });
  return (
    <TableRow className="last-row">
      <TableCell className="border-right">Grand Total</TableCell>

      <TableCell>
        $<NumberFormatFee value={ytdCostTotal} displayType="text" />
      </TableCell>
      <TableCell className="dark-border-right">
        {ytdPassengertTotal}
      </TableCell>

      <TableCell>
        $<NumberFormatFee value={mtdCostTotal} displayType="text" />
      </TableCell>
      <TableCell className="border-right">
        {mtdPassengertTotal}
      </TableCell>

      <TableCell>
        $<NumberFormatFee value={mtdProjectedCostTotal} displayType="text" />
      </TableCell>
      <TableCell className="border-right">
        {mtdProjectedPassengertTotal}
      </TableCell>

      <TableCell>
        $<NumberFormatFee value={mtdCostTotal + mtdProjectedCostTotal} displayType="text" />
      </TableCell>
      <TableCell>
        {mtdPassengertTotal + mtdProjectedPassengertTotal}
      </TableCell>
      <TableCell />
    </TableRow>
  );
};

LastRow.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LastRow;
