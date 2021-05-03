import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './mini-redux-store'
import store2 from './redux-store'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);