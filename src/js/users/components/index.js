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
import { Link as LinkTo } from 'react-router-dom';

import CreateButton from 'ui-elements/create-button';
import WarningDialog from 'ui-elements/warning-dialog';
import Row from '../containers/row';
import SidebarForm from '../containers/sidebar-form';
import DeleteDialog from '../containers/delete-dialog';
import ConfirmDialog from '../containers/confirm-dialog';

const UserListComponent = props => (
  <div className="table-wrapper">
    {props.warningMessage ?
      <WarningDialog message={props.warningMessage} onClose={props.resetWarningMessage} />
    : null}
    <SidebarForm userRole={props.userRole} userRoles={props.userRoles} />
    <DeleteDialog />
    <ConfirmDialog />
    <Toolbar className="toolbar">
      {props.backButton ?
        <LinkTo to="/organizations" className="styleless">
          <Button
            color="primary"
            className="back-button"
          >
            <Icon>arrow_back</Icon> {props.parentOrganization.attributes.name}
          </Button>
        </LinkTo>
      : <div />}
      <CreateButton
        module={props.module}
        label={`Add ${props.userRole || 'User'}`}
        onClick={props.setNewEditableModel}
      />
    </Toolbar>
    <Paper className="table-paper">
      <Toolbar>
        <Typography variant="title">{props.module}</Typography>
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
              sortDirection={props.orderBy === 'email' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'email'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={props.orderBy === 'role_id' ? props.order : false}
            >
              <TableSortLabel
                active={props.orderBy === 'role_id'}
                direction={props.order}
                onClick={() => props.handleChangeOrder('role_id')}
              >
                Role
              </TableSortLabel>
            </TableCell>
            <TableCell className="actions" />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.modelList.map(data => (
            <Row
              key={data.id}
              module={props.module}
              data={data}
            />
          ))}
        </TableBody>
      </Table>
      {props.modelList.length ? null :
      <Typography className="table-empty" align="center" paragraph variant="caption">
        No user present.
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

UserListComponent.defaultProps = {
  userRole: null,
  userRoles: null,
  modelList: [],
  modelListPagination: null,
  warningMessage: null,
};

UserListComponent.propTypes = {
  module: PropTypes.string.isRequired,
  backButton: PropTypes.bool.isRequired,
  userRole: PropTypes.string,
  userRoles: PropTypes.arrayOf(PropTypes.string),
  parentOrganization: PropTypes.object.isRequired,
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

export default UserListComponent;
