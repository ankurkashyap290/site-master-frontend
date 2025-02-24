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
  Icon,
  IconButton,
  Button,
} from '@material-ui/core';
import { Link as LinkTo } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import PdfButton from 'ui-elements/pdf-button';
import DrilldownRow from './facility-drilldown-row';

const FacilityDrilldownComponent = props => (
  <div className="table-wrapper">
    <Paper className="table-paper" ref={el => props.setPrintContent(el)} id="reporting">
      <Toolbar className="table-toolbar">
        <div className="flex-row">
          <LinkTo
            className="hide-print"
            style={{ textDecoration: 'none' }}
            to="/reporting#facility"
            data-html2canvas-ignore="true"
          >
            <IconButton
              color="primary"
              className="back-button"
            >
              <Icon>arrow_back</Icon>
            </IconButton>
          </LinkTo>
          <Typography variant="title">{props.facilityDetails.attributes.name}</Typography>
        </div>
        <PdfButton />
        <ReactToPrint
          trigger={() => (
            <Button
              data-html2canvas-ignore="true"
              size="small"
              className="hide-print"
            >
              <Icon>print</Icon>
              &nbsp;Print
            </Button>)}
          content={() => props.printContent}
        />
      </Toolbar>
      <Table className="list">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell numeric>Costs</TableCell>
            <TableCell numeric>Passengers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(props.facilityDetails.attributes.mtd)
            .map(key => (<DrilldownRow
              key={key}
              date={key}
              facilityId={parseInt(props.facilityDetails.id, 10)}
              data={props.facilityDetails.attributes.mtd[key]}
              type="Actual"
            />))}
          {Object.keys(props.facilityDetails.attributes.projected)
              .map(key => (<DrilldownRow
                key={key}
                date={key}
                facilityId={parseInt(props.facilityDetails.id, 10)}
                data={props.facilityDetails.attributes.projected[key]}
                type="Projected"
              />))}
        </TableBody>
      </Table>
      {props.facilityDetails.attributes.mtd.length === 0 &&
        props.facilityDetails.attributes.projected.length === 0 ?
          <Typography className="table-empty" align="center" paragraph variant="caption">
            No Reports present.
          </Typography> : null}
    </Paper>
  </div>
);

FacilityDrilldownComponent.defaultProps = {
  printContent: null,
};

FacilityDrilldownComponent.propTypes = {
  printContent: PropTypes.object,
  facilityDetails: PropTypes.object.isRequired,
  setPrintContent: PropTypes.func.isRequired,
};

export default FacilityDrilldownComponent;
