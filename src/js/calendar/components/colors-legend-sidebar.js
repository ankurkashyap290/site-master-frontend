import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Drawer,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Icon,
  IconButton,
} from '@material-ui/core';
import colors from '../../config/colors';

const ColorsLegendSidebarComponent = props => (
  <Drawer className="sidebar-form colors-legend" anchor="right" open={props.isOpen} onClose={props.onClose}>
    <div className="back-button-container">
      <IconButton
        onClick={props.onClose}
        color="primary"
        className="back-button"
      >
        <Icon>arrow_back</Icon>
      </IconButton>
      <Typography variant="title">Event Colors</Typography>
    </div>
    <List>
      <ListItem>
        <div className="color-circle" style={{ backgroundColor: '#757575' }} />
        <ListItemText disableTypography>
          <Typography variant="body2">
            Unassigned Event
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
    <Typography variant="subheading">Internal Drivers</Typography>
    <List>
      {props.internalDriverList.map(item => (
        <ListItem key={item.id}>
          <div
            className="color-circle"
            style={{ backgroundColor: item.attributes.color_id ? `#${colors[item.attributes.color_id].value}` : '#424242' }}
          />
          <ListItemText disableTypography>
            <Typography variant="body2">
              {item.attributes.name}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
      {!props.internalDriverList.length ?
        <ListItem>
          <ListItemText secondary="No Internal Driver present." />
        </ListItem>
      : ''}
    </List>
    {/* Divider */}
    <Typography variant="subheading">External Transportation Companies</Typography>
    <List>
      <ListItem>
        <div className="color-circle unapproved-driver" style={{ backgroundColor: '#424242' }} />
        <ListItemText disableTypography>
          <Typography variant="body2">
            Unapproved Company
          </Typography>
        </ListItemText>
      </ListItem>
      {props.etcList.map(item => (
        <ListItem key={item.id}>
          <div className="color-circle" style={{ backgroundColor: `#${colors[item.attributes.color_id].value}` }} />
          <ListItemText disableTypography>
            <Typography variant="body2">
              {item.attributes.name}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
      {!props.etcList.length ?
        <ListItem>
          <ListItemText secondary="No External Transportation Company present." />
        </ListItem>
      : ''}
    </List>
    <div className="button-container">
      {props.loading ? <CircularProgress color="secondary" className="smallCircularProgress" /> : null}
    </div>
  </Drawer>
);

ColorsLegendSidebarComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  etcList: PropTypes.arrayOf(PropTypes.object).isRequired,
  internalDriverList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ColorsLegendSidebarComponent;
