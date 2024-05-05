#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

"use strict";

const amqp = require("amqplib");

module.exports.addTask = function (rabbitHost, queueName, order) {
  amqp
    .connect("amqp://" + rabbitHost)
    .then(function (conn) {
      return conn.createConfirmChannel().then(function (ch) {
        const ok = ch.assertQueue(queueName, { durable: true });
        return ok
          .then(function () {
            ch.sendToQueue(
              queueName,
              Buffer.from(JSON.stringify(order)),
              {},
              function (err, ok) {
                if (err !== null) {
                  console.log("-------------");
                  console.warn(new Date(), "Message nacked!", err);
                  console.log("-------------");
                } else {
                  console.log("-------------");
                  console.log(new Date(), "Message acked");
                  console.log("-------------");
                }
              }
            );
          })
          .finally(() => {
            setTimeout(() => {
              // Give it some time to process
              ch.close();
              conn.close();
            }, 500);
          });
      });
    })
    .catch((err) => {
      console.error("[!] Error in RabbitMQ operation:", err);
    });
};
