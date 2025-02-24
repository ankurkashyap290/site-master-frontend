import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import PolicyListComponent from '../components';
import {
  getPolicyList,
  setEditableModel,
} from '../store/actions';

class PolicyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.props.setEditableModel(null);
  }

  componentDidMount() {
    this.props.getPolicyList(this.props.selectedFacility.id).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <PolicyListComponent
        modelList={this.props.modelList}
        setEditableModel={this.props.setEditableModel}
      />
    );
  }
}

PolicyList.defaultProps = {
  modelList: [],
};

PolicyList.propTypes = {
  selectedFacility: PropTypes.object.isRequired,
  modelList: PropTypes.arrayOf(PropTypes.object),
  setEditableModel: PropTypes.func.isRequired,
  getPolicyList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ facilityReducer, policyReducer }) => ({
  selectedFacility: facilityReducer.selectedFacility,
  modelList: policyReducer.modelList,
});

const mapDispatchToProps = dispatch => ({
  getPolicyList: facilityId => dispatch(getPolicyList(facilityId)),
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PolicyList);
