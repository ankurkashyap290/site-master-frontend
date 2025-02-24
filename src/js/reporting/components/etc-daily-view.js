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
  Icon,
  IconButton,
  Button,
} from '@material-ui/core';
import { Link as LinkTo } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import PdfButton from 'ui-elements/pdf-button';
import dateformats from 'config/dateformats';
import DailyRow from './etc-daily-row';

const formatDate = date => moment(date, dateformats.dbDateFormat)
  .format(dateformats.dateFormat);

const EtcDailyViewComponent = props => (
  <div className="table-wrapper">
    <Paper className="table-paper" ref={el => props.setPrintContent(el)} id="reporting">
      <Toolbar>
        <div className="flex-row">
          <LinkTo
            data-html2canvas-ignore="true"
            className="hide-print"
            style={{ textDecoration: 'none' }}
            to={`/reporting/etc/${props.etcId}`}
          >
            <IconButton
              color="primary"
              className="back-button"
            >
              <Icon>arrow_back</Icon>
            </IconButton>
          </LinkTo>
          <Typography variant="title">{props.events[0].attributes.accepted_driver.name}, {formatDate(props.date)}</Typography>
        </div>
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
      <Table className="list">
        <TableHead>
          <TableRow>
            <TableCell>Event ID</TableCell>
            <TableCell>Client Names</TableCell>
            <TableCell>Event Created By</TableCell>
            <TableCell>Facility Name</TableCell>
            <TableCell>Costs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.events.map(data => <DailyRow key={data.id} data={data} />)}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

EtcDailyViewComponent.defaultProps = {
  printContent: null,
};

EtcDailyViewComponent.propTypes = {
  events: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  etcId: PropTypes.number.isRequired,
  printContent: PropTypes.object,
  setPrintContent: PropTypes.func.isRequired,
};

export default EtcDailyViewComponent;
