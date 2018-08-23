class DataStream {

    /**
     * Creates an instance of DataStream.
     * @param {string} name 
     * @memberof DataStream
     */
    constructor(name) {
        this.name = name;
        this.threshold = 0;
    }


    /**
     * 
     * @type {object}
     * @param {Object.<string, any>} [configuration=null] 
     * @memberof DataStream
     */
    onMessage(configuration = null) {
    }

    /**
     * 
     * 
     * @param {string} message 
     * @param {streamProcess} [process=null] 
     * @returns {string}
     * @memberof DataStream
     */
    validate(message) {

        if (this.threshold != 0) {
            if (message.lenght > this.threshold) return "Message size is above allowed !";
            else return message;
        } else return message;

    }
    /**
     * Async method to be implemented by a child of DataStream
     * 
     * @memberof DataStream
     */
    async send(message) {
        console.log("Please Implement an async send method in your child of DataStream")
        return message;
    }

}

module.exports = DataStream