const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

//let snailfish = inputs[0];
let maxMagnitude = 0;
//console.log(snailfish);

for(let n = 0; n < inputs.length - 1; n++) {
    for(let m = n + 1; m < inputs.length; m++) {
        snailfish = `[${inputs[n]},${inputs[m]}]`;
    
        let explode = true;
        let split = true;

        while (explode || split) {
            let level = 0;
            let explodePos = 0;
            let pos = 0;
            explode = false;
            split = false;

            // explode
            while(explodePos < snailfish.length) {
                pos = explodePos;

                while(pos < snailfish.length) {
                    let ch = snailfish[pos];
        
                    if(snailfish[pos] === '[') {
                        level++;
                    }
                    else if(snailfish[pos] === ']') {
                        level--;
                    }
        
                    if(level === 5 && ch === '[') {
                        const end = pos + snailfish.substring(pos, snailfish.length).indexOf(']');
                        const pair = snailfish.substring(pos + 1, end).split(',').map(e => +e);
                        //console.log(`Exploding pair: ${pair}`);
        
                        let explodedSnailfish = "";
                        let leftNumber = -1;
                        let leftNumberPos = -1;
        
                        for(let i = pos - 1; i >= 0; i--) {
                            if(Number.isInteger(+snailfish[i])) {
                                if(i > 0 && Number.isInteger(+snailfish[i - 1])) {
                                    leftNumber = +(snailfish[i - 1] + snailfish[i]) + pair[0];
                                    leftNumberPos = i - 1;
                                }
                                else {
                                    leftNumber = +snailfish[i] + pair[0];
                                    leftNumberPos = i;
                                }
                                
                                explodedSnailfish += snailfish.substring(0, leftNumberPos) + leftNumber + snailfish.substring(i + 1, pos);
                                break;
                            }
                        }
        
                        if(leftNumber === -1) {
                            explodedSnailfish += snailfish.substring(0, pos);
                        }
        
                        let rightNumber = -1;
                        for(let i = end + 2; i < snailfish.length; i++) {
                            if(Number.isInteger(+snailfish[i])) {
                                let rightNumberEnd = i + 1;
                                if(Number.isInteger(+snailfish[i + 1])) {
                                    rightNumber = +(snailfish[i] + snailfish[i + 1]) + pair[1];
                                    rightNumberEnd++;
                                }
                                else {
                                    rightNumber = +snailfish[i] + pair[1];
                                }
        
                                explodedSnailfish += '0' + snailfish.substring(end + 1, i) + rightNumber.toString() + snailfish.substring(rightNumberEnd, snailfish.length);
                                break;
                            }
                        }
        
                        if(rightNumber === -1) {
                            explodedSnailfish += '0' + snailfish.substring(end + 1, snailfish.length);
                        }
                        
                        explode = true;
                        level--;
                        snailfish = explodedSnailfish;
                        //console.log(snailfish);
                        explodePos = pos + 1;
                        break;
                    }
                    
                    pos++;
                    explodePos = pos;
                }
            }
            
            pos = 0;

            // split
            while(pos < snailfish.length - 1) {
                let ch = snailfish[pos];

                if(Number.isInteger(+ch) && Number.isInteger(+snailfish[pos + 1])) {
                    const num = +(ch + snailfish[pos + 1]);
                    const newPair = `[${Math.floor(num / 2)},${Math.ceil(num / 2)}]`;
                    //console.log(`Splitting number: ${num}`);

                    let splitSnailfish = snailfish.substring(0, pos) + newPair + snailfish.substring(pos + 2, snailfish.length);

                    split = true;
                    snailfish = splitSnailfish;
                    //console.log(snailfish);
                    break;
                }

                pos++;
            }
        }

        const magnitude = getMagnitude(snailfish);
        maxMagnitude = magnitude > maxMagnitude ? magnitude : maxMagnitude;
    }
}

console.log(`Max magnitude: ${maxMagnitude}`);

function getMagnitude(snailfish) {
    let foundPair = true;

    while(foundPair) {
        foundPair = false;
        let tmp = "";
        for(let i = 0; i < snailfish.length; i++) {
            const part = snailfish.substring(i + 1, snailfish.length);
            if(snailfish[i] === '[' && (part.indexOf(']') < part.indexOf('[') || part.indexOf('[') === -1) && Number.isInteger(+snailfish[i + 1])) {
                const end = i + snailfish.substring(i, snailfish.length).indexOf(']');
                const pair = snailfish.substring(i + 1, end);
                //console.log(`Pair: ${pair}`);
                const [left, right] = pair.split(',').map(e => +e);
                const magnitude = 3 * left + 2 * right;
                tmp = snailfish.substring(0, i) + magnitude + snailfish.substring(end + 1, snailfish.length);
                snailfish = tmp;
                foundPair = true;
                break;
            }
        }
    }

    //console.log(`Magnitude: ${snailfish}`);
    return +snailfish;
}

