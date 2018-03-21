const mqtt = require('mqtt');
const program = require('commander');

class MqttPublisher {
    constructor(config = {}) {

        this.program = program
            .version('0.1.0')
            .option('-t, --topic <n>', 'Choose topic to be subscribed')
            .option('-m, --message <n>', 'Message to publish')
            .option('-c, --context <n>', 'Add context to incoming messages')
            .option('-h, --host <n>', 'Overrides pre-configure host')
            .option('-p, --port <n>', 'Overrides pre-configure port', parseInt)

        this.host = program.host || config.host;
        this.port = parseInt(program.port || config.port);
        this.allowExit = config.allowExit || true;
        this.topic = null;
    }

    publish(topic, message) {
        try {
            if (self.client.connected) {
                self.client.publish(topic, message)
            } else console.log('Unable to publish. No connection avaible.')
        } catch (err) {
            console.log(err);
        }
    }

    init() {

        this.program.parse(process.argv);

        if (program.topic) {
            this.topic = program.topic;
        } else {
            console.log("Topic is required (run program with -t <topic> flag)")
            process.exit();
        }

        this.client = mqtt.connect({
            host: this.host,
            port: this.port
        });
        
        let self = this
        this.client.on('connect',
        () => {
            console.log(`Connected, Listening to:
            host: ${this.host} 
            port: ${this.port} 
            topic: ${this.topic}`);
            
            if (program.message) {
                try {
                    if (self.client.connected) {
                        self.client.publish('test', 'Heello')
                        self.client.subscribe('test');
                    } else console.log('Unable to publish. No connection avaible.')
                } catch (err) {
                    console.log(err);
                }
      
                if (self.allowExit) process.exit();
            }
        });
        this.client.on('message', (topic, message) => {console.log(topic + ' : ' + message)});
    }
}

module.exports = MqttPublisher;