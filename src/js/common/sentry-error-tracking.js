import * as Sentry from '@sentry/browser';
import React from 'react';
import PropTypes from 'prop-types';
import sentry from 'config/sentry';

Sentry.init({
  dsn: sentry.dsn,
});
// should have been called before using it here
// ideally before even rendering your react app

class SentryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <p>
          For some reason, Journey couldn’t load.<br />
          We’re quite sorry about this! We try to troubleshoot, please come back later.
        </p>
      );
    }
    // when there's not an error, render children untouched
    return this.props.children;
  }
}

SentryComponent.defaultProps = {
  children: null,
};

SentryComponent.propTypes = {
  children: PropTypes.object,
};

export default SentryComponent;

