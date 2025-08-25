import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction, fetchFavoritesAction } from './store/apiActions';

store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoritesAction());

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
