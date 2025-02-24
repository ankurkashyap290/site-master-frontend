import React from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar,
  Button,
  Icon,
  IconButton,
  Popover,
  MenuList,
  MenuItem,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import CalendarEventListComponent from '../../ui-elements/calendar-event-list';

const ToolbarComponent = props => (
  <Toolbar className="calendar-header">
    <div>
      <Button color="primary" onClick={props.goToCurrent}>
        Today
      </Button>
      <IconButton
        color="primary"
        onClick={props.goToPrev}
      >
        <Icon>navigate_before</Icon>
      </IconButton>
      <IconButton
        color="primary"
        onClick={props.goToNext}
      >
        <Icon>navigate_next</Icon>
      </IconButton>
    </div>
    <div>
      <Typography className="year-month-title">
        {props.label}
      </Typography>
      {
        props.contentLoading ?
          <CircularProgress className="content-loader" size="16px" color="secondary" /> :
          <div className="cp-placeholder" />
      }
    </div>
    <div>
      {props.view === 'day' ?
        <ReactToPrint
          trigger={() => (
            <Button
              size="small"
              disabled={!props.calendarEvents.length}
            >
              <Icon>print</Icon>
              &nbsp;Print
            </Button>)}
          content={() => props.printContent}
        /> : ''}
      <Button color="primary" onClick={props.openDropdown} >
        {props.view}
        <Icon>arrow_drop_down</Icon>
      </Button>
      <Popover
        open={Boolean(props.dropdownAnchor)}
        anchorEl={props.dropdownAnchor}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onClose={props.closeDropdown}
      >
        <MenuList role="menu">
          {props.views
            .filter(view => view !== 'agenda')
            .map(view => (
              <MenuItem
                key={view}
                onClick={() => props.setView(view)}
              >
                {view}
              </MenuItem>
            ))}
        </MenuList>
      </Popover>
      <CalendarEventListComponent
        title="Daily Schedule"
        noMoreRecordText="This day doesn't have any event."
        eventList={props.calendarEvents}
        setPrintContent={props.setPrintContent}
        className="print-only"
        order="asc"
        orderBy="date"
      />
    </div>
  </Toolbar>
);

ToolbarComponent.defaultProps = {
  dropdownAnchor: null,
  printContent: null,
};

ToolbarComponent.propTypes = {
  // date: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  // messages: PropTypes.object.isRequired,
  // onNavigate: PropTypes.func.isRequired,
  // onViewChange: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentLoading: PropTypes.bool.isRequired,
  printContent: PropTypes.object,
  setPrintContent: PropTypes.func.isRequired,
  calendarEvents: PropTypes.arrayOf(PropTypes.object).isRequired,

  dropdownAnchor: PropTypes.object,
  openDropdown: PropTypes.func.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  goToCurrent: PropTypes.func.isRequired,
  goToPrev: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
};

export default ToolbarComponent;
