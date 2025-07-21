import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/app/app.tsx';
import {DefaultData} from './mocks/mocks.ts';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App data={DefaultData}/>
  </React.StrictMode>
);
