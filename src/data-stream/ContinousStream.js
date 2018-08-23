const DataStream = require('./DataStream');

const continousStream = new DataStream('continous');

continousStream.onMessage();

continousStream.send = async function(message) {
    try {
        return continousStream.validate(message);
    } catch (error) {
        console.log(error);
    }
}

module.exports = continousStream;