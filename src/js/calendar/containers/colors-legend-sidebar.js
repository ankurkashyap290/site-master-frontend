import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColorsLegendSidebarComponent from '../components/colors-legend-sidebar';
import { getETCList } from '../../etcs/store/actions';
import { getUserList } from '../../users/store/actions';
import roles from '../../config/roles';

class ColorsLegendSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.props.getInternalDriverList(
      this.props.selectedFacility.organization_id,
      this.props.selectedFacility.id,
    ).then(() => {
      this.props.getETCList().then(() => {
        this.setState({ loading: false });
      });
    }).catch(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <ColorsLegendSidebarComponent
        etcList={this.props.etcList}
        internalDriverList={this.props.internalDriverList}
        loading={this.state.loading}
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
      />
    );
  }
}

ColorsLegendSidebar.propTypes = {
  selectedFacility: PropTypes.object.isRequired,
  etcList: PropTypes.arrayOf(PropTypes.object).isRequired,
  internalDriverList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  getETCList: PropTypes.func.isRequired,
  getInternalDriverList: PropTypes.func.isRequired,
};

const mapStateToProps = ({ etcReducer, userReducer }) => ({
  etcList: etcReducer.modelList,
  internalDriverList: userReducer.modelList,
});

const mapDispatchToProps = dispatch => ({
  getETCList: () => dispatch(getETCList()),
  getInternalDriverList: (parentOrganizationId, parentFacilityId) =>
    dispatch(getUserList(parentOrganizationId, parentFacilityId, roles['Master User'])),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorsLegendSidebar);
