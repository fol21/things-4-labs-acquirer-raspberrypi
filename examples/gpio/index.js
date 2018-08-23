const MqttPublisher = require('t4l-raspberrypi-publisher') 

const conf = require('./resources/config.json');


const client = new MqttPublisher(
    {
        host: conf.mqtt.host,
        port: conf.mqtt.port,
        topic : conf.mqtt.ds_topic
    });

client.init(() =>
{
    client.publish(conf.mqtt.ds_topic,"hello","continous")
});