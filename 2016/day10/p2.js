const fs = require('fs');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const bots = {};
const outputs = {};
const completed = [];
let i = 0;

function giveToBot(bot, value) {
    if(!bots[bot]) {
        bots[bot] = {lower: value, higher: null};
    }
    else {
        let [low, high] = [bots[bot].lower, bots[bot].higher];
        
        if(high == null) {
            if(value >= low) {
                bots[bot].higher = value;
            }
            else {
                bots[bot].higher = low;
                bots[bot].lower = value;
            }
        }
        else {
            if(value >= high) {
                bots[bot].higher = value;
            }
            else {
                bots[bot].lower = value;
            }
        }
    }
}

while(completed.length < input.length) {
    if(!completed.includes(i)) {
        const line = input[i];
        const params = line.split(' ');

        if(line.startsWith('value')) {
            const value = +params[1];
            const bot = params[5];

            giveToBot(bot, value);
            completed.push(i);
        }
        else {
            const bot = params[1];
            const lowTo = params[6];
            const lowToType = params[5];
            const highTo = params[11];
            const highToType = params[10];

            if(bots[bot] && bots[bot].lower && bots[bot].higher) {
                if(lowToType === 'bot') {
                    giveToBot(lowTo, bots[bot].lower);
                }
                else {
                    outputs[lowTo] = bots[bot].lower;
                }

                if(highToType === 'bot') {
                    giveToBot(highTo, bots[bot].higher);
                }
                else {
                    outputs[highTo] = bots[bot].higher;
                }

                bots[bot].lower = null;
                bots[bot].higher = null;

                completed.push(i);
            }
        }
    }

    i++;
    if(i >= input.length) {
        i = 0;
    }
}

console.log(outputs[0] * outputs[1] * outputs[2]);