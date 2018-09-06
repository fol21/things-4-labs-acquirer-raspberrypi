const MqttPublisher = require('../index') 

const conf = require('./resources/config.json');

const { exec, execSync } = require('child_process');
exec('cat /sys/class/thermal//temp', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return null;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

(() => {
    try {
        let t = execSync('cat /sys/class/thermal//temp');
        
    } catch (error) {
        console.log('error');
    }
})()
    

// const client = new MqttPublisher(
//     {
//         host: conf.mqtt.host,
//         port: conf.mqtt.port,
//         topic : conf.mqtt.ds_topic

//     });

// client.init('001').then(() =>
// {
//     client.findDataStream('periodic').Delay(5000);
//     client.publish('/001/stream:periodic','hello','periodic');
// });



