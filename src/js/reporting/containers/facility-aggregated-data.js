import { connect } from 'react-redux';
import { throttle } from 'lodash';

import { saveBudget, changeBudget } from '../store/actions';
import FacilityAggregatedDataComponent from '../components/facility-aggregated-data';
import { getSelectedModels } from '../store/adapters';

const mapStateToProps = ({ reportingReducer }) => ({
  budget: () => {
    const { selectedFacilities, facilityModelList } = reportingReducer;

    if (selectedFacilities.length === 1) {
      const facilities =
        getSelectedModels(facilityModelList, selectedFacilities);
      return facilities[0].attributes.budget;
    } else if (
      selectedFacilities.length > 1 && facilityModelList.length !== selectedFacilities.length
    ) {
      const facilities =
        getSelectedModels(facilityModelList, selectedFacilities);
      return facilities
        .map(model => parseInt(model.attributes.budget, 10))
        .reduce((budgetA, budgetB) => budgetA + budgetB);
    } else if (facilityModelList.length) {
      return facilityModelList[0].attributes.organization.budget;
    }
    return 0;
  },
  facilityModelList:
    getSelectedModels(reportingReducer.facilityModelList, reportingReducer.selectedFacilities),
  allFacilityCount:
    reportingReducer.facilityModelList.length,
});

const mapDispatchToProps = dispatch => ({
  onChange: throttle(event => dispatch(changeBudget(event.target.value), 20)),
  saveBudget: throttle((event) => {
    let value = event.target.value.replace(',', '');

    if (!value) {
      value = 0;
    }
    dispatch(saveBudget(value));
  }, 1000),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityAggregatedDataComponent);
