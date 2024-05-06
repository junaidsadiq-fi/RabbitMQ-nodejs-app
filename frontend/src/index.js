import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './Provider/CartContext';

ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <ToastContainer />
      <App />
    </CartProvider>
  </BrowserRouter>,
  document.getElementById('root')
);