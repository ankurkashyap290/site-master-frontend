import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flattenDepth } from 'lodash';

import { setSelectedETCs } from 'reporting/store/actions';
import EtcFilterComponent from '../components/etc-filter';
import { getModelIds } from '../store/adapters';

class EtcFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAllETCs: true,
      selectedETCs: [],
      etcIds: null,
    };

    this.state.etcIds = getModelIds(this.props.etcModelList);
    this.state.selectedETCs = this.state.etcIds;
    this.props.setSelectedETCs(this.state.etcIds);

    this.selectETCs = this.selectETCs.bind(this);
  }

  selectETCs(event) {
    event.preventDefault();
    if (event.target.value.indexOf('Select All') > -1) {
      this.setState(
        {
          selectedETCs: this.state.checkedAllETCs ? [] : this.state.etcIds,
          checkedAllETCs: !this.state.checkedAllETCs,
        },
        () => this.props.setSelectedETCs(this.state.selectedETCs),
      );
    } else {
      const selectedEtcIds = flattenDepth(event.target.value);

      this.setState(
        { selectedETCs: selectedEtcIds },
        () => this.props.setSelectedETCs(this.state.selectedETCs),
      );
    }
  }

  render() {
    return (
      <EtcFilterComponent
        etcModelList={this.props.etcModelList}
        selectETCs={this.selectETCs}
        selectedETCs={this.state.selectedETCs}
        checkedAllETCs={this.state.checkedAllETCs}
      />);
  }
}
EtcFilter.propTypes = {
  etcModelList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedETCs: PropTypes.func.isRequired,
};

const mapStateToProps = ({ reportingReducer }) => ({
  etcModelList: reportingReducer.etcModelList,
});

const mapDispatchToProps = dispatch => ({
  setSelectedETCs: etcIds => dispatch(setSelectedETCs(etcIds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EtcFilter);
