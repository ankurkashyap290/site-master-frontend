import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import { getEtcReporting } from 'reporting/store/actions';
import newOrderLogic from '../../common/new-order-logic';
import EtcReportsComponent from '../components/etc-reports';
import { etcReportListAdapter } from '../../store/adapters';
import { getSelectedModels } from '../store/adapters';

class EtcReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      order: 'desc',
      orderBy: 'mtd_soc',
      data: [],
    };
    this.printContent = null;
    this.setPrintContent = this.setPrintContent.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
  }

  componentDidMount() {
    this.props.getEtcReporting()
      .then(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(props) {
    this.setState(
      { data: etcReportListAdapter(props.etcModelList) },
      () => this.handleRequestSort(this.state.orderBy),
    );
  }

  setPrintContent(el) {
    if (this.printContent === null) {
      this.printContent = el;
      this.forceUpdate();
    }
  }

  handleRequestSort(orderBy) {
    const order = newOrderLogic(this.state.orderBy, orderBy, this.state.order);

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (a[orderBy] > b[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <EtcReportsComponent
        etcReportList={this.state.data}
        printContent={this.printContent}
        setPrintContent={this.setPrintContent}
        order={this.state.order}
        orderBy={this.state.orderBy}
        handleRequestSort={this.handleRequestSort}
        downloadPDF={this.downloadPDF}
      />);
  }
}

EtcReports.propTypes = {
  etcModelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getEtcReporting: PropTypes.func.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  etcModelList:
    getSelectedModels(reportingReducer.etcModelList, reportingReducer.selectedETCs),
});

const mapDispatchToProps = dispatch => ({
  getEtcReporting: () => dispatch(getEtcReporting()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EtcReports);
