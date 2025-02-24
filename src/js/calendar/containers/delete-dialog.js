import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';

import DeleteDialogComponent from 'ui-elements/delete-dialog';
import {
  deleteModel,
  setDeletableModel,
} from 'calendar/store/actions';
import {
  rruleFromStringAdapter,
  eventToEditableAdapter,
  rruleToStringAdapter,
} from '../store/adapters';
import {
  saveModel,
  getModelFromList,
} from '../store/actions';

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    const { deletableModel } = this.props;
    const { recurrences } = deletableModel.attributes;

    if (deletableModel && recurrences.length > 1) {
      let event = cloneDeep(this.props.deletableModel);
      const rrule = rruleFromStringAdapter(event.attributes.rrule);
      rrule.options.until = moment().utc().toDate();
      event.attributes.rrule = rruleToStringAdapter(rrule);
      event = eventToEditableAdapter(event);
      return this.props.save(event)
        .then(this.props.onClose)
        .then(() =>
          this.props.showDetails(null));
    }
    return this.props.onDelete(id);
  }

  render() {
    const { isOpen } = this.props;
    return (
      <DeleteDialogComponent
        isOpen={isOpen}
        onDelete={this.onDelete}
        onClose={this.props.onClose}
        title={this.props.title}
        deletableModel={this.props.deletableModel}
        description={
          (this.props.deletableModel &&
            this.props.deletableModel.attributes.recurrences.length > 1 ?
          'This action will CANCEL all future events.' :
          'This action will permanently REMOVE the event from the system.')}
      />
    );
  }
}

DeleteDialog.defaultProps = {
  deletableModel: null,
  title: '',
};

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  deletableModel: PropTypes.object,
  title: PropTypes.string,
  save: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
};

const mapStateToProps = ({ calendarReducer }) => ({
  isOpen: calendarReducer.deletableModel !== null,
  deletableModel: calendarReducer.deletableModel,
  title: calendarReducer.deletableModel
    && calendarReducer.deletableModel.attributes.name,
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteModel(id)),
  onClose: () => dispatch(setDeletableModel(null)),
  save: event => dispatch(saveModel(event)),
  showDetails: id => dispatch(getModelFromList(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialog);
