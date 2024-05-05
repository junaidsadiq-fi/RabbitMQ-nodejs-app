import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Sandwich from "./components/Sandwich";
import Order from "./components/Order";
import OrderStatus from "./components/OrderStatus";
import { useEffect, useState } from "react";
/* const sandwiches = [
  { id: 1, name: 'Ham Sandwich', price: 5.99, image: 'https://www.thespruceeats.com/thmb/f09Vbw00N1DCg4yeu_Lf0a_gUtc=/3580x2387/filters:no_upscale():max_bytes(150000):strip_icc()/turkey-reuben-sandwich-2937621-hero-01-d98a70a112204ec09ef00183b5cbfe29.jpg', description: 'A delicious ham sandwich.' },
  { id: 2, name: 'Turkey Sandwich', price: 6.99, image: 'https://img.taste.com.au/M-_CL2dx/taste/2018/02/loaded-turkish-bread-sandwich-135784-2.jpg', description: 'A tasty turkey sandwich.' },
  { id: 3, name: 'Chicken Sandwich', price: 7.99, image: 'https://cdn.tasteatlas.com/images/dishes/c0dbb76c039542d3a0d8a6ef4290e40e.jpg?w=905&h=510', description: 'A scrumptious chicken sandwich.' },
]; */

function App() {
  const [sandwiches, setSandwiches] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/sandwich')
      .then(response => response.json())
      .then(data => setSandwiches(data));
    } , []);
    console.log("sandwiches from the server",sandwiches);
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/sandwich/:id" element={<Sandwich sandwiches={sandwiches} />} />
        <Route path="/status" element={<OrderStatus />} />
      </Routes>
  );
}

export default App;
