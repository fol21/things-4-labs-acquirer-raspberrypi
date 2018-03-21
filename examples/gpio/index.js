const MqttPublisher = require('MqttPublisher') 

const conf = require('./resources/config.json');


const client = new MqttPublisher(
    {
        host: conf.mqtt.host,
        port: conf.mqtt.port
    });

client.init();