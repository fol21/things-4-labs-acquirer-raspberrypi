const mqtt = require('mqtt');
const program = require('commander');
const _ = require('lodash/array');

const {
    DataStream,
    ContinousStream,
    PeriodicStream
} = require('./data-stream/index')

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
        this.topic = null;
    }


    /**
     * 
     * 
     * @param {string} topic 
     * @param {string} message 
     * @param {string} [streamName='continous'] 
     * @memberof MqttPublisher
     */
    publish(topic, message, streamName = 'continous') {
        try {
            if (this.client.connected) {
                this.client.publish(topic, this.findDataStream(streamName).send(message))
            } else console.log('Unable to publish. No connection avaible.')
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 
     * 
     * @param {DataStream} stream 
     * @memberof MqttPublisher
     */
    addDataStream(stream) {
        this.streams.push(stream)
    }
    /**
     * 
     * 
     * @param {string} streamName 
     * @memberof MqttPublisher
     */
    removeDataStream(streamName) {
        _.remove(this.streams, (s) => {
            return s.name == streamName;
        });
    }
    /**
     * 
     * 
     * @param {string} streamName 
     * @returns {DataStream}
     * @memberof MqttPublisher
     */
    findDataStream(streamName) {
        let index = _.findIndex(this.streams, (s) => {
            return s.name == streamName;
        });
        return this.streams[index];
    }

    /**
     * 
     * 
     * @param {Function} callback callback type of (void) : void
     * @param {string} [streamName='continous'] 
     * @memberof MqttPublisher
     */
    init(callback=null, streamName = 'continous') {

        this.program.parse(process.argv);

        this.streams = [];
        this.streams.push(ContinousStream);
        this.streams.push(new PeriodicStream());

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
                    this.publish(program.topic, program.message, streamName);
                }
                if(callback) callback();
            });
        this.client.on('message', (topic, message) => {
            console.log(topic + ' : ' + message)
        });
    }
}

module.exports = MqttPublisher;