import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Activation from '../../auth/containers/activation';
import TermsAndConditions from '../../auth/components/terms-and-conditions';
import PrivacyPolicy from '../../auth/components/privacy-policy';
import NewSession from '../../auth/containers/new-session';
import Login from '../../auth/containers/login';
import ForgotPassword from '../../auth/containers/forgot-password';
import ResetPassword from '../../auth/containers/reset-password';
import EtcBid from '../../etcs/containers/etc-bid';

const LoggedOutRouter = ({ journeyUser, location }) => {
  if (journeyUser.id) {
    return null;
  }
  return (
    <Switch location={location}>
      <Route exact path="/new-session" component={NewSession} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route exact path="/activation/:id/:token" component={Activation} />
      <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/etc-bid/:hash/:status" component={EtcBid} />
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  );
};

LoggedOutRouter.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default LoggedOutRouter;
