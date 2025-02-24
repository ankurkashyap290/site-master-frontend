import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';

import MenuItem from './menu-item';

const MenuFacilityItemsComponent = props => (
  <List>
    {props.journeyUser.isAllowed('view', 'Calendar') ?
      <MenuItem to={`/facility/${props.facility.id}/calendar`} icon="event" label="Calendar" />
    : null}

    {props.journeyUser.isAllowed('view', 'Bidding') ?
      <MenuItem to={`/facility/${props.facility.id}/bidding`} icon="gavel" label="Bidding" />
    : null}

    {props.journeyUser.isAllowed('view', 'Users') ?
      <MenuItem to={`/facility/${props.facility.id}/users`} icon="people" label="Users" />
    : null}

    {props.journeyUser.isAllowed('view', 'Policies') ?
      <MenuItem to={`/facility/${props.facility.id}/user-permissions`} icon="lock" label="User Permissions" />
    : null}

    {props.journeyUser.isAllowed('view', 'Clients') ?
      <MenuItem to={`/facility/${props.facility.id}/clients`} icon="airline_seat_recline_normal" label="Clients" />
    : null}

    {props.journeyUser.isAllowed('view', 'Locations') ?
      <MenuItem to={`/facility/${props.facility.id}/locations`} icon="location_on" label="Locations" />
    : null}

    {props.journeyUser.isAllowed('view', 'External Transportation Companies') ?
      <MenuItem to={`/facility/${props.facility.id}/etcs`} icon="airport_shuttle" label="Ext. Transp. Companies" />
    : null}

    {props.journeyUser.isAllowed('view', 'Transport Logs') ?
      <MenuItem to={`/facility/${props.facility.id}/transport-logs`} icon="format_list_bulleted" label="Transport Logs" />
    : null}

    {props.journeyUser.isAllowed('view', 'Transport Billing Logs') ?
      <MenuItem to={`/facility/${props.facility.id}/transport-billing-logs`} icon="format_list_bulleted" label="Transport Billing Logs" />
    : null}
  </List>
);

MenuFacilityItemsComponent.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  facility: PropTypes.object.isRequired,
};

export default MenuFacilityItemsComponent;
