const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const time = +inputs[0];
const busIds = inputs[1].split(',').filter(e => e !== 'x').map(e => +e);

print(time, busIds);

let bus = 0;
let i = time - 1;
while(bus === 0) {
    i++;
    for(const busId of busIds) {
        if(i % busId === 0) {
            bus = busId;
            break;
        }
    }
}

console.log(`BusID: ${bus}, Time: ${i}`);
console.log(`Result: ${(i - time) * bus}`);

function print(time, busIds) {
    let heading = "time    ";
    for(const busId of busIds) {
        heading += `    bus ${busId}`;
    }
    console.log(heading);

    for(let i = time - 10; i <= time + 10; i++) {
        let line = `${i}`;
        for(const busId of busIds) {
            line += `       ${busId >= 10 ? '  ' : ''}${i % busId === 0 ? 'D' : '.'}`;
        }
        console.log(line);
    }
}