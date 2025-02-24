import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import Loader from 'ui-elements/loader';

import CrudContainer from '../../common/crud-container';
import MyProfileComponent from '../components/my-profile';
import { saveModel } from '../../users/store/actions';
import { setUserData } from '../store/actions';
import { validationErrorSkeleton } from '../../store/skeletons';

class MyProfile extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      editableModel: Object.assign({}, props.journeyUser),
      errors: {},
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDiscard = this.handleDiscard.bind(this);
  }

  handleChange(event) {
    const attributes = cloneDeep(this.state.editableModel.attributes);
    attributes[event.target.name] = event.target.value;

    this.setState({
      editableModel: Object.assign(
        {},
        this.state.editableModel,
        { attributes },
      ),
    });
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
    if (!this.state.editableModel.attributes.first_name.length) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'First Name is required.', source: { pointer: 'data.attributes.first_name' } },
      ));
    }
    if (!this.state.editableModel.attributes.last_name.length) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Last Name is required.', source: { pointer: 'data.attributes.last_name' } },
      ));
    }
    if (errors.length) {
      this.setErrors(errors);
      return;
    }

    this.setState({ loading: true });
    this.props.save(this.state.editableModel).then(() => {
      this.props.setJourneyUser(this.state.editableModel);
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

  handleDiscard() {
    this.setState({
      editableModel: Object.assign(
        {},
        this.props.journeyUser,
      ),
    });
  }

  render() {
    if (!this.state.editableModel) {
      return <Loader />;
    }
    return (
      <MyProfileComponent
        loading={this.state.loading}
        editableModel={this.state.editableModel}
        errors={this.state.errors}
        onSave={this.handleSave}
        onDiscard={this.handleDiscard}
        handleChange={this.handleChange}
        handleEnter={this.handleEnter}
      />
    );
  }
}

MyProfile.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  setJourneyUser: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

const mapDispatchToProps = dispatch => ({
  setJourneyUser: model => dispatch(setUserData(model)),
  save: model => dispatch(saveModel(model)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyProfile);
