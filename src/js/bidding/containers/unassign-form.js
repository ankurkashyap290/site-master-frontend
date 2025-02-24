import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CrudContainer from 'common/crud-container';
import { setEditableModel, updateFee, declineAllDrivers } from '../store/actions';
import UnassignFormComponent from '../components/unassign-form';
import { eventSkeleton, validationErrorSkeleton } from '../../store/skeletons';

class UnassignForm extends CrudContainer {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      errors: {},
      acceptedDriverFee: props.editableModel.attributes.accepted_driver.fee,
    };
    this.declineAllDrivers = this.declineAllDrivers.bind(this);
    this.handleChangeFee = this.handleChangeFee.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.getEmails = this.getEmails.bind(this);
  }

  declineAllDrivers() {
    this.setState({ loading: true });
    this.props.declineAllDrivers(this.props.editableModel.id).then(() => {
      this.setState({ loading: false });
      this.props.onClose();
    });
  }

  handleChangeFee(event) {
    this.setState({ acceptedDriverFee: event.target.value.toString() });
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.handleSave();
    }
  }

  handleSave() {
    this.setErrors({});
    const errors = [];
    if (!this.state.acceptedDriverFee) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Must enter valid fee.', source: { pointer: 'driver.fee' } },
      ));
    }
    if (errors.length) {
      this.setErrors(errors);
      return;
    }
    this.setState({ loading: true });
    this.props.updateFee(
      this.props.editableModel.attributes.accepted_driver.id,
      this.state.acceptedDriverFee,
    ).then(() => {
      this.setState({ loading: false });
      this.props.onClose();
    }).catch((error) => {
      if (error.response.status < 500) {
        this.setErrors(error.response.data.errors);
      } else {
        this.addError(Object.assign(
          {},
          validationErrorSkeleton,
          { detail: error.response.statusText },
        ));
      }
      this.setState({ loading: false });
    });
  }

  getEmails() {
    const { attributes } = this.props.editableModel;
    /* eslint-disable-next-line */
    const { accepted_driver } = attributes;
    if (accepted_driver.details && accepted_driver.details.emails) {
      return accepted_driver.details.emails;
    }
    if (accepted_driver.details === null && accepted_driver.name) {
      return attributes.drivers[0].emails;
    }
    return null;
  }

  render() {
    return (<UnassignFormComponent
      {...this.props}
      loading={this.state.loading}
      errors={this.state.errors}
      acceptedDriverFee={this.state.acceptedDriverFee}
      emails={this.getEmails()}
      onChange={this.handleChangeFee}
      onEnter={this.handleEnter}
      onSave={this.handleSave}
      onDeclineAll={this.declineAllDrivers}
    />);
  }
}

UnassignForm.defaultProps = {
  editableModel: eventSkeleton,
};

UnassignForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  editableModel: PropTypes.object,
  updateFee: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ biddingReducer }) => ({
  isOpen: biddingReducer.editableModel !== null,
  editableModel: biddingReducer.editableModel,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  updateFee: (id, fee) => dispatch(updateFee(id, fee)),
  declineAllDrivers: eventId => dispatch(declineAllDrivers(eventId)),
  onClose: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnassignForm);
