const DataStream = require('./DataStream');

const continousStream = new DataStream('continous');

continousStream.onMessage();

continousStream.setProcess(()=>{})

module.exports = continousStream;