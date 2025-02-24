import { connect } from 'react-redux';

import { getModelFromList, setEditableModel, setDeletableModel } from '../store/actions';
import DetailsViewComponent from '../components/details-view';

const mapStateToProps = ({ authReducer, calendarReducer }) => ({
  journeyUser: authReducer.journeyUser,
  modelDetails: calendarReducer.modelDetails,
});

const mapDispatchToProps = dispatch => ({
  showDetails: id => dispatch(getModelFromList(id)),
  setEditableModel: data => dispatch(setEditableModel(data)),
  setDeletableModel: data => dispatch(setDeletableModel(data)),
});

const DetailsView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsViewComponent);

export default DetailsView;
