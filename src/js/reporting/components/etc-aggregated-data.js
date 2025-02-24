import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import NumberFormatFee from 'ui-elements/input-formats/number-format-fee';

const EtcAggregatedDataComponent = (props) => {
  let ytdCostTotal = 0;
  let ytdPassengertTotal = 0;
  let mtdCostTotal = 0;
  let mtdPassengertTotal = 0;
  let mtdProjectedCostTotal = 0;
  let mtdProjectedPassengertTotal = 0;
  props.etcModelList.map((data) => {
    ytdCostTotal += parseFloat(data.attributes.ytd.cost);
    ytdPassengertTotal += parseFloat(data.attributes.ytd.passengers);
    mtdCostTotal += parseFloat(data.attributes.mtd.cost);
    mtdPassengertTotal += parseFloat(data.attributes.mtd.passengers);
    mtdProjectedCostTotal += parseFloat(data.attributes.projected.cost);
    mtdProjectedPassengertTotal += parseFloat(data.attributes.projected.passengers);
    return null;
  });

  const mtdAverageTotal = (mtdPassengertTotal + mtdProjectedPassengertTotal) ?
    Math.round((mtdCostTotal + mtdProjectedCostTotal)
     / (mtdPassengertTotal + mtdProjectedPassengertTotal)) : 0;

  return (
    <Table className="list aggregated-reporting">
      <TableHead>
        <TableRow className="header-first">
          <TableCell />
          <TableCell>Costs</TableCell>
          <TableCell>Passengers</TableCell>
          <TableCell>Average</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow className="ytd-border-bottom">
          <TableCell>YTD</TableCell>
          <TableCell>
            $<NumberFormatFee value={ytdCostTotal} displayType="text" />
          </TableCell>
          <TableCell>{ytdPassengertTotal}</TableCell>
          <TableCell>
            $<NumberFormatFee value={ytdPassengertTotal ? Math.round(ytdCostTotal / ytdPassengertTotal) : 0} displayType="text" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>MTD</TableCell>
          <TableCell>
            $<NumberFormatFee value={mtdCostTotal} displayType="text" />
          </TableCell>
          <TableCell>{mtdPassengertTotal}</TableCell>
          <TableCell>
            $<NumberFormatFee value={mtdPassengertTotal ? Math.round(mtdCostTotal / mtdPassengertTotal) : 0} displayType="text" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Projected</TableCell>
          <TableCell>
            $<NumberFormatFee value={mtdProjectedCostTotal} displayType="text" />
          </TableCell>
          <TableCell>
            {mtdProjectedPassengertTotal}
          </TableCell>
          <TableCell>
            $<NumberFormatFee
              value={mtdProjectedPassengertTotal ?
                Math.round(mtdProjectedCostTotal / mtdProjectedPassengertTotal) : 0}
              displayType="text"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>
            $<NumberFormatFee value={mtdCostTotal + mtdProjectedCostTotal} displayType="text" />
          </TableCell>
          <TableCell>
            {mtdPassengertTotal + mtdProjectedPassengertTotal}
          </TableCell>
          <TableCell>
            $<NumberFormatFee value={mtdAverageTotal} displayType="text" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

EtcAggregatedDataComponent.propTypes = {
  etcModelList: PropTypes.array.isRequired,
};

export default EtcAggregatedDataComponent;
