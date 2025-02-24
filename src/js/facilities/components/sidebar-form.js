import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import SidebarForm from 'ui-elements/sidebar-form';
import TextInput from 'ui-elements/text-input';
import LocationInput from 'locations/containers/location-input';
import { getTimezones, timezoneToCityViewDictionary } from '../store/adapters';

const FacilitySidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  return (
    <SidebarForm {...props}>
      <TextInput {...props} name="name" label="Name" autoFocus />
      <FormControl className="select" error={Boolean(props.errors['data.attributes.timezone'])}>
        <InputLabel>Timezone</InputLabel>
        <Select
          name="timezone"
          value={props.editableModel.attributes.timezone || ''}
          onChange={props.handleChange}
          // Material UI hotfix, see https://github.com/mui-org/material-ui/issues/10601
          MenuProps={{
            PaperProps: {
              style: {
                transform: 'translate3d(0, 0, 0)',
              },
            },
          }}
        >
          {getTimezones().map(timezone => (
            <MenuItem key={timezone} value={timezoneToCityViewDictionary(timezone)}>
              {timezone} Time Zone
            </MenuItem>
          ))}
        </Select>
        {props.errors['data.attributes.timezone'] ?
          <FormHelperText>{props.errors['data.attributes.timezone'].detail}</FormHelperText>
        : null}
      </FormControl>
      {props.editableModel.id ?
        <div>
          <Typography className="label">Location</Typography>
          <LocationInput
            facility={props.editableModel}
            locationId={parseInt(props.editableModel.attributes.location_id, 10)}
            onChange={props.setLocation}
          />
          {props.errors['data.attributes.location_id'] ?
            <FormHelperText error>{props.errors['data.attributes.location_id'].detail}</FormHelperText>
          : null}
        </div>
      : null}
    </SidebarForm>
  );
};

FacilitySidebarFormComponent.defaultProps = {
  editableModel: null,
};

FacilitySidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  journeyUser: PropTypes.object.isRequired,

  setLocation: PropTypes.func.isRequired,
};

export default FacilitySidebarFormComponent;
