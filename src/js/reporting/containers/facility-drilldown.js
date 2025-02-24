import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from 'ui-elements/loader';
import { getFacilityDrilldown } from 'reporting/store/actions';
import FacilityDrilldownComponent from '../components/facility-drilldown';

class FacilityDrilldown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.printContent = null;
    this.setPrintContent = this.setPrintContent.bind(this);
  }

  componentDidMount() {
    this.props.getFacilityDrilldown(this.props.match.params.id).then(() => {
      this.setState({ loading: false });
    });
  }

  setPrintContent(el) {
    if (this.printContent === null) {
      this.printContent = el;
      this.forceUpdate();
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <FacilityDrilldownComponent
        facilityDetails={this.props.facilityDetails}
        printContent={this.printContent}
        setPrintContent={this.setPrintContent}
      />
    );
  }
}

FacilityDrilldown.propTypes = {
  facilityDetails: PropTypes.object.isRequired,
  getFacilityDrilldown: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  facilityDetails: reportingReducer.facilityDetails,
});

const mapDispatchToProps = dispatch => ({
  getFacilityDrilldown: facilityId => dispatch(getFacilityDrilldown(facilityId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityDrilldown));
