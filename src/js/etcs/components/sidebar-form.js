import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem, InputLabel, Typography } from '@material-ui/core';

import LocationInput from 'locations/containers/location-input';
import colors from '../../config/colors';
import SidebarForm from '../../ui-elements/sidebar-form';
import TextInput from '../../ui-elements/text-input';

const ETCSidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  const externalColor = Object.entries(colors).filter(color => color[1].type === 'external');
  let colorId = externalColor[0][0];
  let selectedColor = externalColor[0][1].value;
  if (props.editableModel.attributes.color_id > 0) {
    colorId = props.editableModel.attributes.color_id;
    selectedColor = colors[colorId].value;
  }
  return (
    <SidebarForm {...props}>
      <TextInput {...props} name="name" label="Name" autoFocus />
      <FormControl className="form-control">
        <InputLabel>Color</InputLabel>
        <Select name="color_id" style={{ background: `#${selectedColor}` }} value={colorId} onChange={props.handleChange}>
          {externalColor.map(color =>
            <MenuItem key={color[0]} value={color[0]} style={{ background: `#${color[1].value}` }} />)}
        </Select>
      </FormControl>
      <TextInput {...props} name="emails" label="Emails (comma separated)" />
      <TextInput {...props} name="phone" label="Phone" />
      <Typography className="label">Location</Typography>
      <LocationInput
        onChange={props.setLocation}
        locationId={parseInt(props.editableModel.attributes.location_id, 10)}
      />
    </SidebarForm>
  );
};

ETCSidebarFormComponent.defaultProps = {
  editableModel: null,
};

ETCSidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default ETCSidebarFormComponent;
