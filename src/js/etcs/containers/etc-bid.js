import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import moment from 'moment';

import Loader from 'ui-elements/loader';
import { validationErrorSkeleton } from 'store/skeletons';
import { getEtcBid, saveBid } from '../store/actions';
import EtcBidComponent from '../components/etc-bid';
import CrudContainer from '../../common/crud-container';
import dateformats from '../../config/dateformats';

class EtcBid extends CrudContainer {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errors: {},
      editableModel: null,
      declinedByDriver: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setTime = this.setTime.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    this.props.getEtcBid(this.props.match.params.hash)
      .then(() => {
        if (
          this.state.editableModel.attributes.status === 'pending' &&
          this.props.match.params.status === 'declined'
        ) {
          this.props.save({
            status: this.props.match.params.status,
            hash: this.props.match.params.hash,
          }).then(() => {
            this.setState({ loading: false, declinedByDriver: true });
          });
          return;
        }
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.driver) {
      const editableModel = cloneDeep(nextProps.driver);
      if (editableModel.id) {
        editableModel.attributes.pickup_time = moment(
          editableModel.attributes.pickup_time || moment().format(dateformats.timeFormat),
          dateformats.dbTimeFormat,
        );
      }
      this.setState({ editableModel, errors: {} });
    }
  }

  handleChange(event) {
    const attributes = cloneDeep(this.state.editableModel.attributes);
    attributes[event.target.name] = event.target.value;
    this.setState({
      editableModel: Object.assign(
        {},
        this.state.editableModel,
        { attributes },
      ),
    });
  }

  setTime(dateTime) {
    const date = this.state.editableModel.attributes.pickup_time;
    date.hour(dateTime.hour());
    date.minute(dateTime.minute());
    date.second(dateTime.second());
    this.handleChange({ target: { name: 'pickup_time', value: date } });
  }

  handleSave() {
    this.setErrors({});
    const { attributes } = this.state.editableModel;
    const errors = [];

    if (!attributes.fee) {
      errors.push(Object.assign(
        {},
        validationErrorSkeleton,
        { detail: 'Transport fee is required.', source: { pointer: 'data.attributes.fee' } },
      ));
    }
    if (errors.length) {
      this.setErrors(errors);
      return;
    }

    this.setState({ loading: true });
    const model = {
      fee: attributes.fee,
      pickup_time: attributes.pickup_time.format(dateformats.dbTimeFormat),
      status: this.props.match.params.status,
      hash: this.props.match.params.hash,
    };
    this.props.save(model).then(() => {
      this.setState({ loading: false });
    }).catch((error) => {
      if (error.response.status < 500) {
        this.setErrors(error.response.data.errors);
      } else {
        this.addError(Object.assign(
          {},
          validationErrorSkeleton,
          { detail: error.response.statusText },
        ));
      }
      this.setState({ loading: false });
    });
  }

  handleEnter(event) {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.handleSave();
    }
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <EtcBidComponent
        editableModel={this.state.editableModel}
        declinedByDriver={this.state.declinedByDriver}
        handleChange={this.handleChange}
        errors={this.state.errors}
        setTime={this.setTime}
        onSave={this.handleSave}
        onEnter={this.handleEnter}
      />
    );
  }
}

EtcBid.defaultProps = {
  driver: null,
};

EtcBid.propTypes = {
  match: PropTypes.object.isRequired,
  driver: PropTypes.object,
  getEtcBid: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

const mapStateToProps = ({ etcReducer }) => ({
  driver: etcReducer.driver,
});

const mapDispatchToProps = dispatch => ({
  getEtcBid: hash => dispatch(getEtcBid(hash)),
  save: model => dispatch(saveBid(model)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EtcBid));
