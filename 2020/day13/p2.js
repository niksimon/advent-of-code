const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const allBusIds = inputs[1].split(',');
const busIds = inputs[1].split(',').filter(e => e !== 'x').map(e => +e);
const busDelays = {};

// Get delays for all busses
for(let i = 0; i < allBusIds.length; i++) {
    if(allBusIds[i] !== 'x') {
        busDelays[allBusIds[i]] = i;
    }
}

let lcm = 1;
let time = 0;

for(let i = 1; i < busIds.length; i++) {
    let found = false;
    lcm *= busIds[i - 1];

    // find the time when the sequence happens for busses 1 and 2, then for busses 1,2,3 and so on
    // since all ids are prime, lcm is product of them
    // time is increased by lcm
    while(!found) {
        found = true;
        time += lcm;
        for(let j = 0; j <= i; j++) {
            if((time + busDelays[busIds[j]]) % busIds[j] !== 0) {
                found = false;
                break;
            }
        }
    }
}

console.log(`Time: ${time}`);
//print(time, busIds);

function print(time, busIds) {
    let heading = "time             ";
    for(const busId of busIds) {
        heading += `    bus ${busId}`;
    }
    console.log(heading);

    for(let i = time - 10; i <= time + 100; i++) {
        let line = `${i}`;
        for(const busId of busIds) {
            line += `       ${busId >= 10 ? '  ' : ''}${i % busId === 0 ? 'D' : '.'}`;
        }
        console.log(line);
    }

    console.log();
}