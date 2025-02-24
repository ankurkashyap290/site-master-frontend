import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import NumberFormatFee from 'ui-elements/input-formats/number-format-fee';

const Row = props =>
  (
    <TableRow className="clickable" onClick={() => props.history.push(`/reporting/etc/${props.data.id}`)}>
      <TableCell className="border-right">{props.data.name}</TableCell>

      <TableCell>
        $<NumberFormatFee value={props.data.ytd_soc} displayType="text" />
      </TableCell>
      <TableCell className="dark-border-right">
        {props.data.ytd_passengers}
      </TableCell>

      <TableCell>
        $<NumberFormatFee value={props.data.mtd_soc} displayType="text" />
      </TableCell>
      <TableCell className="border-right">
        {props.data.mtd_passengers}
      </TableCell>

      <TableCell>
        $<NumberFormatFee value={props.data.mtd_projected_soc} displayType="text" />
      </TableCell>
      <TableCell className="border-right">
        {props.data.mtd_projected_passengers}
      </TableCell>

      <TableCell>
        $<NumberFormatFee value={props.data.mtd_total_soc} displayType="text" />
      </TableCell>
      <TableCell>
        {props.data.mtd_total_passengers}
      </TableCell>
      <TableCell>
        $<NumberFormatFee value={props.data.mtd_total_average} displayType="text" />
      </TableCell>
    </TableRow>
  );

Row.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Row);
