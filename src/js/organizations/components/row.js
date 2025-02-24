import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Icon, TableCell, TableRow } from '@material-ui/core';
import { Link as LinkTo } from 'react-router-dom';

const OrganizationRowComponent = (props) => {
  const disabled = !props.journeyUser.isAllowed('create', 'Organizations');
  return (
    <TableRow key={props.data.id}>
      <TableCell numeric>
        {props.data.id}
      </TableCell>
      <TableCell>
        {props.data.attributes.name}
      </TableCell>
      <TableCell>
        {props.data.attributes.facility_limit}
      </TableCell>
      <TableCell className="control-buttons">
        <LinkTo
          to={`/organization/${props.data.id}/organization-admins`}
          className="styleless"
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
            }
          }}
        >
          <IconButton
            color="primary"
            disabled={disabled}
          >
            <Icon>people</Icon>
          </IconButton>
        </LinkTo>
        <IconButton
          color="primary"
          onClick={() => props.setEditableModel(props.data)}
        >
          <Icon>mode_edit</Icon>
        </IconButton>
        <IconButton
          color="primary"
          disabled={disabled}
          onClick={() => props.setDeletableModel(props.data)}
        >
          <Icon>delete</Icon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

OrganizationRowComponent.propTypes = {
  data: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  setDeletableModel: PropTypes.func.isRequired,
  journeyUser: PropTypes.object.isRequired,
};

export default OrganizationRowComponent;
