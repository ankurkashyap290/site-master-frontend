import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import SentryComponent from 'common/sentry-error-tracking';
import store from 'store/create-store';
import App from 'layout/containers';

ReactDOM.render(
  <SentryComponent>
    <Provider store={store}>
      <App />
    </Provider>
  </SentryComponent>,
  document.getElementById('app'),
);
