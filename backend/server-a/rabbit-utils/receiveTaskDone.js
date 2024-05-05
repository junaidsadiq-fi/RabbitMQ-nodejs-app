#!/usr/bin/env node
// Process tasks from the work queue

const amqp = require("amqplib");

const orderController = require('../src/api/controllers/order');

module.exports.receiveTaskDone = function (rabbitHost, doneQueueName, wss) {
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      ch.assertQueue(doneQueueName, {durable: true});
      ch.prefetch(1);
      ch.consume(doneQueueName, function(msg) {
        const body = msg.content.toString();
        console.log(" [x] Done task received '%s'", body);
        orderController.onTaskDone(JSON.parse(body), wss);
        ch.ack(msg);
      }, {noAck: false});
    });
  }).catch(console.warn);
};