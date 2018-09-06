const {execSync} = require('child_process');
const si = require('systeminformation');

/**
 * 
 * 
 * @returns 
 */
function cpuTemperatureSync() {
    try {
        let tempInfo = {};
        let result = [];
        execSync('cat /sys/class/thermal/thermal_zone*/temp')
            .toString()
            .split('\n')
            .forEach(element => {
                if (parseInt(element)) {
                    result.push(parseInt(element) / 1000);
                }
                else
                    result.push(-1);

            });
        tempInfo.max = result[0];
        tempInfo.main = result[1];
        return tempInfo;

    } catch (error) {
        return null;
    }
}
/**
 * 
 * 
 * @returns Promise
 */
async function cpuTemperature()
{
    try {
        return await si.cpuTemperature();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function systemInformations() {
    try {
        let bundle = {
            cpu: {},
            currentSpeed: {},
            temperature: {},
            memory: {}
        };
        bundle.cpu = await si.cpu();
        bundle.currentSpeed = await si.cpuCurrentspeed();
        bundle.temperature = await si.cpuTemperature();
        bundle.memory = await si.mem();
        return bundle;

    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    cpuTemperature,
    cpuTemperatureSync,
    systemInformations
};