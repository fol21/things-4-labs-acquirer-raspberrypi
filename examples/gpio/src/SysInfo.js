const {execSync} = require('child_process');
const si = require('systeminformation');

function cpuTemperatureSync() {
    try {
        let tempInfo = {};
        let result  = [];
        execSync('cat /sys/class/thermal/thermal_zone*/temp')
            .toString()
            .split('\n')
            .forEach(element => {
               if(parseInt(element)) {
                   result.push(parseInt(element)/1000);
               }
            });
            tempInfo.max = result[0];
            tempInfo.main = result[1];
        return tempInfo;

    } catch (error) {
        return null;
    }
}

