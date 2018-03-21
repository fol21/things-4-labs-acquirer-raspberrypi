const MqttPublisher = require('../index') 

const conf = require('./resources/config.json');


const client = new MqttPublisher(
    {
        host: conf.mqtt.host,
        port: conf.mqtt.port
    });

client.init();

console.log("done");

// var mqtt = require('mqtt')
// var client  = mqtt.connect({host:"localhost", port: 1883})
 
// client.on('connect', function () {
//   client.subscribe('test')
//   client.publish('test', 'Hello mqtt')
// })
 
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   client.end()
// })