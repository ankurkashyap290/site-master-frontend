import React from 'react';
import PropTypes from 'prop-types';

const LocationView = ({ locationAttributes, hideName }) => (
  <span>
    {!hideName ?
      <span>
        {locationAttributes.name}
        <br />
      </span>
    : null}
    <span style={{ fontSize: '0.85em' }}>
      {locationAttributes.address}
      <br />
      {`${locationAttributes.city}, ${locationAttributes.state} `}
      {locationAttributes.postcode}
      <br />
      {locationAttributes.phone}
    </span>
  </span>
);

LocationView.defaultProps = {
  hideName: false,
};

LocationView.propTypes = {
  locationAttributes: PropTypes.object.isRequired,
  hideName: PropTypes.bool,
};

export default LocationView;
