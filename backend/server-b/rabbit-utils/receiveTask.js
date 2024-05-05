#!/usr/bin/env node
// Process tasks from the work queue
// in our case an order for a sandwich
const { sendTaskDone } = require('./sendTaskDone.js');

'use strict';

var amqp = require('amqplib');


module.exports.getTask = function(rabbitHost, queueName){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(queueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(queueName, doWork, {noAck: false});
        console.log(";);););););););)");
        console.log(new Date(), " [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        var body = msg.content.toString();
        console.log("//////////////");
        console.log(" [x] Received '%s'", body);
        console.log("//////////////");
        var secs = body.split('.').length - 1;
        //console.log(" [x] Task takes %d seconds", secs);
        setTimeout(function() {
          console.log(new Date(), " [x] Done");
          ch.ack(msg);
          sendTaskDone(rabbitHost, 'done_queue', JSON.parse(body));
        }, 5000);
      }
    });
  }).catch(console.warn);
}
