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
        this.configuration = configuration
    }

    /**
     * 
     * @callback streamProcess
     */
    
    /**
     * 
     * 
     * @param {streProcess} process 
     * @memberof DataStream
     */
    setProcess(process) {
        this.process = process;
    }

    /**
     * 
     * 
     * @param {string} message 
     * @param {streamProcess} [process=null] 
     * @returns {string}
     * @memberof DataStream
     */
    send(message, process = null) {

        let ps = process || this.process;
        if (ps) this.ps()

        if (this.threshold != 0) {
            if (message.lenght > this.threshold) return "Message size is above allowed !";
            else return message;
        } else return message;

    }

}

module.exports = DataStream