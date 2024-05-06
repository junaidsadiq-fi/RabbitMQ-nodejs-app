import { useContext, useState } from "react";

import Navbar from "./Navbar";
import { CartContext } from "../Provider/CartContext";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, setCart, incrementQuantity, decrementQuantity, removeFromCart } = useContext(
    CartContext
  );
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleConfirmOrder = async () => {
    try {
      const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
        mode: 'cors',
        credentials: 'include',
      });

      if (response.ok) {
        setOrderPlaced(true);
        toast.success('Order placed successfully!');
         setCart([]);
      } else {
        toast.error('Failed to place order.');
        console.log(response);
      }
    } catch (error) {
      toast.error('Failed to place order.');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-xl mt-16">
        <h1 className="text-2xl text-center font-bold mt-8 mb-4">Your Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">{item.name}</p>
                        <p className="text-gray-700">${item.price}</p>
                      </div>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
            
          </ul>
        )}
        {cart.length > 0 && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleConfirmOrder}
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
