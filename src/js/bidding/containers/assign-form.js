import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import CrudContainer from 'common/crud-container';
import { validationErrorSkeleton } from 'store/skeletons';
import { assignDrivers, setEditableModel } from '../store/actions';
import AssignFormComponent from '../components/assign-form';
import { driverSkeleton } from '../../store/skeletons';

class AssignForm extends CrudContainer {
  constructor(props) {
    super(props);

    this.state = { loading: false, errors: {} };

    this.handleDriverChange = this.handleDriverChange.bind(this);
    this.handleETCChange = this.handleETCChange.bind(this);
    this.handlePickupTime = this.handlePickupTime.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editableModel) {
      document.addEventListener('keydown', this.handleEscape);
      return;
    }
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleETCChange(event) {
    const attributes = cloneDeep(this.props.editableModel.attributes);
    const { value: etcId } = event.target;
    if (!attributes.drivers.filter(driver => driver.etc_id === etcId).length) {
      attributes.drivers.push(Object.assign({}, driverSkeleton, { etc_id: etcId }));
    } else {
      attributes.drivers = attributes.drivers.filter(driver => driver.etc_id !== etcId);
    }
    this.props.setEditableModel(Object.assign(
      {},
      this.props.editableModel,
      { attributes },
    ));
  }

  handleDriverChange(event) {
    this.setDriverAttribute(event.target.name, event.target.value);
  }

  handlePickupTime(time) {
    this.setDriverAttribute('pickup_time_moment', time);
  }

  setDriverAttribute(key, value) {
    const attributes = cloneDeep(this.props.editableModel.attributes);
    attributes.drivers[0][key] = value;
    this.props.setEditableModel(Object.assign(
      {},
      this.props.editableModel,
      { attributes },
    ));
  }

  handleChange(event) {
    const attributes = cloneDeep(this.props.editableModel.attributes);
    attributes[event.target.name] = event.target.value;
    this.props.setEditableModel(Object.assign(
      {},
      this.props.editableModel,
      { attributes },
    ));
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.handleSave();
    }
  }

  handleEscape(event) {
    if (event.keyCode === 27) {
      this.props.close();
    }
  }

  handleSave() {
    this.setErrors({});
    const errors = [];
    if (errors.length) {
      this.setErrors(errors);
      return;
    }

    this.setState({ loading: true });
    this.props.save(this.props.editableModel).then(() => {
      this.setState({ loading: false });
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

  render() {
    return (<AssignFormComponent
      {...this.props}
      loading={this.state.loading}
      errors={this.state.errors}
      onDriverChange={this.handleDriverChange}
      onETCChange={this.handleETCChange}
      etcs={this.props.externalDrivers}
      setTime={this.handlePickupTime}
      onChange={this.handleChange}
      onEnter={this.handleEnter}
      onSave={this.handleSave}
      onClose={this.props.close}
    />);
  }
}

AssignForm.defaultProps = {
  editableModel: null,
};

AssignForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  editableModel: PropTypes.object,
  internalDrivers: PropTypes.arrayOf(PropTypes.object).isRequired,
  externalDrivers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEditableModel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = ({ biddingReducer }) => ({
  isOpen: biddingReducer.editableModel !== null,
  editableModel: biddingReducer.editableModel,
  internalDrivers: biddingReducer.internalDrivers,
  externalDrivers: biddingReducer.externalDrivers,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  save: model => dispatch(assignDrivers(model)),
  close: () => dispatch(setEditableModel(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssignForm);
