// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { authStore } from './RTK/authStore.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={authStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
