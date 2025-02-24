import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Select, MenuItem, InputLabel } from '@material-ui/core';

import roles from '../../config/roles';
import colors from '../../config/colors';
import SidebarForm from '../../ui-elements/sidebar-form';
import TextInput from '../../ui-elements/text-input';

const UserSidebarFormComponent = (props) => {
  if (!props.editableModel) {
    return null;
  }
  let colorId = 0;
  let selectedColor = 'fff';
  if (props.editableModel.attributes.color_id > 0) {
    colorId = props.editableModel.attributes.color_id;
    selectedColor = colors[colorId].value;
  }
  return (
    <SidebarForm {...props}>
      <TextInput {...props} name="first_name" label="First Name" autoFocus />
      <TextInput {...props} name="middle_name" label="Middle Name" />
      <TextInput {...props} name="last_name" label="Last Name" />
      <TextInput {...props} name="email" label="Email" disabled={Boolean(props.editableModel.id)} />
      <TextInput {...props} name="phone" label="Phone" />
      {props.userRoles ?
        <FormControl className="form-control" error={Boolean(props.errors['data.attributes.role_id'])}>
          <InputLabel>Role</InputLabel>
          <Select name="role_id" value={props.editableModel.attributes.role_id} onChange={props.handleChange}>
            {props.userRoles.map(roleName => (
              <MenuItem key={roleName} value={roles[roleName]}>
                {roleName}
              </MenuItem>
            ))}
          </Select>
          {props.errors['data.attributes.role_id'] ?
            <FormHelperText>{props.errors['data.attributes.role_id'].detail}</FormHelperText>
            : ''}
        </FormControl> :
        ''
      }
      {props.editableModel.attributes.role_id === roles['Master User'] ?
        <FormControl className="form-control">
          <InputLabel>Color</InputLabel>
          <Select name="color_id" style={{ background: `#${selectedColor}` }} value={colorId} onChange={props.handleChange}>
            <MenuItem value={0} />
            {Object.entries(colors)
              .filter(color => color[1].type === 'internal')
              .map(color =>
                <MenuItem key={color[0]} value={color[0]} style={{ background: `#${color[1].value}` }} />)
            }
          </Select>
        </FormControl> :
        ''
      }
    </SidebarForm>
  );
};

UserSidebarFormComponent.defaultProps = {
  editableModel: null,
  userRoles: null,
};

UserSidebarFormComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  editableModel: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,

  userRoles: PropTypes.array,
};

export default UserSidebarFormComponent;
