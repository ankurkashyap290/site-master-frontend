import { connect } from 'react-redux';

import { showDetails } from 'transport-billing-logs/store/actions';
import DetailsViewComponent from '../components/details-view';

const mapStateToProps = ({ transportBillingLogReducer }) => ({
  modelDetails: transportBillingLogReducer.modelDetails,
});

const mapDispatchToProps = dispatch => ({
  showDetails: data => dispatch(showDetails(data)),
});

const DetailsView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsViewComponent);

export default DetailsView;
