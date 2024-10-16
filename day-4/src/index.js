import React from 'react';
import ReactDOM from 'react-dom/client'; // Kiểm tra phiên bản
import './index.css';
import App from './App'; // Đảm bảo bạn đã import App
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Đảm bảo App được render */}
  </React.StrictMode>
);

reportWebVitals();

