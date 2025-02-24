import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Select,
  MenuItem,
  Input,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import { getSelectedModelNames } from '../store/adapters';

const FacilityFilterComponent = (props) => {
  const selectedFacilityNames =
    getSelectedModelNames(props.facilityModelList, props.selectedFacilities);

  return (
    <FormControl className="form-control">
      <Select
        multiple
        SelectDisplayProps={{
          style: {
            width: '300px',
          },
        }}
        input={<Input id="select-multiple-checkbox" />}
        renderValue={() => selectedFacilityNames.join(', ')}
        value={props.selectedFacilities}
        onChange={props.selectFacilities}
      >
        {props.facilityModelList.length > 1 ?
          <MenuItem
            value="Select All"
            checked={props.checkedAllFacilities}
          >
            <Checkbox checked={props.checkedAllFacilities} />
            <ListItemText primary={props.checkedAllFacilities ? 'Select None' : 'All facility'} />
          </MenuItem>
        : null}
        {props.facilityModelList.map(facility => (
          <MenuItem key={facility.id} value={parseInt(facility.id, 10)}>
            <Checkbox checked={props.selectedFacilities.indexOf(parseInt(facility.id, 10)) > -1} />
            <ListItemText primary={facility.attributes.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

FacilityFilterComponent.propTypes = {
  facilityModelList: PropTypes.array.isRequired,
  selectFacilities: PropTypes.func.isRequired,
  selectedFacilities: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkedAllFacilities: PropTypes.bool.isRequired,
};

export default FacilityFilterComponent;
