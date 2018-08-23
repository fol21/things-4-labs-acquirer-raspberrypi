const mqtt = require('mqtt');
const program = require('commander');
const _ = require('lodash/array');

const {
    DataStream,
    ContinousStream,
    PeriodicStream
} = require('./data-stream/index')
/**
 * A MQTT Based Publisher with Data Stream transactions avaiable
 * 
 * @class MqttPublisher
 */
class MqttPublisher {
    constructor(config = {}) {

        this.program = program
            .version('0.1.0')
            .option('-t, --topic <n>', 'Choose topic to be subscribed')
            .option('-h, --host <n>', 'Overrides pre-configure host')
            .option('-p, --port <n>', 'Overrides pre-configure port', parseInt)

        this.host = program.host || config.host;
        this.port = parseInt(program.port || config.port);
        if(config.topic)
        {
            this.topic = config.topic;
        }
        else this.topic = null;
    }


    /**
     * 
     * Publishes a message by a Data Stream
     * 
     * @param {string} topic 
     * @param {string} message 
     * @param {string} [streamName='continous'] 
     * @memberof MqttPublisher
     */
    publish(topic, message, streamName = 'continous') {
        try {
            if (this.client.connected) {

                let stream = this.findDataStream(streamName);
                if(stream)
                {   
                    stream.send(message).then((message) => 
                    {
                        this.client.publish(topic,message);
                    })
                } else console.log("Stream not found in stream list")
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
        this.streams.push(stream);
        this.client.subscribe(`/${this.id}/stream:${stream.name}`);
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
     * Finds an implementation of DataStream in the streams list
     * Returns null if not listed
     * 
     * @param {string} streamName 
     * @returns {DataStream}
     * @memberof MqttPublisher
     */
    findDataStream(streamName) {
        let index = _.findIndex(this.streams, (s) => {
            return s.name == streamName;
        });
        if(index || index == 0 )
            return this.streams[index];
        else return null;
    }

    /**
     * 
     * Starts a publisher with an id, with Continous and Periodic
     * Streams by default
     * 
     * @param {Function} callback callback type of (void) : void
     * @param {string} [id] 
     * @memberof MqttPublisher
     */
    init(id) {
        this.id = id;
        this.program.parse(process.argv);

        this.streams = [];
        
        if (program.topic && !this.topic) {
            this.topic = program.topic;
        } 
        else if(!program.topic && !this.topic){
            console.log("Topic is required (run program with -t <topic> flag)")
            process.exit();
        }
        
        this.client = mqtt.connect({
            host: this.host,
            port: this.port
        });

        this.client.on('message', (topic, message) => {
            if (topic.match(/(\w+)\/configure\/stream:(\w+)/g)) 
            {
                message = message.toString()
                console.log(`Received Configuration ${message}`);
                let streamName = topic.match(/(?!stream:)\w+$/g);
                let stream = this.findDataStream(streamName[0])
                if(stream)
                {
                    console.log(`Sent configurations to ${streamName} Data`)
                    stream.onMessage(JSON.parse(message));
                }
            }
            //console.log(topic + ' : ' + message)
        });

        return new Promise(resolve =>
            { 
                this.client.on('connect',
                () => {
                    console.log(`Connected, Listening to:
                    host: ${this.host} 
                    port: ${this.port}`);
                    
                    
                    this.addDataStream(ContinousStream);
                    this.addDataStream(new PeriodicStream());
                    
                    resolve(this.client.connected);
                });
            });
        
    }
}

module.exports = MqttPublisher;