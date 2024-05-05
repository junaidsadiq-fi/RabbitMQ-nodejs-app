import Navbar from './Navbar'

const orders = [
    {
        id: 1,
        name: "Chicken Sandwich",
        price: 7.99,
        quantity: 1,
        status: "not-ready",
    },
    {
        id: 2,
        name: "Veggie Sandwich",
        price: 6.99,
        quantity: 2,
        status: "ready",
    },
    {
        id: 3,	
        name: "Turkey Sandwich",
        price: 8.99,
        quantity: 1,
        status: "not-ready",
    },
    ];
export default function OrderStatus() {
  return (
    <>
    <Navbar/>
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
            {orders.map((order, index) => (
              <tr key={index}>
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
  )
}
