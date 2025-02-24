import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Icon,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@material-ui/core';

import ReactToPrint from 'react-to-print';
import moment from 'moment';
import Calendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import dateformats from '../config/dateformats';

moment.locale('en');
Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const formatTime = time => moment(time, dateformats.dbTimeFormat)
  .format(dateformats.timeFormat);

const CalendarEventListComponent = props => (
  <Paper className={`table-paper ${props.className}`}>
    <Toolbar className="table-header print-hide">
      <Typography variant="title">{props.title}</Typography>
      {props.printable ?
        <ReactToPrint
          trigger={() => (
            <Button
              size="small"
              disabled={!props.eventList.length}
            >
              <Icon>print</Icon>
              &nbsp;Print
            </Button>)}
          content={() => props.printContent}
        /> : null}
      {props.deletable ?
        <Button
          color="primary"
          onClick={props.onDelete}
          disabled={!props.selectedEvents.length}
        >
          <Icon>delete</Icon>
          &nbsp;Delete
        </Button> : null}
    </Toolbar>
    <Table
      className="list"
      ref={el => props.setPrintContent(el)}
    >
      <TableHead>
        <TableRow>
          {props.selectable ?
            <TableCell padding="checkbox">
              <Checkbox
                value="Select All"
                style={{ height: 'inherit' }}
                checked={props.isSelectedAll}
                disabled={!props.eventList.length}
                onChange={() => props.selectAll(props.eventList
                  .slice(
                    props.page * 15,
                    (props.paginable ? (props.page * 15) + 15 : props.eventList.length),
                  ))}
              />
            </TableCell> : null}
          <TableCell
            sortDirection={props.orderBy === 'date' ? props.order : false}
          >
            <TableSortLabel
              active={props.orderBy === 'date'}
              direction={props.order}
              onClick={() => props.handleChangeOrder('date')}
            >
              Date &amp; Time
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
            Event Name
            </TableSortLabel>
          </TableCell>
          <TableCell
            sortDirection={props.orderBy === 'passenger' ? props.order : false}
          >
            <TableSortLabel
              active={props.orderBy === 'passenger'}
              direction={props.order}
              onClick={() => props.handleChangeOrder('passenger')}
            >
            Clients &amp; Appointments
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.eventList
          .slice(
            props.page * 15,
            (props.paginable ? (props.page * 15) + 15 : props.eventList.length),
          )
          .map(event => (
            <TableRow
              key={`${event.id} ${event.start}`}
              className={props.showDetails ? 'clickable' : ''}
            >
              {props.selectable ?
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={e => props.onSelect(e.target, event)}
                    disabled={moment().isAfter(moment(event.start))}
                    checked={props.selectedEvents
                      .filter(e =>
                        e.id === event.id && moment(e.start).diff(moment(event.start)) === 0)
                      .length > 0}
                  />
                </TableCell>
              : null}
              <TableCell
                onClick={() => props.showDetails(event)}
              >
                {`${moment(event.start).format(dateformats.dateFormat)}
                ${moment(event.start).format(dateformats.timeFormat)} -
                ${moment(event.end).format(dateformats.timeFormat)}`}
              </TableCell>
              <TableCell
                onClick={() => props.showDetails(event)}
              >
                {event.name}
              </TableCell>
              <TableCell
                onClick={() => props.showDetails(event)}
              >
                {event.passengers
                  .map(passenger => (
                    <div key={event.start + passenger.id}>
                      <span style={{ fontWeight: 'bold' }}>
                        {passenger.name + (passenger.room_number ? ` (room ${passenger.room_number})` : '')}
                        {': '}
                      </span>
                      {passenger.appointments
                        .map(appointment => `${formatTime(appointment.time)} @ ${appointment.location.name}`)
                        .join(', ')}
                    </div>
                  ))}
              </TableCell>
            </TableRow>))}
      </TableBody>
    </Table>
    {props.eventList.length ? null :
    <Typography className="table-empty" align="center" paragraph variant="caption">
      {props.noMoreRecordText}
    </Typography>}
    {props.paginable && props.eventList.length ?
      <TablePagination
        component="div"
        page={props.page}
        rowsPerPage={15}
        rowsPerPageOptions={[]}
        count={props.eventList.length}
        onChangePage={props.onChangePage}
      /> : ''}
  </Paper>
);

CalendarEventListComponent.defaultProps = {
  paginable: false,
  printable: false,
  selectable: false,
  isSelectedAll: false,
  deletable: false,
  printContent: null,
  className: '',
  eventList: [],
  selectedEvents: [],
  page: 0,
  onChangePage: () => {},
  showDetails: () => {},
  handleChangeOrder: () => {},
  selectAll: () => {},
  onDelete: () => {},
  onSelect: () => {},
};

CalendarEventListComponent.propTypes = {
  title: PropTypes.string.isRequired,
  noMoreRecordText: PropTypes.string.isRequired,
  paginable: PropTypes.bool,
  printable: PropTypes.bool,
  selectable: PropTypes.bool,
  isSelectedAll: PropTypes.bool,
  selectAll: PropTypes.func,
  selectedEvents: PropTypes.arrayOf(PropTypes.object),
  deletable: PropTypes.bool,
  printContent: PropTypes.object,
  className: PropTypes.string,
  setPrintContent: PropTypes.func.isRequired,
  eventList: PropTypes.array,
  showDetails: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleChangeOrder: PropTypes.func,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

export default CalendarEventListComponent;
