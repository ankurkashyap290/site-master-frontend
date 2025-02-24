import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import { setEditableModel, getTransportBillingLog } from 'transport-billing-logs/store/actions';
import { transportBillingLogSkeleton } from 'store/skeletons';
import TransportBillingLogComponent from '../components';

class TransportBillingLogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.printContent = null;
    this.props.setEditableModel(null);
    this.setNewEditableModel = this.setNewEditableModel.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.setPrintContent = this.setPrintContent.bind(this);
  }

  componentDidMount() {
    this.props.getTransportBillingLog(1).then(() => {
      this.setState({ loading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.setState({ loading: true });
      this.props.getTransportBillingLog(1).then(() => {
        this.printContent = null;
        this.setState({ loading: false });
      });
    }
  }

  onChangePage(event, page) {
    this.setState({ loading: true });
    this.props.getTransportBillingLog(page + 1).then(() => {
      this.printContent = null;
      this.setState({ loading: false });
    });
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign({}, transportBillingLogSkeleton));
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
      <TransportBillingLogComponent
        selectedFacility={this.props.selectedFacility}
        setNewEditableModel={this.setNewEditableModel}
        modelList={this.props.modelList}
        pagination={this.props.pagination}
        onChangePage={this.onChangePage}
        printContent={this.printContent}
        setPrintContent={this.setPrintContent}
        filter={this.props.filter}
      />
    );
  }
}

TransportBillingLogList.defaultProps = {
  pagination: null,
};

TransportBillingLogList.propTypes = {
  selectedFacility: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  getTransportBillingLog: PropTypes.func.isRequired,
  modelList: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = ({ facilityReducer, transportBillingLogReducer }) => ({
  selectedFacility: facilityReducer.selectedFacility,
  modelList: transportBillingLogReducer.modelList,
  pagination: transportBillingLogReducer.pagination,
  filter: transportBillingLogReducer.filter,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  getTransportBillingLog: page => dispatch(getTransportBillingLog(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportBillingLogList);
