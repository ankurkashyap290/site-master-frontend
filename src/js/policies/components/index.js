import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Toolbar, Typography } from '@material-ui/core';

import SidebarForm from '../containers/sidebar-form';
import Row from '../containers/row';

const PolicyListComponent = props => (
  <div className="table-wrapper">
    <SidebarForm />
    <Paper className="table-paper">
      <Toolbar>
        <Typography variant="title">User Permissions</Typography>
      </Toolbar>
      <Table className="list">
        <TableHead>
          <TableRow>
            <TableCell>User Role</TableCell>
            <TableCell>Entity</TableCell>
            <TableCell>View</TableCell>
            <TableCell>Create</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell />
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
        No policy present.
      </Typography>}
    </Paper>
  </div>
);

PolicyListComponent.defaultProps = {
  modelList: [],
};

PolicyListComponent.propTypes = {
  modelList: PropTypes.array,
};

export default PolicyListComponent;
