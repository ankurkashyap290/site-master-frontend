import { connect } from 'react-redux';

import { showDetails } from '../store/actions';
import DetailsViewComponent from '../components/details-view';

const mapStateToProps = ({ clientReducer }) => ({
  modelDetails: clientReducer.modelDetails,
});

const mapDispatchToProps = dispatch => ({
  showDetails: data => dispatch(showDetails(data)),
});

const DetailsView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsViewComponent);

export default DetailsView;
