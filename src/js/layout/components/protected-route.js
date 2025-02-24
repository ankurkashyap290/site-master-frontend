import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => (
  <Route
    {...props}
    render={(properties) => {
      if (props.journeyUser.id) {
        return <props.component {...properties} />;
      }
      return (<Redirect
        to={{
          pathname: '/new-session',
          state: { from: properties.location },
        }}
      />);
    }}
  />
);

ProtectedRoute.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
