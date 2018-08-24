const MqttPublisher = require('t4l-raspberrypi-publisher')
const si = require('systeminformation');
const moment = require('moment');;
const conf = require('./resources/config.json');


const client = new MqttPublisher({
    host: conf.mqtt.host,
    port: conf.mqtt.port,
    topic: conf.mqtt.ds_topic
});

let duration = moment().add(1,'m').diff(moment());

client.init('001').then(() => {
    client.findDataStream('periodic').Delay(1000);
    collectSysInfo(client, 1000, duration);
});


async function sleep(millis)
{
    let timeout = new Promise(resolve => setTimeout(resolve, millis));
    try {
        return await timeout;
    } catch (error) {
        console.log(error);
    }
}

async function collectSysInfo(client, millis, steps) {
    try {
        for (let index = 0; index < steps ; index++) {
            await sleep(millis).then(()=>
            {
                console.log(index);
            });
            client.publish('/001/stream:periodic',  
                JSON.stringify(await si.cpuTemperature()), 
                'periodic');
        }
    } catch (error) {
        console.log(error);
    }
}