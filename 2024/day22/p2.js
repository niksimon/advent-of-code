const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(n => +n);

const sequences = {};
let maxSequence = [0, ''];

for(let secret of data) {
    let prevPrice = secret % 10;
    const seenBuyerSequences = new Set();
    const sequence = [prevPrice];

    for(let i = 0; i < 2000; i++) {
        secret = (secret ^ (secret << 6)) & 16777215;
        secret = (secret ^ (secret >> 5)) & 16777215;
        secret = (secret ^ (secret << 11)) & 16777215;

        const currentPrice = secret % 10;
        const priceDiff = currentPrice - prevPrice;
        prevPrice = currentPrice;
        sequence.push(priceDiff);

        if(i >= 3) {
            sequence.shift();
            const sequenceKey = sequence.join();

            if(!sequences[sequenceKey]) {
                sequences[sequenceKey] = currentPrice;
            }
            else if(!seenBuyerSequences.has(sequenceKey)) {
                sequences[sequenceKey] += currentPrice;
            }

            if(maxSequence[0] < sequences[sequenceKey]) {
                maxSequence = [sequences[sequenceKey], sequenceKey];
            }

            seenBuyerSequences.add(sequenceKey);
        }
    }
}

console.log(maxSequence);