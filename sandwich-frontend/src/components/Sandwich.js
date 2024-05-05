import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Sandwich = ({ sandwiches }) => {
  console.log("inside the sandwich component:",sandwiches);
  const { id } = useParams();
  const [cart, setCart] = useState([]);

  const addToCart = (sandwich) => {
    setCart([...cart, sandwich]);
    alert("successfully added to cart:");
  };
  const sandwich = sandwiches.find((item) => item.id === parseInt(id));

  if (!sandwich) return <div>Product not found</div>;

  return (
    <div className="">
      <Navbar />
      <div className="mx-16 mt-16">
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
          <button
            onClick={() => addToCart(sandwich)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sandwich;
