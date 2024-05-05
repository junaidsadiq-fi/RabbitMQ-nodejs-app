import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const sandwiches = [
    { id: 1, name: 'Ham Sandwich', price: 5.99, image: 'https://www.thespruceeats.com/thmb/f09Vbw00N1DCg4yeu_Lf0a_gUtc=/3580x2387/filters:no_upscale():max_bytes(150000):strip_icc()/turkey-reuben-sandwich-2937621-hero-01-d98a70a112204ec09ef00183b5cbfe29.jpg', description: 'A delicious ham sandwich.' },
    { id: 2, name: 'Turkey Sandwich', price: 6.99, image: 'https://img.taste.com.au/M-_CL2dx/taste/2018/02/loaded-turkish-bread-sandwich-135784-2.jpg', description: 'A tasty turkey sandwich.' },
    { id: 3, name: 'Chicken Sandwich', price: 7.99, image: 'https://cdn.tasteatlas.com/images/dishes/c0dbb76c039542d3a0d8a6ef4290e40e.jpg?w=905&h=510', description: 'A scrumptious chicken sandwich.' },
  ];
export default function Home() {
  return (
    <div className="">
    <Navbar />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sandwiches.map((sandwich) => (
          <Link to={`/sandwich/${sandwich.id}`} key={sandwich.id}>
            <div className="m-4 border rounded-lg p-4">
              <img src={sandwich.image} alt={sandwich.name} className="w-full h-64 object-cover mb-4 rounded" />
              <h2 className="text-lg font-bold mb-2">{sandwich.name}</h2>
              <p className="mb-2">ID: {sandwich.id}</p>
              <p className="text-gray-700">$ {sandwich.price}</p>
              <p className="text-gray-700">{sandwich.description}</p>
            </div>
          </Link>
        ))}
      </div>
  </div>
  );
}
