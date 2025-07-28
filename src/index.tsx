import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App/App';
import {DefaultData} from './mocks/mocks';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App {...DefaultData}/>
  </React.StrictMode>
);
