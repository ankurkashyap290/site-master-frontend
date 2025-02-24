import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Toolbar,
  Typography,
  Input,
  InputAdornment,
  Icon,
  Button,
  CircularProgress,
  TableSortLabel,
} from '@material-ui/core';

import CreateButton from 'ui-elements/create-button';
import WarningDialog from 'ui-elements/warning-dialog';

import Row from '../containers/row';
import SidebarForm from '../containers/sidebar-form';
import DeleteDialog from '../containers/delete-dialog';
import ImportDialog from '../containers/import-dialog';
import DetailsView from '../containers/details-view.js';

const ClientListComponent = props => (
  <div className="table-wrapper">
    {props.warningMessage ?
      <WarningDialog
        message={props.warningMessage}
        onClose={props.resetWarningMessage}
      />
    : null}
    <SidebarForm />
    <DeleteDialog />
    <ImportDialog
      isOpen={props.isImportDialogOpen}
      onClose={props.closeImportDialog}
    />
    <DetailsView />
    <Toolbar className="toolbar">
      <div />
      <div>
        <Button
          color="primary"
          onClick={props.openImportDialog}
          disabled={!props.journeyUser.isAllowed('import', 'Clients')}
        >
          <Icon>cloud_upload</Icon>&nbsp;Import from CSV
        </Button>&nbsp;
        <CreateButton
          module="Clients"
          label="Add Client"
          onClick={props.setNewEditableModel}
          disabled={!props.journeyUser.isAllowed('create', 'Clients')}
        />
      </div>
    </Toolbar>
    <Paper className="table-paper">
      <Toolbar className="table-header">
        <Typography variant="title">Clients</Typography>
        <Input
          onChange={props.search}
          value={props.searchKey}
          startAdornment={
            <InputAdornment position="start">
              { props.searchLoading ?
                <CircularProgress color="secondary" size="24px" /> :
                <Icon>search</Icon>}
            </InputAdornment>
          }
        />
      </Toolbar>
      <Table className="list">
        <TableHead>
          <TableRow>
            <TableCell
              numeric
              style={{ width: 20 }}
            >
              Status
            </TableCell>
            <TableCell
              sortDirection={props.orderBy === 'first_name' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'first_name'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('first_name')}
              >
              Name
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={props.orderBy === 'room_number' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'room_number'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('room_number')}
              >
              Room #
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={props.orderBy === 'responsible_party_email' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'responsible_party_email'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('responsible_party_email')}
              >
              Responsible Party Email
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
        No client present.
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

ClientListComponent.defaultProps = {
  modelList: [],
  modelListPagination: null,
  warningMessage: null,
};

ClientListComponent.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  modelList: PropTypes.array,
  modelListPagination: PropTypes.object,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleChangeOrder: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  setNewEditableModel: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  searchKey: PropTypes.string.isRequired,
  isImportDialogOpen: PropTypes.bool.isRequired,
  openImportDialog: PropTypes.func.isRequired,
  closeImportDialog: PropTypes.func.isRequired,
  warningMessage: PropTypes.string,
  resetWarningMessage: PropTypes.func.isRequired,
};

export default ClientListComponent;
