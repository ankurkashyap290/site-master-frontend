import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import store from 'store/create-store';
import { setActivityTimer, setTokenTimer } from 'auth/store/actions';
import { setSelectedFacility } from '../../facilities/store/actions';
import OrganizationList from '../../organizations/containers';
import FacilityList from '../../facilities/containers';
import OrganizationAdminList from '../../users/containers/organization-admins';
import UpperManagementList from '../../users/containers/upper-management';
// import NotFound from '../../ui-elements/not-found';
import LocationList from '../../locations/containers';
import Tour from '../../ui-elements/tour';
import Calendar from '../../calendar/containers';
import FacilityUserList from '../../users/containers/facility-users';
import PolicyList from '../../policies/containers';
import ClientList from '../../clients/containers';
import MyProfile from '../../auth/containers/my-profile';
import ChangePassword from '../../auth/containers/change-password';
import TransportLogList from '../../transport-logs/containers';
import TransportBillingLogList from '../../transport-billing-logs/containers';
import ETCList from '../../etcs/containers';
import Bidding from '../../bidding/containers';
import Reporting from '../../reporting/containers';
import FacilityDrilldown from '../../reporting/containers/facility-drilldown';
import EtcDrilldown from '../../reporting/containers/etc-drilldown';
import FacilityDailyView from '../../reporting/containers/facility-daily-view';
import EtcDailyView from '../../reporting/containers/etc-daily-view';
import Tutorial from '../../tutorial/components';
import { logout } from '../../auth/store/actions';

class LoggedInRouter extends React.Component {
  // eslint-disable-next-line react/sort-comp
  static setSelectedFacility(props) {
    const matches = props.location.pathname.match(/^\/facility\/(\d+)\/.+/);
    if (!matches) {
      props.setSelectedFacility({});
      return;
    }
    const facilityId = Number(matches[1]);
    let selectedFacility;
    const userAttributes = props.journeyUser.attributes;
    if (facilityId === Number(userAttributes.facility.id)) {
      selectedFacility = userAttributes.facility;
    } else {
      selectedFacility =
        userAttributes.facilities.filter(facility => facilityId === Number(facility.id)).shift();
    }
    props.setSelectedFacility(selectedFacility);
  }

  constructor(props) {
    super(props);

    this.getDefaultUrl = this.getDefaultUrl.bind(this);

    axios.interceptors.response.use(response => response, (error) => {
      if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
        this.props.logOut();
        window.location = '/login';
      }
      return Promise.reject(error);
    });

    axios.interceptors.request.use((request) => {
      if (request.url.indexOf('auth/refresh') === -1) {
        store.dispatch(setActivityTimer());
      }
      store.dispatch(setTokenTimer());
      return request;
    }, error => Promise.reject(error));
  }

  componentWillMount() {
    LoggedInRouter.setSelectedFacility(this.props);
  }

  componentWillReceiveProps(nextProps) {
    LoggedInRouter.setSelectedFacility(nextProps);
  }

  getDefaultUrl() {
    let defaultUrl;
    if (this.props.journeyUser.attributes.facility.id) {
      defaultUrl = `/facility/${this.props.journeyUser.attributes.facility.id}/calendar`;
    } else if (this.props.journeyUser.attributes.organization.id) {
      defaultUrl = '/facilities';
    } else {
      defaultUrl = '/organizations';
    }
    return defaultUrl;
  }

  render() {
    if (!this.props.journeyUser.id) {
      return null;
    }

    const { journeyUser, location } = this.props;
    return (
      <Switch location={location}>
        <Route exact path="/" render={() => <Redirect to={this.getDefaultUrl()} />} />
        <Route exact path="/login" render={() => <Redirect to={this.getDefaultUrl()} />} />
        <Route exact path="/tour" component={Tour} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route exact path="/tutorial" component={Tutorial} />

        {journeyUser.isAllowed('view', 'Organizations') ?
          <Route exact path="/organizations" component={OrganizationList} />
        : null}
        {journeyUser.isAllowed('view', 'Organization Admins') ?
          <Route exact path="/organization/:id/organization-admins" component={OrganizationAdminList} />
        : null}

        {journeyUser.isAllowed('view', 'Upper Management') ?
          <Route exact path="/upper-management" component={UpperManagementList} />
        : null}
        {journeyUser.isAllowed('view', 'Facilities') ?
          <Route exact path="/facilities" component={FacilityList} />
        : null}

        {journeyUser.isAllowed('view', 'Calendar') ?
          <Route exact path="/facility/:id/calendar" component={withRouter(Calendar)} />
        : null}
        {journeyUser.isAllowed('view', 'Bidding') ?
          <Route exact path="/facility/:id/bidding" component={withRouter(Bidding)} />
        : null}
        {journeyUser.isAllowed('view', 'Users') ?
          <Route exact path="/facility/:id/users" component={withRouter(FacilityUserList)} />
        : null}
        {journeyUser.isAllowed('view', 'Policies') ?
          <Route exact path="/facility/:id/user-permissions" component={withRouter(PolicyList)} />
        : null}
        {journeyUser.isAllowed('view', 'Clients') ?
          <Route exact path="/facility/:id/clients" component={withRouter(ClientList)} />
        : null}
        {journeyUser.isAllowed('view', 'Transport Logs') ?
          <Route exact path="/facility/:id/transport-logs" component={withRouter(TransportLogList)} />
        : null}
        {journeyUser.isAllowed('view', 'Transport Billing Logs') ?
          <Route exact path="/facility/:id/transport-billing-logs" component={withRouter(TransportBillingLogList)} />
        : null}
        {journeyUser.isAllowed('view', 'Locations') ?
          <Route exact path="/facility/:id/locations" component={withRouter(LocationList)} />
        : null}
        {journeyUser.isAllowed('view', 'External Transportation Companies') ?
          <Route exact path="/facility/:id/etcs" component={withRouter(ETCList)} />
        : null}
        {journeyUser.isAllowed('view', 'Reporting') ?
          <Route exact path="/reporting" component={withRouter(Reporting)} />
        : null}
        {journeyUser.isAllowed('view', 'Reporting') ?
          <Route exact path="/reporting/facility/:id" component={FacilityDrilldown} />
        : null}
        {journeyUser.isAllowed('view', 'Reporting') ?
          <Route exact path="/reporting/etc/:id" component={EtcDrilldown} />
        : null}
        {journeyUser.isAllowed('view', 'Reporting') ?
          <Route exact path="/reporting/facility/:id/:date" component={FacilityDailyView} />
        : null}
        {journeyUser.isAllowed('view', 'Reporting') ?
          <Route exact path="/reporting/etc/:id/:date" component={EtcDailyView} />
        : null}
        <Route render={() => <Redirect to={this.getDefaultUrl()} />} />
      </Switch>
    );
  }
}

LoggedInRouter.defaultProps = {
  facilities: [],
};

LoggedInRouter.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  /* eslint-disable */
  facilities: PropTypes.arrayOf(PropTypes.object),
  setSelectedFacility: PropTypes.func.isRequired,
  /* eslint-enable */
};

const mapStateToProps = ({ facilityReducer }) => ({
  facilities: facilityReducer.modelList,
});

const mapDispatchToProps = dispatch => ({
  setSelectedFacility: facility => dispatch(setSelectedFacility(facility)),
  logOut: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoggedInRouter);
