import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
  
    const addToCart = (item) => {
      // Check if the item with the same ID already exists in the cart
      const isItemInCart = cart.some((cartItem) => cartItem.id === item.id);
  
      if (!isItemInCart) {
        // Add the quantity property when adding items to the cart
        const updatedCart = [...cart, { ...item, quantity: 1 }];
        setCart(updatedCart);
      } else {
        console.log('Item already exists in the cart.');
      }
    };
  
    const removeFromCart = (itemId) => {
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
    };
  
    const incrementQuantity = (itemId) => {
      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    };
  
    const decrementQuantity = (itemId) => {
      const updatedCart = cart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updatedCart);
    };
  
    return (
      <CartContext.Provider
        value={{ cart, setCart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}
      >
        {children}
      </CartContext.Provider>
    );
  };