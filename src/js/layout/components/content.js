import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'ui-elements/loader';
import LoggedOutRouter from './logged-out-router';
import LoggedInRouter from './logged-in-router';

const Content = (props) => {
  if (props.journeyUser === null) {
    props.getUser();
    return <div className="content"><Loader /></div>;
  }
  return (
    <div className="content">
      {props.journeyUser.id ? <LoggedInRouter {...props} /> : <LoggedOutRouter {...props} />}
    </div>
  );
};

Content.defaultProps = {
  journeyUser: null,
};

Content.propTypes = {
  journeyUser: PropTypes.object,
  location: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};

export default Content;
