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
  TablePagination,
  TableSortLabel,
} from '@material-ui/core';

import CreateButton from 'ui-elements/create-button';
import WarningDialog from 'ui-elements/warning-dialog';
import Row from '../containers/row';
import SidebarForm from '../containers/sidebar-form';
import DeleteDialog from '../containers/delete-dialog';
import DetailsView from '../containers/details-view.js';

const ETCListComponent = props => (
  <div className="table-wrapper">
    {props.warningMessage ?
      <WarningDialog message={props.warningMessage} onClose={props.resetWarningMessage} />
    : null}
    <SidebarForm />
    <DeleteDialog />
    <DetailsView />
    <Toolbar className="toolbar">
      <div />
      <CreateButton
        module="External Transportation Companies"
        label="Add External Transportation Company"
        onClick={props.setNewEditableModel}
      />
    </Toolbar>
    <Paper className="table-paper">
      <Toolbar className="table-header">
        <Typography variant="title">External Transportation Companies</Typography>
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
            <TableCell>
              Color
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
        No External Transportation Company present.
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
    </Paper>
  </div>
);

ETCListComponent.defaultProps = {
  modelList: [],
  modelListPagination: null,
  warningMessage: null,
};

ETCListComponent.propTypes = {
  modelList: PropTypes.array,
  modelListPagination: PropTypes.object,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleChangeOrder: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  setNewEditableModel: PropTypes.func.isRequired,
  warningMessage: PropTypes.string,
  resetWarningMessage: PropTypes.func.isRequired,
};

export default ETCListComponent;
