import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from 'ui-elements/loader';
import { getEtcDailyView } from 'reporting/store/actions';
import EtcDailyViewComponent from '../components/etc-daily-view';

class EtcDailyView extends React.Component {
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
    this.props.getEtcDailyView(id, date).then(() => {
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
    if (!this.props.etcDailyEvents.length) {
      return null;
    }
    return (<EtcDailyViewComponent
      etcId={parseInt(this.props.match.params.id, 10)}
      events={this.props.etcDailyEvents}
      date={this.props.match.params.date}
      printContent={this.printContent}
      setPrintContent={this.setPrintContent}
    />);
  }
}

EtcDailyView.propTypes = {
  etcDailyEvents: PropTypes.array.isRequired,
  getEtcDailyView: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  etcDailyEvents: reportingReducer.etcDailyEvents,
});

const mapDispatchToProps = dispatch => ({
  getEtcDailyView: (etcId, date) => dispatch(getEtcDailyView(etcId, date)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EtcDailyView));
