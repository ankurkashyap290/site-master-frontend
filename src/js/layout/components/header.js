import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import { Link as LinkTo } from 'react-router-dom';

import UserMenu from './user-menu';

const Header = props => (
  <AppBar className="header" color="inherit">
    <Toolbar>
      <LinkTo to="/new-session">
        <img className="logo" src="/images/logo.png" alt="Journey" />
      </LinkTo>
      <UserMenu {...props} />
    </Toolbar>
  </AppBar>
);

Header.defaultProps = {
  journeyUser: null,
};

Header.propTypes = {
  journeyUser: PropTypes.object,
};

const mapStateToProps = ({ authReducer }) => ({
  journeyUser: authReducer.journeyUser,
});

export default connect(
  mapStateToProps,
  null,
)(Header);
