import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from 'ui-elements/loader';
import { getFacilityDailyView } from 'reporting/store/actions';
import FacilityDailyViewComponent from '../components/facility-daily-view';

class FacilityDailyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.printContent = null;
    this.setPrintContent = this.setPrintContent.bind(this);
  }

  componentDidMount() {
    const { id, date } = this.props.match.params;
    this.props.getFacilityDailyView(id, date).then(() => {
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
    if (!this.props.facilityDailyEvents.length) {
      return null;
    }
    return (<FacilityDailyViewComponent
      facilityId={parseInt(this.props.match.params.id, 10)}
      events={this.props.facilityDailyEvents}
      date={this.props.match.params.date}
      printContent={this.printContent}
      setPrintContent={this.setPrintContent}
    />);
  }
}

FacilityDailyView.propTypes = {
  facilityDailyEvents: PropTypes.array.isRequired,
  getFacilityDailyView: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  facilityDailyEvents: reportingReducer.facilityDailyEvents,
});

const mapDispatchToProps = dispatch => ({
  getFacilityDailyView: (facilityId, date) => dispatch(getFacilityDailyView(facilityId, date)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityDailyView));
