import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
} from '@material-ui/core';
import { getSelectedModelNames } from '../store/adapters';

const EtcFilterComponent = (props) => {
  const selectedETCNames =
    getSelectedModelNames(props.etcModelList, props.selectedETCs);

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
        renderValue={() => selectedETCNames.join(', ')}
        value={props.selectedETCs}
        onChange={props.selectETCs}
      >
        {props.etcModelList.length > 1 ?
          <MenuItem
            value="Select All"
            checked={props.checkedAllETCs}
          >
            <Checkbox checked={props.checkedAllETCs} />
            <ListItemText primary={props.checkedAllETCs ? 'Select None' : 'All companies'} />
          </MenuItem>
        : null}
        {props.etcModelList.map(etc => (
          <MenuItem key={etc.id} value={parseInt(etc.id, 10)}>
            <Checkbox checked={props.selectedETCs.indexOf(parseInt(etc.id, 10)) > -1} />
            <ListItemText primary={etc.attributes.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

EtcFilterComponent.propTypes = {
  etcModelList: PropTypes.array.isRequired,
  selectETCs: PropTypes.func.isRequired,
  selectedETCs: PropTypes.arrayOf(PropTypes.number).isRequired,
  checkedAllETCs: PropTypes.bool.isRequired,
};

export default EtcFilterComponent;
