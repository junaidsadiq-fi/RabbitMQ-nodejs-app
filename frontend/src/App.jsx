import { useState } from "react";

function App() {
  const [post, setPost] = useState("");
  const [sandwichId, setSandwichId] = useState("");
  const [fetchedOrderId, setFetchedOrderId] = useState("-");
  const [fetchedSandwichId, setFetchedSandwichId] = useState("-");
  const [fetchedStatus, setFetchedStatus] = useState("-");
  const [allSandwiches, setAllSandwiches] = useState([]);
  const [createdOrder, setCreatedOrder] = useState({
    id: "-",
    sandwichId: "-",
    status: "-",
  });
  const [orderText, setOrderText] = useState("-");
  const [orderTextColor, setOrderTextColor] = useState("white");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formValue = post.trim();

    if (!isNaN(formValue) && formValue !== '' && formValue > 0) {
      const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "sandwichId": Number(formValue) }),
      });

      if (response.status !== 404) {
        const body = await response.json();
        setOrderText('Order created successfully! Order information:');
        setCreatedOrder(body);
        setOrderTextColor('DarkGreen');
      } else {
        setOrderText('Order creation failed!');
        setCreatedOrder({ id: "-", sandwichId: "-", status: "-" });
        setOrderTextColor('DarkRed');
      }

    } else {
      setOrderText('Order creation failed!');
      setCreatedOrder({ id: "-", sandwichId: "-", status: "-" });
      setOrderTextColor('DarkRed');
      alert("Check input! Only numbers and no empty input!")
    }
  };

  const getById = async (event) => {
    event.preventDefault();
    let formValue = sandwichId.trim();

    if (!isNaN(formValue) && formValue !== '' && formValue > 0) {
      const response = await fetch(`http://localhost:3001/order/${sandwichId}`);

      if (response.status !== 404) {
        const body = await response.json();
        setFetchedOrderId(body.id);
        setFetchedSandwichId(body.sandwichId);
        setFetchedStatus(body.status);
      } else {
        alert('There was no order with the given ID!');
      }
    } else {
      alert("Check input! Only numbers and no empty input!")
    }
  };

  const getAllOrders = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/order');
    const body = await response.json();
    setAllSandwiches(body);
  };

  const chooseStatusColor = (state) => {
    if (state === "ready") {
      return "green";
    } else if (state === "inQueue") {
      return "yellow";
    } else if (state === "failed") {
      return "red";
    } else if (state === "ordered") {
      return "Chartreuse";
    } else if (state === "received") {
      return "DarkGoldenRod";
    }
  };

  return (
    <div className="text-center bg-gradient-to-r from-blue-800 to-blue-500 min-h-screen flex flex-col items-center justify-center text-white">
      <header>
        <h1 className="text-6xl mb-8">Sandwich App</h1>
        <div className="Order">
          <form onSubmit={handleSubmit} className="mb-8">
            <h3 className="text-2xl mb-4">Order a new sandwich: </h3>
            <input
              type="text"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className="border text-black border-gray-300 rounded px-4 py-2 mr-4"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Order
            </button>
          </form>
          <h4 className="mt-4" style={{ color: orderTextColor }}>
            {orderText}
          </h4>
          <h4>
            Order ID: {createdOrder.id} | Sandwich ID: {createdOrder.sandwichId}{" "}
            | Status:{" "}
            <span style={{ color: chooseStatusColor(createdOrder.status) }}>
              {createdOrder.status}
            </span>
          </h4>
        </div>

        <h3 className="text-2xl mb-4">Check order status:</h3>
        <form onSubmit={getById} className="mb-8">
          <input
            type="text"
            value={sandwichId}
            onChange={(e) => setSandwichId(e.target.value)}
            className="border text-black border-gray-300 rounded px-4 py-2 mr-4"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Check
          </button>
        </form>

        <h4>
          Order ID: {fetchedOrderId} | Sandwich ID: {fetchedSandwichId} |
          Status:{" "}
          <span style={{ color: chooseStatusColor(fetchedStatus) }}>
            {fetchedStatus}
          </span>
        </h4>

        <h3 className="text-2xl mb-4">List all orders:</h3>
        <button
          onClick={getAllOrders}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Get all
        </button>
        {allSandwiches.map((order) => (
          <li key={order.id} className="list-none">
            Order ID: {order.id} | Sandwich ID: {order.sandwichId} | Status:{" "}
            <span style={{ color: chooseStatusColor(order.status) }}>
              {order.status}
            </span>
          </li>
        ))}
      </header>
    </div>
  );
}

export default App;
