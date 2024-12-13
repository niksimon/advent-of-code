const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n').map(e => e.split("\r\n"));

let sum = 0;

for(const config of data) {
    const buttonA = config[0].split(': ')[1].split(', ').map(e => +e.split('+')[1]);
    const buttonB = config[1].split(': ')[1].split(', ').map(e => +e.split('+')[1]);
    const prize = config[2].split(': ')[1].split(', ').map(e => +e.split('=')[1] + 10000000000000);

    // x * buttonA[0] + y * buttonB[0] = prize[0];
    // x * buttonA[1] + y * buttonB[1] = prize[1];

    // Get x from first equation
    // x = (prize[0] - y * buttonB[0]) / buttonA[0];

    // Insert x into second equation
    // ((prize[0] - y * buttonB[0]) / buttonA[0]) * buttonA[1] + y * buttonB[1] = prize[1];

    // Multiply by buttonA[0]
    // (prize[0] - y * buttonB[0]) * buttonA[1] + y * buttonB[1] * buttonA[0] = prize[1] * buttonA[0]
    // prize[0] * buttonA[1] - y * buttonB[0] * buttonA[1] + y * buttonB[1] * buttonA[0] = prize[1] * buttonA[0]
    // - y * buttonB[0] * buttonA[1] + y * buttonB[1] * buttonA[0] = prize[1] * buttonA[0] - prize[0] * buttonA[1]
    // y * (buttonB[1] * buttonA[0] - buttonB[0] * buttonA[1]) = prize[1] * buttonA[0] - prize[0] * buttonA[1]
    // y = (prize[1] * buttonA[0] - prize[0] * buttonA[1]) / (buttonB[1] * buttonA[0] - buttonB[0] * buttonA[1])

    const y = (prize[1] * buttonA[0] - prize[0] * buttonA[1]) / (buttonB[1] * buttonA[0] - buttonB[0] * buttonA[1]);
    const x = (prize[0] - y * buttonB[0]) / buttonA[0];

    if(x % 1 == 0 && y % 1 == 0 && x > 0 && y > 0) {
        sum += x * 3 + y;
    }
}

console.log(sum);