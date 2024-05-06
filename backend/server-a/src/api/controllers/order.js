const { addTask } = require("../../../rabbit-utils/sendTask.js");
const WebSocket = require('ws');
const rabbitHost = process.env.RABBIT_HOST || 'localhost'; 
let orders = new Map();


exports.createOrder = (req, res) => {
  console.log(req.body)
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid sandwiches data' });
  }

  const newOrder = createNewOrder(req.body);
  orders.set(newOrder.id, newOrder);

  addTask(rabbitHost, "order_queue", newOrder);

  res.status(201).json(newOrder);
};

exports.getAllOrders = (req, res) => {
  const allOrders = Array.from(orders.values());
  res.json(allOrders);
};

exports.getOrder = (req, res) => {
  const order = orders.get(parseInt(req.params.orderId));
  if (!order) {
    res.status(404).send("not-found.");
  } else {
    res.json(order);
  }
};

exports.updateOrderStatus = (order, wss) => {
  const existingOrder = orders.get(order.id);

  if (existingOrder) {
    existingOrder.status = "done";
    notifyClients(wss, existingOrder);
    console.log(`Order ${order.id} is now complete.`);
  } else {
    console.log(`Order with ID ${order.id} not found.`);
  }
};

function createNewOrder(sandwiches) {
  const orderSandwiches = sandwiches.map((sandwich) => ({
    sandwichId: sandwich.id,
    sandwichName: sandwich.name,
    quantity: sandwich.quantity,
    price: sandwich.price,
    image: sandwich.image,
    description: sandwich.description,
  }));

  return {
    id: orders.size + 1,
    sandwiches: orderSandwiches,
    status: "ordered",
    createdDate: new Date(),
  };
}

function notifyClients(wss, order) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "order-update",
          order: order,
        })
      );
    }
  });
}
