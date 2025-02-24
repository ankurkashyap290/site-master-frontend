import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab } from '@material-ui/core';

import FacilityReports from '../containers/facility-reports';
import EtcReports from '../containers/etc-reports';

const ReportingComponent = props => (
  <div className="reporting-wrapper">
    <Paper>
      {!props.disabled ?
        <Tabs
          value={props.activeTab}
          onChange={props.changeTab}
          centered
        >
          <Tab label="Facility Reports" value="facility" />
          <Tab label="External Transportation Company Reports" value="etc" />
        </Tabs>
      :
        <Tabs
          value={props.activeTab}
          centered
        >
          <Tab label="Facility Reports" value="facility" disabled />
          <Tab label="External Transportation Company Reports" value="etc" disabled />
        </Tabs>}
    </Paper>
    {props.activeTab === 'facility' ? <FacilityReports /> : null}
    {props.activeTab === 'etc' ? <EtcReports /> : null}
  </div>
);

ReportingComponent.propTypes = {
  activeTab: PropTypes.any.isRequired,
  changeTab: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ReportingComponent;
