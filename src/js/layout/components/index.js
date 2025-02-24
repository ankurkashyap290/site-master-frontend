import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from 'layout/containers/header';
import Menu from 'layout/containers/menu';
import Content from 'layout/containers/content';
import theme from './theme';

const Layout = () => (
  <Router>
    <Route render={({ location }) => (
      <MuiThemeProvider theme={theme}>
        <Header />
        <div className="content-wrapper">
          <Menu />
          <Content location={location} />
        </div>
      </MuiThemeProvider>
    )}
    />
  </Router>
);


export default Layout;
