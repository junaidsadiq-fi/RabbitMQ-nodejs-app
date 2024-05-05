const { getTask } = require('../rabbit-utils/receiveTask.js');

const rabbitHost = process.env.RABBIT_HOST || 'localhost';
const queueName = 'order_queue'; // The queue name to receive orders from Server A

// receiving tasks from the queue a
getTask(rabbitHost, queueName);
