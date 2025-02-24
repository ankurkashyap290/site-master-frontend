import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Paper, Typography } from '@material-ui/core';

import CreateButton from 'ui-elements/create-button';
import SidebarForm from 'transport-logs/containers/sidebar-form';
import DeleteDialog from 'transport-logs/containers/delete-dialog.js';
import Filter from 'transport-logs/containers/filters';
import EmptyTable from 'ui-elements/empty-table';
import DetailsView from 'transport-logs/containers/details-view.js';
import TransportLogTable from './log-list';

const TransportLogListComponent = props => (
  <div className="table-wrapper">
    <SidebarForm />
    <DeleteDialog />
    <DetailsView />
    <Toolbar className="toolbar">
      <div />
      <CreateButton
        module="Transport Logs"
        label="Add Transport Log"
        onClick={props.setNewEditableModel}
      />
    </Toolbar>
    <Paper className="table-paper">
      <Toolbar className="table-header">
        <Typography variant="title">Transport Logs</Typography>
        <Filter printContent={props.printContent} />
      </Toolbar>
      <TransportLogTable {...props} />
      <EmptyTable empty={Boolean(props.modelList.length)} />
    </Paper>
  </div>
);

TransportLogListComponent.defaultProps = {
  pagination: null,
  printContent: null,
};

TransportLogListComponent.propTypes = {
  selectedFacility: PropTypes.object.isRequired,
  setNewEditableModel: PropTypes.func.isRequired,
  modelList: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  onChangePage: PropTypes.func.isRequired,
  setPrintContent: PropTypes.func.isRequired,
  printContent: PropTypes.object,
};

export default TransportLogListComponent;
