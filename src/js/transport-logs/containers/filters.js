import { connect } from 'react-redux';

import { setFilterType } from 'transport-logs/store/actions';
import TransportLogFilterComponent from '../components/filter';

const mapDispatchToProps = dispatch => ({
  setFilterType: (type) => {
    dispatch(setFilterType(type));
  },
});

const TransportLogFilter = connect(
  null,
  mapDispatchToProps,
)(TransportLogFilterComponent);

export default TransportLogFilter;
