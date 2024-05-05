import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";

const Sandwich = ({ sandwiches }) => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);

  const addToCart = (sandwich) => {
    const updatedCart = [...cart, sandwich];
    setCart(updatedCart);
    toast.success("Successfully added to cart!");
  };

  const buySandwich = (sandwich) => {
    fetch("http://localhost:3001/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart), // Use cart directly instead of cartItems
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Success: Order placed!");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  const sandwich = sandwiches.find((item) => item.id === parseInt(id));

  if (!sandwich) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-xl mt-8">
        <div className="m-4 border rounded-lg p-4">
          <img
            src={sandwich.image}
            alt={sandwich.name}
            className="w-full h-64 object-cover mb-4 rounded"
          />
          <h2 className="text-lg font-bold mb-2">{sandwich.name}</h2>
          <p className="mb-2">ID: {sandwich.id}</p>
          <p className="text-gray-700">$ {sandwich.price}</p>
          <p className="text-gray-700">{sandwich.description}</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => addToCart(sandwich)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
            >
              Add to Cart
            </button>
            <button
              onClick={() => buySandwich(sandwich)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sandwich;
