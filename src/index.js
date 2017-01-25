import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './Main';
import { configureStore } from './store';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

injectTapEventPlugin();

render(
  <AppContainer>
    <Main store={store} />
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./Main', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./Main').default;
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      mountApp
    );
  });
}
