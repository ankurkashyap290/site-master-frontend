import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
} from '@material-ui/core';

import Row from 'transport-billing-logs/containers/row.js';

const TransportBillingLogTable = props => (
  <Table className="list transport-billing-logs" ref={(el) => { props.setPrintContent(el); }}>
    <TableHead>
      <TableRow className="print-only">
        <TableCell colSpan="5" className="print-header">
          <img
            className="print-logo"
            src="/images/logo.png"
            alt="Journey"
          />
          <Typography className="print-facility">
            {props.selectedFacility.name}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell numeric className="id">ID</TableCell>
        <TableCell>Client Name</TableCell>
        <TableCell>Location Name</TableCell>
        <TableCell>Date</TableCell>
        <TableCell className="actions hide-print" />
      </TableRow>
    </TableHead>
    <TableBody>
      {props.modelList.map(data => <Row data={data} key={data.id} />)}
      <TableRow className="print-only">
        <TableCell colSpan="5">
          <Typography align="center">
            Printed copies are for reference only.
            Please refer to the electronic copy for the latest version.
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
    {props.pagination && !props.filter && props.modelList.length ?
      <TableFooter>
        <TableRow>
          <TablePagination
            count={props.pagination.total}
            rowsPerPage={props.pagination.per_page}
            rowsPerPageOptions={[]}
            page={props.pagination.current_page - 1}
            onChangePage={props.onChangePage}
          />
        </TableRow>
      </TableFooter>
    : null}
  </Table>);

TransportBillingLogTable.defaultProps = {
  pagination: null,
};

TransportBillingLogTable.propTypes = {
  selectedFacility: PropTypes.object.isRequired,
  modelList: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  setPrintContent: PropTypes.func.isRequired,
  pagination: PropTypes.object,
  filter: PropTypes.string.isRequired,
};

export default TransportBillingLogTable;
