import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import { setLoading, getFacilityReporting } from 'reporting/store/actions';
import FacilityReportsComponent from '../components/facility-reports';
import { getSelectedModels } from '../store/adapters';

class FacilityReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.printContent = null;
    this.setPrintContent = this.setPrintContent.bind(this);
  }

  componentDidMount() {
    this.props.getFacilityReporting()
      .then(() => {
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
      <FacilityReportsComponent
        facilityModelList={this.props.facilityModelList}
        printContent={this.printContent}
        setPrintContent={this.setPrintContent}
      />
    );
  }
}

FacilityReports.propTypes = {
  facilityModelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFacilityReporting: PropTypes.func.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  facilityModelList:
    getSelectedModels(reportingReducer.facilityModelList, reportingReducer.selectedFacilities),
});

const mapDispatchToProps = dispatch => ({
  getFacilityReporting: () => dispatch(getFacilityReporting()),
  setLoading: loading => dispatch(setLoading(loading)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityReports);
