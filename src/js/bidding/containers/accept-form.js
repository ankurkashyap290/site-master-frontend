import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CrudContainer from 'common/crud-container';
import { setEditableModel, declineAllDrivers, acceptDriver } from '../store/actions';
import AcceptFormComponent from '../components/accept-form';
import { validationErrorSkeleton } from '../../store/skeletons';

class AcceptForm extends CrudContainer {
  constructor(props) {
    super(props);

    this.state = { loading: false, errors: {}, selectedDriverId: 0 };
    this.handleSave = this.handleSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.declineAllDrivers = this.declineAllDrivers.bind(this);
  }

  handleClick(selectedDriverId) {
    this.setState({ selectedDriverId });
  }

  handleSave() {
    this.setErrors({});
    const errors = [];
    if (!this.state.selectedDriverId) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Must select a driver.', source: { pointer: 'driver.id' } },
      ));
    }
    if (errors.length) {
      this.setErrors(errors);
      return;
    }
    this.setState({ loading: true });
    this.props.acceptDriver(this.state.selectedDriverId).then(() => {
      this.setState({ loading: false });
      this.props.onClose();
    });
  }

  declineAllDrivers() {
    this.props.declineAllDrivers(this.props.editableModel.id).then(this.props.onClose);
  }

  render() {
    return (<AcceptFormComponent
      {...this.props}
      loading={this.state.loading}
      errors={this.state.errors}
      handleClick={this.handleClick}
      selectedDriverId={this.state.selectedDriverId}
      onAccept={this.handleSave}
      onDeclineAll={this.declineAllDrivers}
    />);
  }
}

AcceptForm.defaultProps = {
  editableModel: null,
};

AcceptForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  editableModel: PropTypes.object,
  acceptDriver: PropTypes.func.isRequired,
  declineAllDrivers: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ biddingReducer }) => ({
  isOpen: biddingReducer.editableModel !== null,
  editableModel: biddingReducer.editableModel,
  externalDrivers: biddingReducer.externalDrivers,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(setEditableModel(null)),
  acceptDriver: id => dispatch(acceptDriver(id)),
  declineAllDrivers: eventId => dispatch(declineAllDrivers(eventId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AcceptForm);
