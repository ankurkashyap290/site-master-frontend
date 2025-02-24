import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as LinkTo } from 'react-router-dom';
import { Badge, IconButton, Icon } from '@material-ui/core';

import { getPendingEvents } from '../../bidding/store/actions';
import { DRIVER_STATUS_SUBMITTED } from '../../config/driver_status';

class BiddingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedFacility !== null &&
        this.props.selectedFacility.id !== nextProps.selectedFacility.id
    ) {
      this.setState({ loading: true });
      this.props.getPendingEvents().then(() => {
        this.setState({ loading: false });
      });
    }
  }

  render() {
    if (this.state.loading || !this.props.selectedFacility.id) {
      return null;
    }

    const notifications = this.props.pendingModelList
      .filter(event => event.attributes.drivers
        .filter(driver => driver.status === DRIVER_STATUS_SUBMITTED).length);

    return (
      <LinkTo to={`/facility/${this.props.selectedFacility.id}/bidding#pending`} className="styleless">
        <IconButton aria-label="Menu">
          {notifications.length ?
            <Badge badgeContent={notifications.length} color="secondary">
              <Icon color="primary">notifications</Icon>
            </Badge>
          : <Icon color="primary">notifications</Icon>}
        </IconButton>
      </LinkTo>);
  }
}

BiddingMenu.defaultProps = {
  pendingModelList: [],
  selectedFacility: null,
};

BiddingMenu.propTypes = {
  pendingModelList: PropTypes.arrayOf(PropTypes.object),
  getPendingEvents: PropTypes.func.isRequired,
  selectedFacility: PropTypes.object,
};

const mapStateToProps = ({ biddingReducer, facilityReducer }) => ({
  pendingModelList: biddingReducer.pendingModelList,
  selectedFacility: facilityReducer.selectedFacility,
});

const mapDispatchToProps = dispatch => ({
  getPendingEvents: () => dispatch(getPendingEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BiddingMenu);
