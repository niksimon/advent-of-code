const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const modules = {};

// first add conjuction modules
for(const line of data) {
    if(line.startsWith("&")) {
        let [name, destModules] = line.split(' -> ');
        name = name.substring(1);
        modules[name] = {destModules: destModules.split(', '), type: 'conjunction', pulses: {}};
    }
}

// then broadcaster and flip-flops
for(const line of data) {
    if(line.startsWith('&')) continue;

    let [name, destModules] = line.split(' -> ');
    destModules = destModules.split(', ');

    if(line.startsWith("broadcaster")) {
        modules[name] = {destModules, type: "broadcaster"};
    }
    else {
        name = name.substring(1);
        modules[name] = {destModules, type: "flipflop", on: false};
        for(const m of destModules) {
            if(modules[m] && modules[m].type === 'conjunction') {
                modules[m].pulses[name] = 'low';
            }
        }
    }
}

// console.log(modules);

let pulseCount = {low: 0, high: 0};

for(let i = 0; i < 1000; i++) {
    const queue = [];

    pulseCount.low++;

    for(const dm of modules.broadcaster.destModules) {
        // console.log(`broadcaster -low-> ${dm}`);
        queue.push({from: 'broadcaster', to: dm, pulse: 'low'});
        pulseCount.low++;
    }

    while(queue.length > 0) {
        const sender = queue.shift();
        const name = sender.to;
        const module = modules[name];

        if(module === undefined || (module.type === 'flipflop' && sender.pulse === 'high')) continue;

        let sendingPulse = null;

        if(module.type === 'flipflop' && sender.pulse === 'low') {
            module.on = !module.on;
            sendingPulse = module.on ? 'high' : 'low';
        }
        else if(module.type === 'conjunction') {
            modules[name].pulses[sender.from] = sender.pulse;
            sendingPulse = Object.values(module.pulses).every(e => e === 'high') ? 'low' : 'high';
        }

        for(const dm of module.destModules) {
            // console.log(`${name} -${sendingPulse}-> ${dm}`);
            queue.push({from: name, to: dm, pulse: sendingPulse});
            pulseCount[sendingPulse]++;
        }
    }
}

console.log(`Result: ${pulseCount.low * pulseCount.high}`);