import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AssignFormComponent from './assign-form';
import AcceptFormComponent from './accept-form';
import UnassignFormComponent from './unassign-form';
import CrudContainer from '../../common/crud-container';

class BiddingSidebarForm extends CrudContainer {
  constructor(props) {
    super(props);
    this.getTitle = this.getTitle.bind(this);
  }

  getTitle() {
    if (this.props.editableModel && this.props.editableModel.id) {
      return this.props.editableModel.attributes.name;
    }
    return '<unknown>';
  }

  render() {
    if (!this.props.editableModel) {
      return null;
    }
    switch (this.props.editableModel.attributes.status) {
      case 'unassigned':
        return <AssignFormComponent {...this.props} getTitle={this.getTitle} />;
      case 'pending':
        return <AcceptFormComponent {...this.props} getTitle={this.getTitle} />;
      case 'accepted':
        return <UnassignFormComponent {...this.props} getTitle={this.getTitle} />;
      default:
        return null;
    }
  }
}

BiddingSidebarForm.defaultProps = {
  editableModel: null,
};

BiddingSidebarForm.propTypes = {
  editableModel: PropTypes.object,
};

const mapStateToProps = ({ biddingReducer }) => ({
  editableModel: biddingReducer.editableModel,
});

export default connect(
  mapStateToProps,
  null,
)(BiddingSidebarForm);
