import { connect } from 'react-redux';

import EtcAggregatedDataComponent from '../components/etc-aggregated-data';
import { getSelectedModels } from '../store/adapters';

const mapStateToProps = ({ reportingReducer }) => ({
  etcModelList:
    getSelectedModels(reportingReducer.etcModelList, reportingReducer.selectedETCs),
});

export default connect(
  mapStateToProps,
  null,
)(EtcAggregatedDataComponent);
