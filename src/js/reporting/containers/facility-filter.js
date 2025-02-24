import { flattenDepth } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSelectedFacilities } from 'reporting/store/actions';
import FacilityFilterComponent from '../components/facility-filter';
import { getModelIds } from '../store/adapters';

class FacilityFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAllFacilities: true,
      selectedFacilities: [],
      facilityIds: null,
    };

    this.state.facilityIds = getModelIds(this.props.facilityModelList);
    this.state.selectedFacilities = this.state.facilityIds;
    this.props.setSelectedFacilities(this.state.facilityIds);

    this.selectFacilities = this.selectFacilities.bind(this);
  }

  selectFacilities(event) {
    event.preventDefault();
    if (event.target.value.indexOf('Select All') > -1) {
      this.setState(
        {
          selectedFacilities: this.state.checkedAllFacilities ? [] : this.state.facilityIds,
          checkedAllFacilities: !this.state.checkedAllFacilities,
        },
        () => this.props.setSelectedFacilities(this.state.selectedFacilities),
      );
    } else {
      const selectedFacilityIds = flattenDepth(event.target.value);

      this.setState(
        { selectedFacilities: selectedFacilityIds },
        () => this.props.setSelectedFacilities(this.state.selectedFacilities),
      );
    }
  }

  render() {
    return (
      <FacilityFilterComponent
        facilityModelList={this.props.facilityModelList}
        selectFacilities={this.selectFacilities}
        selectedFacilities={this.state.selectedFacilities}
        checkedAllFacilities={this.state.checkedAllFacilities}
      />);
  }
}

FacilityFilter.propTypes = {
  facilityModelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedFacilities: PropTypes.func.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  facilityModelList: reportingReducer.facilityModelList,
});

const mapDispatchToProps = dispatch => ({
  setSelectedFacilities: facilityIds => dispatch(setSelectedFacilities(facilityIds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityFilter);
