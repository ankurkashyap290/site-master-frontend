import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Icon,
  Toolbar,
  Typography,
  TablePagination,
  TableSortLabel,
} from '@material-ui/core';

import Row from '../containers/row';
import SidebarForm from '../containers/sidebar-form';
import DeleteDialog from '../containers/delete-dialog';

const OrganizationListComponent = props => (
  <div className="table-wrapper">
    <SidebarForm />
    <DeleteDialog />
    <Toolbar className="toolbar">
      <div />
      <Button
        variant="raised"
        color="secondary"
        aria-label="add"
        className="add-new-button"
        onClick={props.setNewEditableModel}
      >
        <Icon>add</Icon> Add Organization
      </Button>
    </Toolbar>
    <Paper className="table-paper">
      <Toolbar>
        <Typography variant="title">Organizations</Typography>
      </Toolbar>
      <Table className="list">
        <TableHead>
          <TableRow>
            <TableCell
              numeric
              className="id"
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
              sortDirection={props.orderBy === 'facility_limit' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'facility_limit'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('facility_limit')}
              >
              Facility Limit
              </TableSortLabel>
            </TableCell>
            <TableCell className="actions" />
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
        No organization present.
      </Typography>}
      <TablePagination
        component="div"
        count={props.modelListPagination.total}
        page={props.modelListPagination.current_page - 1}
        rowsPerPage={props.modelListPagination.per_page}
        rowsPerPageOptions={[]}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={props.onChangePage}
      />
    </Paper>
  </div>
);

OrganizationListComponent.defaultProps = {
  modelList: [],
  modelListPagination: null,
};

OrganizationListComponent.propTypes = {
  modelList: PropTypes.array,
  modelListPagination: PropTypes.object,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleChangeOrder: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  setNewEditableModel: PropTypes.func.isRequired,
};

export default OrganizationListComponent;
