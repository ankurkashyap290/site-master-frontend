import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Icon,
  Toolbar,
  Typography,
  Input,
  InputAdornment,
  Button,
  TablePagination,
  CircularProgress,
  TableSortLabel,
} from '@material-ui/core';

import CreateButton from 'ui-elements/create-button';
import SidebarForm from 'locations/containers/sidebar-form';
import DeleteDialog from 'locations/containers/delete-dialog';
import Row from 'locations/containers/row';
import ImportDialog from '../containers/import-dialog';
import WarningDialog from '../../ui-elements/warning-dialog';

const LocationListComponent = props => (
  <div className="table-wrapper">
    {props.warningMessage ?
      <WarningDialog message={props.warningMessage} onClose={props.resetWarningMessage} />
    : null}
    <SidebarForm />
    <DeleteDialog />
    <ImportDialog isOpen={props.isImportDialogOpen} onClose={props.closeImportDialog} />
    <Toolbar className="toolbar">
      <div />
      <div>
        <Button
          color="primary"
          onClick={props.openImportDialog}
          disabled={!props.journeyUser.isAllowed('import', 'Locations')}
        >
          <Icon>cloud_upload</Icon>&nbsp;Import from CSV
        </Button>&nbsp;
        <CreateButton
          module="Locations"
          label="Add Location"
          onClick={props.setNewEditableModel}
          disabled={!props.journeyUser.isAllowed('create', 'Locations')}
        />
      </div>
    </Toolbar>
    <Paper className="table-paper">
      <Toolbar className="table-header">
        <Typography variant="title">Locations</Typography>
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
              sortDirection={props.orderBy === 'phone' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'phone'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('phone')}
              >
              Phone
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={props.orderBy === 'address' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'address'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('address')}
              >
              Full Address
              </TableSortLabel>
            </TableCell>
            <TableCell className="actions" />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.modelList.map(data => <Row data={data} key={data.id} />)}
        </TableBody>
      </Table>
      {props.modelList.length ? null :
      <Typography className="table-empty" align="center" paragraph variant="caption">
        No location present.
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

LocationListComponent.defaultProps = {
  modelList: [],
  modelListPagination: null,
  warningMessage: null,
};

LocationListComponent.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  modelList: PropTypes.array,
  modelListPagination: PropTypes.object,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleChangeOrder: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  setNewEditableModel: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  isImportDialogOpen: PropTypes.bool.isRequired,
  openImportDialog: PropTypes.func.isRequired,
  closeImportDialog: PropTypes.func.isRequired,
  warningMessage: PropTypes.string,
  resetWarningMessage: PropTypes.func.isRequired,
};

export default LocationListComponent;
