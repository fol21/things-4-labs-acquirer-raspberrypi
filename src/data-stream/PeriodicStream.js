const DataStream = require('./DataStream');

class PeriodicStream extends DataStream {
    
    
    constructor() {
        super('periodic')
    }

    /**
     * Sets the threshold
     * 
     * @param {number} threshold 
     * @memberof PeriodicStream
     */
    setThreshold(threshold) {
        super.threshold = threshold;
    }

    /**
     * Sets timeout delay
     * 
     * @param {number} delay 
     * @memberof PeriodicStream
     */
    onMessage(delay) {
        super.onMessage({
            delay: delay
        })
    }

    /**
     * Sends message in timed delays
     * 
     * @param {string} message 
     * @memberof PeriodicStream
     */
    send(message) {
        setTimeout(() => 
        {
            super.send(message,
                () => {
                });
        }, this.configuration.delay)
    }
}

module.exports = PeriodicStream;