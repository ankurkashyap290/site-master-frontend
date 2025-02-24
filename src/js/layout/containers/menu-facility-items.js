import { connect } from 'react-redux';

import MenuFacilityItemsComponent from '../components/menu-facility-items';

const mapStateToProps = ({ facilityReducer }) => ({
  selectedFacility: facilityReducer.selectedFacility,
});

const MenuFacilityItems = connect(
  mapStateToProps,
  null,
)(MenuFacilityItemsComponent);

export default MenuFacilityItems;
