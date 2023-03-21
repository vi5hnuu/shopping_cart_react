import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CartProvider from './store/CartProvider';
import StockProvider from './store/StockProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <StockProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </StockProvider>
  // </React.StrictMode>
);