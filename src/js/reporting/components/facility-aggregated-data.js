import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  InputAdornment,
} from '@material-ui/core';
import NumberFormatFee from '../../ui-elements/input-formats/number-format-fee';

const FacilityAggregatedDataComponent = (props) => {
  let ytdCostTotal = 0;
  let ytdPassengertTotal = 0;
  let mtdCostTotal = 0;
  let mtdPassengertTotal = 0;
  let projectedCostTotal = 0;
  let projectedPassengertTotal = 0;
  props.facilityModelList.map((data) => {
    ytdCostTotal += parseFloat(data.attributes.ytd.cost);
    ytdPassengertTotal += parseFloat(data.attributes.ytd.passengers);
    mtdCostTotal += parseFloat(data.attributes.mtd.cost);
    mtdPassengertTotal += parseFloat(data.attributes.mtd.passengers);
    projectedCostTotal += parseFloat(data.attributes.projected.cost);
    projectedPassengertTotal += parseFloat(data.attributes.projected.passengers);
    return null;
  });

  const averageTotal = (mtdPassengertTotal + projectedPassengertTotal) ?
    Math.round((mtdCostTotal + projectedCostTotal)
     / (mtdPassengertTotal + projectedPassengertTotal)) : 0;

  const status = props.budget() - mtdCostTotal - projectedCostTotal;
  const statusClass = status < 0 ? 'status-negativ' : 'status-positive';
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
          <TableCell>$<NumberFormatFee value={ytdCostTotal} displayType="text" /></TableCell>
          <TableCell>{ytdPassengertTotal}</TableCell>
          <TableCell>
            $<NumberFormatFee value={ytdPassengertTotal ? Math.round(ytdCostTotal / ytdPassengertTotal) : 0} displayType="text" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>MTD</TableCell>
          <TableCell>$<NumberFormatFee value={mtdCostTotal} displayType="text" /></TableCell>
          <TableCell>{mtdPassengertTotal}</TableCell>
          <TableCell>
            $<NumberFormatFee value={mtdPassengertTotal ? Math.round(mtdCostTotal / mtdPassengertTotal) : 0} displayType="text" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Projected</TableCell>
          <TableCell>$<NumberFormatFee value={projectedCostTotal} displayType="text" /></TableCell>
          <TableCell>{projectedPassengertTotal}</TableCell>
          <TableCell>
            $<NumberFormatFee
              value={
                projectedPassengertTotal ?
                Math.round(projectedCostTotal / projectedPassengertTotal) :
                0
              }
              displayType="text"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>$<NumberFormatFee value={mtdCostTotal + projectedCostTotal} displayType="text" /></TableCell>
          <TableCell>{mtdPassengertTotal + projectedPassengertTotal}</TableCell>
          <TableCell>$<NumberFormatFee value={averageTotal} displayType="text" /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Budget</TableCell>
          <TableCell>
            <Input
              className="numeric-input"
              style={{ width: 100 }}
              value={props.budget()}
              disabled={
                props.facilityModelList.length > 1 &&
                props.facilityModelList.length !== props.allFacilityCount
              }
              onChange={props.onChange}
              onBlur={(e) => { e.persist(); props.saveBudget(e); }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              inputComponent={NumberFormatFee}
            />
          </TableCell>
          <TableCell colSpan={2} />
        </TableRow>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell className={statusClass}>
            $<NumberFormatFee value={status} displayType="text" />
          </TableCell>
          <TableCell colSpan={2} />
        </TableRow>
      </TableBody>
    </Table>
  );
};

FacilityAggregatedDataComponent.propTypes = {
  facilityModelList: PropTypes.array.isRequired,
  allFacilityCount: PropTypes.number.isRequired,
  budget: PropTypes.func.isRequired,
  saveBudget: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FacilityAggregatedDataComponent;
