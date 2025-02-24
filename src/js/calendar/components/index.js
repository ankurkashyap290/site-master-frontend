import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { uniqBy } from 'lodash';
import Calendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Tabs,
  Tab,
  Paper,
  Toolbar,
  FormControl,
  Input,
  InputAdornment,
  Icon,
  Button,
  Typography,
} from '@material-ui/core';

import CreateButton from 'ui-elements/create-button';
import MonthEvent from '../components/month-event';
import CalendarToolbar from '../containers/toolbar';
import SidebarForm from '../containers/sidebar-form';
import DetailsView from '../containers/details-view';
import DeleteDialog from '../containers/delete-dialog';
import SearchDeleteDialog from '../../ui-elements/delete-dialog';
import ColorsLegendSidebar from '../containers/colors-legend-sidebar';
import colorContrast from '../../common/color-contrast';
import Loader from '../../ui-elements/loader';
import CalendarEventListComponent from '../../ui-elements/calendar-event-list';
import { cityToTimezoneViewDictionary } from '../../facilities/store/adapters';

moment.locale('en');
Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const CalendarComponent = props => (
  <div className="calendar-wrapper">
    <Paper>
      <Tabs
        value={props.activeTab}
        onChange={props.changeTab}
        centered
      >
        <Tab label="Calendar" />
        <Tab label="Today's Schedule" />
      </Tabs>
    </Paper>
    <ColorsLegendSidebar
      isOpen={props.isColorsOpen}
      onClose={props.closeColors}
      selectedFacility={props.selectedFacility}
    />
    <SidebarForm />
    <DeleteDialog />
    <SearchDeleteDialog
      title=" selected events"
      isOpen={props.isSearchSelectedDeleteOpen}
      onDelete={props.onSearchSelectedDelete}
      onClose={props.closeSearchDeleteDialog}
      deletableModel={{ id: null }}
      description={`The following future events will be canceled:
       ${uniqBy(props.selectedSearchEvents, 'id').map(e => e.name).join('\n')}`}
    />
    <DetailsView />
    <Toolbar className="toolbar">
      {props.activeTab === 0 ?
        <FormControl className="form-control">
          <Input
            onChange={props.search}
            value={props.searchKey}
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {props.searchKey.length ?
                  <Icon style={{ cursor: 'pointer' }} onClick={props.search}>close</Icon>
                  : <Icon />}
              </InputAdornment>
            }
          />
        </FormControl>
      : <div />}
      <div>
        <Typography
          color="error"
          style={{
            display: 'inline',
          }}
        >
          {cityToTimezoneViewDictionary(props.selectedFacility.timezone)} Time Zone
        </Typography>
        <Button
          color="primary"
          onClick={props.openColors}
        >
          <Icon>palette</Icon>&nbsp;Event Colors
        </Button>
        &nbsp;
        <CreateButton
          module="Calendar"
          label="Add Event"
          onClick={props.setNewEditableModel}
        />
      </div>
    </Toolbar>
    { /* eslint-disable no-nested-ternary */
      props.contentLoading ?
        <Loader /> :
        (props.activeTab === 0 ?
        (!props.showSearchResult ?
          <Paper className="calendar-paper">
            <Calendar
              {...props.calendarConfig}
              components={{
                toolbar: CalendarToolbar,
                month: {
                  event: MonthEvent,
                },
              }}
              onSelectEvent={calendarEvent => props.showDetails(calendarEvent.id)}
              eventPropGetter={event => ({ style: { backgroundColor: `#${event.bgColor}`, color: `${colorContrast(event.bgColor)}` } })}
            />
          </Paper> :
          <div className="table-wrapper">
            <CalendarEventListComponent
              paginable
              selectable
              deletable
              page={props.searchResultPage}
              onChangePage={props.searchResultOnChangePage}
              onSelect={props.searchResultOnSelect}
              isSelectedAll={props.isSearchSelectedAll}
              onDelete={props.openSearchDeleteDialog}
              title="Search result"
              noMoreRecordText="No result found."
              eventList={props.searchResult}
              showDetails={props.navigateToDetails}
              orderBy={props.orderBy}
              order={props.order}
              handleChangeOrder={props.handleChangeOrder}
              selectAll={props.searchSelectAll}
              selectedEvents={props.selectedSearchEvents}
              printContent={props.printContent}
              setPrintContent={props.setPrintContent}
            />
          </div>) :
          <div className="table-wrapper">
            <CalendarEventListComponent
              printable
              title="Today&apos;s Schedule"
              noMoreRecordText="No events for today."
              eventList={props.todaysSchedule}
              showDetails={props.navigateToDetails}
              orderBy={props.orderBy}
              order={props.order}
              handleChangeOrder={props.handleChangeOrder}
              printContent={props.printContent}
              setPrintContent={props.setPrintContent}
            />
          </div>)}
  </div>
);

CalendarComponent.defaultProps = {
  printContent: null,
  searchResult: [],
  todaysSchedule: [],
};

CalendarComponent.propTypes = {
  calendarConfig: PropTypes.object.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleChangeOrder: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
  contentLoading: PropTypes.bool.isRequired,
  searchResultPage: PropTypes.number.isRequired,
  resetSearch: PropTypes.func.isRequired,
  searchResultOnChangePage: PropTypes.func.isRequired,
  searchResultOnSelect: PropTypes.func.isRequired,
  selectedSearchEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSearchSelectedAll: PropTypes.bool.isRequired,
  searchSelectAll: PropTypes.func.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.object),
  isSearchSelectedDeleteOpen: PropTypes.bool.isRequired,
  onSearchSelectedDelete: PropTypes.func.isRequired,
  openSearchDeleteDialog: PropTypes.func.isRequired,
  closeSearchDeleteDialog: PropTypes.func.isRequired,

  todaysSchedule: PropTypes.arrayOf(PropTypes.object),
  showSearchResult: PropTypes.bool.isRequired,
  selectedFacility: PropTypes.object.isRequired,
  openColors: PropTypes.func.isRequired,
  isColorsOpen: PropTypes.bool.isRequired,
  closeColors: PropTypes.func.isRequired,
  setNewEditableModel: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  navigateToDetails: PropTypes.func.isRequired,
  activeTab: PropTypes.any.isRequired,
  changeTab: PropTypes.func.isRequired,
  printContent: PropTypes.object,
  setPrintContent: PropTypes.func.isRequired,
};

export default CalendarComponent;
