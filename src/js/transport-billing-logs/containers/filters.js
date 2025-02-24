import { connect } from 'react-redux';

import { setFilterType } from 'transport-billing-logs/store/actions';
import TransportBillingLogFilterComponent from '../components/filter';

const mapDispatchToProps = dispatch => ({
  setFilterType: (type) => {
    dispatch(setFilterType(type));
  },
});

const TransportBillingLogFilter = connect(
  null,
  mapDispatchToProps,
)(TransportBillingLogFilterComponent);

export default TransportBillingLogFilter;
