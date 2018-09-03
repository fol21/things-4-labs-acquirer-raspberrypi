const MqttPublisher = require('t4l-raspberrypi-publisher')
const si = require('systeminformation');
const moment = require('moment');;
const conf = require('./resources/config.json');


const client = new MqttPublisher({
    host: conf.homolog.mqtt.host,
    port: conf.homolog.mqtt.port,
    topic: conf.homolog.mqtt.ds_topic
});

// Add how long appp will run from now
let duration = moment().add(10,'m').diff(moment());

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
            let payload = await si.cpuTemperature();
            payload.device = "intel-xeon";
            client.publish('/001/stream:periodic',  
                JSON.stringify(payload), 
                'periodic');
        }
    } catch (error) {
        console.log(error);
    }
}