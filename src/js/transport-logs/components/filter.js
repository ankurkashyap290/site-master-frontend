import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Divider } from '@material-ui/core';
import ReactToPrint from 'react-to-print';

const TransportLogFilterComponent = props => (
  <div>
    <Button size="small" onClick={() => props.setFilterType('')}>All</Button>
    <Button size="small" onClick={() => props.setFilterType('today')}>Today</Button>
    <Button size="small" onClick={() => props.setFilterType('thismonth')}>This Month</Button>
    <Button size="small" onClick={() => props.setFilterType('lastmonth')}>Last Month</Button>
    <Divider className="divider horizontal" />
    <ReactToPrint
      trigger={() => (
        <Button size="small">
          <Icon>print</Icon>
          &nbsp;Print
        </Button>)}
      content={() => props.printContent}
    />
  </div>
);

TransportLogFilterComponent.defaultProps = {
  printContent: null,
};

TransportLogFilterComponent.propTypes = {
  setFilterType: PropTypes.func.isRequired,
  printContent: PropTypes.object,
};

export default TransportLogFilterComponent;
