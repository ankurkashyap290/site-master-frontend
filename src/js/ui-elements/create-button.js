import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from '@material-ui/core';

const CreateButton = props => (
  <Button
    variant="raised"
    color="secondary"
    aria-label="add"
    className="add-new-button"
    onClick={props.onClick}
    disabled={!props.journeyUser.isAllowed('create', props.module)}
  >
    <Icon>add</Icon> {props.label}
  </Button>
);

CreateButton.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

export default connect(
  mapStateToProps,
  null,
)(CreateButton);
