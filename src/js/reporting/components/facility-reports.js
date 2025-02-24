import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  Button,
  Icon,
} from '@material-ui/core';
import ReactToPrint from 'react-to-print';

import PdfButton from 'ui-elements/pdf-button';
import dateformats from 'config/dateformats';
import Row from './facility-row';
import GrandTotal from './facility-last-row';
import FacilityAggregatedDataComponent from '../containers/facility-aggregated-data';
import FacilityFilter from '../containers/facility-filter';

const FacilityReportsComponent = props => (
  <div className="table-wrapper reporting">
    <Paper className="table-paper" ref={el => props.setPrintContent(el)} id="reporting">
      <Toolbar className="table-header">
        <Typography variant="title">Facility Reports</Typography>
        <PdfButton />
        <ReactToPrint
          trigger={() => (
            <Button
              data-html2canvas-ignore="true"
              size="small"
              className="hide-print"
            >
              <Icon>print</Icon>
              &nbsp;Print
            </Button>)}
          content={() => props.printContent}
        />
      </Toolbar>
      <Typography className="today-date">
        {"Today's date:"} {moment().format(dateformats.dateFormat)}
      </Typography>
      <div className="typography filter">
        {'Filter by facility:'} <FacilityFilter />
      </div>
      <FacilityAggregatedDataComponent />
      <Table className="list reporting">
        <TableHead>
          <TableRow className="header-first">
            <TableCell className="border-right" />
            <TableCell className="dark-border-right" colSpan="2">YTD</TableCell>
            <TableCell className="border-right" colSpan="2">MTD</TableCell>
            <TableCell className="border-right" colSpan="2">Projected</TableCell>
            <TableCell colSpan="3">Total</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-right">Facility Name</TableCell>

            <TableCell>Sum of Costs</TableCell>
            <TableCell className="dark-border-right">Sum of Passengers</TableCell>

            <TableCell>Sum of Costs</TableCell>
            <TableCell className="border-right">Sum of Passengers</TableCell>

            <TableCell>Sum of Costs</TableCell>
            <TableCell className="border-right">Sum of Passengers</TableCell>

            <TableCell>Sum of Costs</TableCell>
            <TableCell>Sum of Passengers</TableCell>
            <TableCell>Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.facilityModelList.map(data => <Row data={data} key={data.id} />)}
          <GrandTotal data={props.facilityModelList} />
        </TableBody>
      </Table>
    </Paper>
  </div>
);

FacilityReportsComponent.defaultProps = {
  printContent: null,
};

FacilityReportsComponent.propTypes = {
  printContent: PropTypes.object,
  facilityModelList: PropTypes.array.isRequired,
  setPrintContent: PropTypes.func.isRequired,
};

export default FacilityReportsComponent;
