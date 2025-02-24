import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from 'ui-elements/loader';
import { getEtcDrilldown } from 'reporting/store/actions';
import EtcDrilldownComponent from '../components/etc-drilldown';

class EtcDrilldown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.printContent = null;
    this.setPrintContent = this.setPrintContent.bind(this);
  }

  componentDidMount() {
    this.props.getEtcDrilldown(this.props.match.params.id).then(() => {
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
      <EtcDrilldownComponent
        etcDetails={this.props.etcDetails}
        printContent={this.printContent}
        setPrintContent={this.setPrintContent}
      />
    );
  }
}

EtcDrilldown.propTypes = {
  etcDetails: PropTypes.object.isRequired,
  getEtcDrilldown: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  etcDetails: reportingReducer.etcDetails,
});

const mapDispatchToProps = dispatch => ({
  getEtcDrilldown: etcId => dispatch(getEtcDrilldown(etcId)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EtcDrilldown));
