import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  TablePagination,
  TableSortLabel,
} from '@material-ui/core';

import Loader from 'ui-elements/loader';
import SidebarForm from '../containers/sidebar-form';
import Row from '../containers/row';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const BidListComponent = props => (
  <div className="table-wrapper">
    <Paper>
      <Tabs
        value={props.status}
        onChange={props.changeStatus}
        centered
      >
        <Tab label="Unassigned Events" value="unassigned" />
        <Tab label="Pending Events" value="pending" />
        <Tab label="Accepted Events" value="accepted" />
      </Tabs>
    </Paper>
    <SidebarForm />
    {props.loading ? <Loader /> :
    <Paper className="table-paper">
      <Toolbar className="table-header">
        <Typography variant="title">{capitalizeFirstLetter(props.status)} Events</Typography>
      </Toolbar>
      <Table className="list">
        <TableHead>
          <TableRow>
            <TableCell
              numeric
              style={{ width: '20px' }}
              sortDirection={props.orderBy === 'id' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'id'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('id')}
              >
              ID
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={props.orderBy === 'name' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'name'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('name')}
              >
              Name
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={props.orderBy === 'datetime' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'datetime'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('datetime')}
              >
              Date
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ width: '50px' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.modelList.map(data => (
            <Row
              key={data.id}
              data={data}
            />
          ))}
        </TableBody>
      </Table>
      {props.modelList.length ? null :
      <Typography className="table-empty" align="center" paragraph variant="caption">
        No {capitalizeFirstLetter(props.status)} Event.
      </Typography>}
      <TablePagination
        rowsPerPageOptions={[props.modelListPagination.per_page]}
        component="div"
        count={props.modelListPagination.total}
        rowsPerPage={props.modelListPagination.per_page}
        page={props.modelListPagination.current_page - 1}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={props.onChangePage}
      />
    </Paper>}
  </div>
);

BidListComponent.defaultProps = {
  modelList: [],
  modelListPagination: null,
  onChangePage: () => {},
};

BidListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  changeStatus: PropTypes.func.isRequired,
  onChangePage: PropTypes.func,
  modelList: PropTypes.array,
  modelListPagination: PropTypes.object,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleChangeOrder: PropTypes.func.isRequired,
};

export default BidListComponent;
