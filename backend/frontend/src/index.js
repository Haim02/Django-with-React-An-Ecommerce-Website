import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import './bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ErrorBoundary fallback="שגיעה">
    <App />
    </ErrorBoundary>
  </Provider>
);

reportWebVitals();
