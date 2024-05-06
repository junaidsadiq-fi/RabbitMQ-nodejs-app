import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/order')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mt-8 mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center pt-8">Order Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
