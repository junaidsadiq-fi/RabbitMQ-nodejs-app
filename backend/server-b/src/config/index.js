const { getTask } = require('../../rabbit-utils/receiveTask.js');

const rabbitHost = process.env.RABBIT_HOST || 'localhost';
const queueName = 'order_queue'; // The queue name to receive orders from Server A

// Start receiving tasks from the queue
getTask(rabbitHost, queueName);
