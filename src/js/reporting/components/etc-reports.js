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
  TableSortLabel,
} from '@material-ui/core';
import ReactToPrint from 'react-to-print';

import dateformats from 'config/dateformats';
import PdfButton from 'ui-elements/pdf-button';
import Row from './etc-row';
import GrandTotal from './etc-last-row';
import EtcFilter from '../containers/etc-filter';
import EtcAggregatedData from '../containers/etc-aggregated-data';

const EtcReportsComponent = props => (
  <div className="table-wrapper reporting">
    <Paper className="table-paper" ref={el => props.setPrintContent(el)} id="reporting">
      <Toolbar className="table-toolbar">
        <Typography variant="title">External Transportation Company Reports</Typography>
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
        {'Filter by company:'} <EtcFilter />
      </div>
      <EtcAggregatedData />
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
            <TableCell className="border-right">Company Name</TableCell>

            <TableCell
              sortDirection={props.orderBy === 'ytd_soc' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'ytd_soc'}
                direction={props.order}
                onClick={() => props.handleRequestSort('ytd_soc')}
              >
                Sum of Costs
              </TableSortLabel>
            </TableCell>
            <TableCell className="dark-border-right">Sum of Passengers</TableCell>

            <TableCell
              sortDirection={props.orderBy === 'mtd_soc' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'mtd_soc'}
                direction={props.order}
                onClick={() => props.handleRequestSort('mtd_soc')}
              >
                Sum of Costs
              </TableSortLabel>
            </TableCell>
            <TableCell className="border-right">Sum of Passengers</TableCell>

            <TableCell
              sortDirection={props.orderBy === 'projected_soc' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'projected_soc'}
                direction={props.order}
                onClick={() => props.handleRequestSort('projected_soc')}
              >
                Sum of Costs
              </TableSortLabel>
            </TableCell>
            <TableCell className="border-right">Sum of Passengers</TableCell>
            <TableCell
              sortDirection={props.orderBy === 'mtd_total_soc' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'mtd_total_soc'}
                direction={props.order}
                onClick={() => props.handleRequestSort('mtd_total_soc')}
              >
                Sum of Costs
              </TableSortLabel>
            </TableCell>
            <TableCell>Sum of Passengers</TableCell>
            <TableCell>Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.etcReportList.map(row => <Row data={row} key={row.id} />)}
          <GrandTotal data={props.etcReportList} />
        </TableBody>
      </Table>
    </Paper>
  </div>
);

EtcReportsComponent.defaultProps = {
  printContent: null,
};

EtcReportsComponent.propTypes = {
  printContent: PropTypes.object,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  setPrintContent: PropTypes.func.isRequired,
  etcReportList: PropTypes.array.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
};

export default EtcReportsComponent;
