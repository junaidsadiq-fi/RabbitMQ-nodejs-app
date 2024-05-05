import React from 'react';
import Navbar from './Navbar';

const Cart = ({ cartItems, buyNow }) => {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mt-8 mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Cart</h2>
        <div className="m-4 border rounded-lg p-4">
          {cartItems && cartItems.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <li key={index} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-gray-700">${item.price}</p>
                    </div>
                  </div>
                  <p>{item.quantity}x</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>
        {cartItems && cartItems.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={buyNow}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
