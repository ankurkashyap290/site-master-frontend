import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Paper, Typography } from '@material-ui/core';

import CreateButton from 'ui-elements/create-button';
import SidebarForm from 'transport-billing-logs/containers/sidebar-form';
import DeleteDialog from 'transport-billing-logs/containers/delete-dialog.js';
import Filter from 'transport-billing-logs/containers/filters';
import EmptyTable from 'ui-elements/empty-table';
import DetailsView from 'transport-billing-logs/containers/details-view.js';
import TransportBillingLogTable from './log-list';

const TransportBillingLogListComponent = props => (
  <div className="table-wrapper">
    <SidebarForm />
    <DeleteDialog />
    <DetailsView />
    <Toolbar className="toolbar">
      <div />
      <CreateButton
        module="Transport Billing Logs"
        label="Add Transport Billing Log"
        onClick={props.setNewEditableModel}
      />
    </Toolbar>
    <Paper className="table-paper">
      <Toolbar className="table-header">
        <Typography variant="title">Transport Billing Logs</Typography>
        <Filter printContent={props.printContent} />
      </Toolbar>
      <TransportBillingLogTable {...props} />
      <EmptyTable empty={Boolean(props.modelList.length)} />
    </Paper>
  </div>
);

TransportBillingLogListComponent.defaultProps = {
  pagination: null,
  printContent: null,
};

TransportBillingLogListComponent.propTypes = {
  selectedFacility: PropTypes.object.isRequired,
  setNewEditableModel: PropTypes.func.isRequired,
  modelList: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  onChangePage: PropTypes.func.isRequired,
  setPrintContent: PropTypes.func.isRequired,
  printContent: PropTypes.object,
};

export default TransportBillingLogListComponent;
