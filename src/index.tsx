import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Lot} from './Lot';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Lot />
  </React.StrictMode>
);