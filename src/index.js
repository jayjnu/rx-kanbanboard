import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import kanbanApp from './reducers';
import App from './components/App';

import './styles';

const store = createStore(kanbanApp);
store.subscribe(() => {
  console.log(store.getState().suggestApp);
})
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('App')
);