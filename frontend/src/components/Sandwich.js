import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import { CartContext } from "../Provider/CartContext";

export default function Sandwich() {
  const { id } = useParams();
  const [sandwiches, setSandwiches] = useState([]);
  console.log(sandwiches);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:3001/sandwich")
      .then((response) => response.json())
      .then((data) => setSandwiches(data));
  }, []);

  const buySandwich = (sandwich) => {
    addToCart(sandwich); 
    toast.success("Successfully added to cart!");
  };

  const sandwich = sandwiches.find((item) => item.id === parseInt(id));

  if (!sandwich) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-xl mt-8">
        <div className="m-4 p-4 flex">
          <div className="w-1/2 pr-4">
            <img
              src={sandwich.image}
              alt={sandwich.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-bold mb-2">{sandwich.name}</h2>
            <p className="mb-2">ID: {sandwich.id}</p>
            <p className="text-gray-700">$ {sandwich.price}</p>
            <p className="text-gray-700">{sandwich.description}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => 
                  addToCart(sandwich)
                
                }
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
              >
                Add to Cart
              </button>
              <button
                onClick={() => buySandwich(sandwich)}
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
