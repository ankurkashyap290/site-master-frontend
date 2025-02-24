import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'ui-elements/loader';

import { setEditableModel, getTransportLog } from 'transport-logs/store/actions';
import { transportLogSkeleton } from 'store/skeletons';
import TransportLogComponent from '../components';

class TransportLogList extends React.Component {
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
    this.props.getTransportLog(1).then(() => {
      this.setState({ loading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.setState({ loading: true });
      this.props.getTransportLog(1).then(() => {
        this.printContent = null;
        this.setState({ loading: false });
      });
    }
  }

  onChangePage(event, page) {
    this.setState({ loading: true });
    this.props.getTransportLog(page + 1).then(() => {
      this.printContent = null;
      this.setState({ loading: false });
    });
  }

  setNewEditableModel() {
    this.props.setEditableModel(Object.assign({}, transportLogSkeleton));
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
      <TransportLogComponent
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

TransportLogList.defaultProps = {
  pagination: null,
};

TransportLogList.propTypes = {
  selectedFacility: PropTypes.object.isRequired,
  setEditableModel: PropTypes.func.isRequired,
  getTransportLog: PropTypes.func.isRequired,
  modelList: PropTypes.array.isRequired,
  pagination: PropTypes.object,
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = ({ facilityReducer, transportLogReducer }) => ({
  selectedFacility: facilityReducer.selectedFacility,
  modelList: transportLogReducer.modelList,
  pagination: transportLogReducer.pagination,
  filter: transportLogReducer.filter,
});

const mapDispatchToProps = dispatch => ({
  setEditableModel: editableModel => dispatch(setEditableModel(editableModel)),
  getTransportLog: page => dispatch(getTransportLog(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportLogList);
