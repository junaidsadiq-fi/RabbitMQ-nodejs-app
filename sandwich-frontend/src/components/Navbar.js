import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-100 text-3xl font-semi py-8 px-24 h-26">
      <ul className="flex justify-between">
        <li className="">
          <Link to="/" className="hover:underline">
            Sandwich-Shop
          </Link>
        </li>
        <li>
          <ul className="flex space-x-4">
          <li className="px-4">
              <Link to="/" className="hover:underline">
                Sandwiches
              </Link>
            </li>
            <li className="px-4">
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
            <li className="px-4">
              <Link to="/status" className="hover:underline">
                Order
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
