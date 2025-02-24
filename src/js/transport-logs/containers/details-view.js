import { connect } from 'react-redux';

import { showDetails } from 'transport-logs/store/actions';
import DetailsViewComponent from '../components/details-view';

const mapStateToProps = ({ transportLogReducer }) => ({
  modelDetails: transportLogReducer.modelDetails,
});

const mapDispatchToProps = dispatch => ({
  showDetails: data => dispatch(showDetails(data)),
});

const DetailsView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsViewComponent);

export default DetailsView;
