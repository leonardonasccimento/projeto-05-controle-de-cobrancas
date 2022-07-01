import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalContextProvider from './contexts/GlobalContextProvider';
import HomeRoutes from './routes';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <HomeRoutes />
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);

