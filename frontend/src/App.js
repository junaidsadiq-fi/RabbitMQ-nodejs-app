import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Sandwich from "./components/Sandwich";
import Order from "./components/Order";
import OrderStatus from "./components/OrderStatus";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";

function App() {
  const [sandwiches, setSandwiches] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/sandwich")
      .then((response) => response.json())
      .then((data) => setSandwiches(data));
  }, []);
  console.log("sandwiches from the server", sandwiches);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart cartItems={cart} />} />
      <Route path="/order" element={<Order />} />
      <Route
        path="/sandwich/:id"
        element={<Sandwich sandwiches={sandwiches} />}
      />
      <Route path="/status" element={<OrderStatus />} />
    </Routes>
  );
}

export default App;
