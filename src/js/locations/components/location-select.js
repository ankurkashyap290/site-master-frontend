import React from 'react';
import PropTypes from 'prop-types';
import { Select, Paper, Icon, Typography, FormControl, FormHelperText, MenuItem, IconButton } from '@material-ui/core';
import LocationView from '../../ui-elements/location-view';

const LocationSelect = props => (
  <Paper className="location-select">
    <div className="select-wrapper">
      <FormControl className="select" error={Boolean(props.error.detail)}>
        <Select
          value={props.selectedLocation}
          onChange={props.handleChange}
        >
          {props.modelList.map(location => (
            <MenuItem key={location.id} value={location.id}>{location.attributes.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText error>{props.error.detail}</FormHelperText>
      </FormControl>
      <IconButton
        size="small"
        color="secondary"
        aria-label="add"
        className="add-new-button"
        onClick={props.addNew}
      >
        <Icon>add</Icon>
      </IconButton>
    </div>
    <div className="location-details">
      {props.location ? (
        <Typography>
          <LocationView locationAttributes={props.location.attributes} hideName />
        </Typography>
      ) : null}
    </div>
  </Paper>
);

LocationSelect.defaultProps = {
  selectedLocation: '',
  location: null,
  error: {},
};

LocationSelect.propTypes = {
  selectedLocation: PropTypes.string,
  modelList: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  location: PropTypes.object,
  addNew: PropTypes.func.isRequired,
  error: PropTypes.object,
};

const LocationInlineForm = (props) => {
  if (props.showForm) {
    return null;
  }
  return <LocationSelect {...props} />;
};

LocationInlineForm.defaultProps = {
  selectedLocation: '',
  location: null,
};

LocationInlineForm.propTypes = {
  selectedLocation: PropTypes.string,
  modelList: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  location: PropTypes.object,
  addNew: PropTypes.func.isRequired,
  showForm: PropTypes.bool.isRequired,
};

export default LocationInlineForm;
