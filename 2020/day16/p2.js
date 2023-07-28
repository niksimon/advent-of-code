const { error } = require('console');
const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const ranges = new Set();
const fields = {};
let i = 0;

// get ranges
while(inputs[i] !== '') {
    const line = inputs[i].split(":");
    let range = line[1].trim().split(" or ").map(e => e.split('-').map(n => +n));
    fields[line[0]] = range;
    
    for(const r of range) {
        const [low, high] = [r[0], r[1]];
        for(let j = low; j <= high; j++) {
            ranges.add(j);
        }
    }

    i++;
}

//console.log(fields);

i += 2;

// my ticket
const myTicket = inputs[i].split(',').map(e => +e);
console.log('My ticket:');
console.log(myTicket);

i += 3;

// get valid tickets
const valid = [];
while(i < inputs.length) {
    const ticket = inputs[i].split(',').map(e => +e);
    if(ticket.every(e => ranges.has(e))) {
        valid.push(ticket);
    }
    i++;
}

const fieldsTotalCount = Object.keys(fields).length;
const fieldsMap = [];

for(let j = 1; j <= fieldsTotalCount; j++) {
    fieldsMap.push([j, []]);

    for(const field in fields) {
        const ranges = fields[field];
        let inRange = true;

        for(let k = 0; k < valid.length; k++) {
            const value = valid[k][j - 1];
            if(!(value >= ranges[0][0] && value <= ranges[0][1] || value >= ranges[1][0] && value <= ranges[1][1])) {
                inRange = false;
                break;
            }
        }

        if(!(myTicket[j - 1] >= ranges[0][0] && myTicket[j - 1] <= ranges[0][1] 
            || myTicket[j - 1] >= ranges[1][0] && myTicket[j - 1] <= ranges[1][1])) {
            inRange = false;
        }

        if(inRange) {
            fieldsMap[j - 1][1].push(field);
        }
    }
}

// sort fields by array length
fieldsMap.sort((a, b) => a[1].length - b[1].length);
//console.log(fieldsMap);

const correctFields = {};
correctFields[fieldsMap[0][1][0]] = fieldsMap[0][0];
let l = 1;

// go through each array and add the correct column to the field name in map
while(Object.keys(correctFields).filter(e => e.startsWith("departure")).length < 6) {
    const flds = fieldsMap[l][1];
    const val = fieldsMap[l][0];
    flds.forEach(f => {
        if(correctFields[f] === undefined) {
            correctFields[f] = val;
        }
    });
    l++;
}

// multiply 6 values
const result = Object.keys(correctFields).filter(e => e.startsWith("departure"))
            .reduce((a,c) => myTicket[correctFields[c] - 1] * a, 1);
console.log(result);

// or
// manually find correct fields
// sort by array size
// '20': [ 'wagon' ]
// '1': [ 'train', 'wagon' ],
// '3': [ 'duration', 'train', 'wagon' ],
// '12': [ 'duration', 'train', 'wagon', 'zone' ],
// '5': [ 'arrival location', 'duration', 'train', 'wagon', 'zone' ],
// '8': [ 'arrival location', 'duration', 'price', 'train', 'wagon', 'zone'
// '15': ['arrival location','duration','price','seat','train','wagon','zone'
// '17': ['departure track','arrival location','duration','price','seat','train','wagon','zone'
// '6': ['departure station','departure track','arrival location','duration','price','seat','train','wagon','zone'
// ...
//
//
//
// 1 train
// 2
// 3 duration
// 4
// 5 arrival location
// 6 departure station
// 7
// 8 price
// 9 departure location
// 10
// 11 departure date
// 12 zone
// 13
// 14 departure platform
// 15 seat
// 16
// 17 departure track
// 18
// 19 departure time
// 20 = wagon

// 6. 9. 11. 14. 17. 19
//console.log(myTicket[5] * myTicket[8] * myTicket[10] * myTicket[13] * myTicket[16] * myTicket[18]);