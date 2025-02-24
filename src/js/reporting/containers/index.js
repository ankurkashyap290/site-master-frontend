import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReportingComponent from '../components';

class Reporting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'facility',
    };
    this.printContent = null;
    this.setPrintContent = this.setPrintContent.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentWillMount() {
    const hash = this.props.location.hash.substr(1);
    if (['facility', 'etc'].includes(hash)) {
      this.setState({ activeTab: hash });
    }
  }

  setPrintContent(el) {
    if (this.printContent === null) {
      this.printContent = el;
      this.forceUpdate();
    }
  }

  changeTab(event, value) {
    this.setState({ activeTab: value });
    this.printContent = null;
  }

  render() {
    return (<ReportingComponent
      activeTab={this.state.activeTab}
      changeTab={this.changeTab}
      printContent={this.printContent}
      setPrintContent={this.setPrintContent}
      disabled={this.props.loading}
    />);
  }
}

Reporting.propTypes = {
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  loading: reportingReducer.loading,
});

export default connect(
  mapStateToProps,
  null,
)(Reporting);
