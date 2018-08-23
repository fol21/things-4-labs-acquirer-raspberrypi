const DataStream = require('./DataStream');

class PeriodicStream extends DataStream {
    
    
    constructor(delay = 100) {
        super('periodic')
        // Sets default delay to 100ms
        this.configuration = {delay};   
    }

    /**
     * Sets the threshold
     * 
     * @param {number} threshold 
     * @memberof PeriodicStream
     */
    Threshold(threshold) {
        super.threshold = threshold;
    }

    /**
     * Set the Stream delay for delivering messages
     * 
     * @param {number} delay 
     * @memberof PeriodicStream
     */
    Delay(delay)
    {
        this.configuration.delay = delay;
    }

    /**
     * Sets timeout delay
     * 
     * @param {number} delay 
     * @memberof PeriodicStream
     */
    onMessage(configuration) {
        this.configuration = configuration;
    }

    /**
     * Sends async message in timed delays
     * 
     * @param {string} message 
     * @memberof PeriodicStream
     */
    async send(message) {
        let self = this;
        let sender = new Promise((resolve) =>
        {
            setTimeout(() => 
            {
                resolve(self.validate(message));
            }, self.configuration.delay)
        });
        try {
            let message = await sender;
            return message;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = PeriodicStream;