const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let sum = 0;

for(const line of inputs) {
    const digitsPatterns = line.split(' | ')[0].split(' ').sort((a, b) => a.length - b.length);
    const vals = line.split(' | ')[1].split(' ');

    const digits = {1: digitsPatterns[0], 7: digitsPatterns[1], 4: digitsPatterns[2], 8: digitsPatterns[9]};

    const rightSegments = digits[1].split('');
    const midAndUpperLeftSegments = digits[4].split('').filter(e => e !== rightSegments[0] && e !== rightSegments[1]);

    //console.log(midAndUpperLeftSegments);

    for(let i = 3; i <= 5; i++) {
        if(digitsPatterns[i].includes(rightSegments[0]) && digitsPatterns[i].includes(rightSegments[1])) {
            digits[3] = digitsPatterns[i];
        }
        else if(digitsPatterns[i].includes(midAndUpperLeftSegments[0]) && digitsPatterns[i].includes(midAndUpperLeftSegments[1])) {
            digits[5] = digitsPatterns[i];
        }
        else {
            digits[2] = digitsPatterns[i];
        }
    }

    const upperRightSegment = digits[5].includes(digits[1][0]) ? digits[1][1] : digits[1][0];

    digits[6] = digits[8].split('').filter(e => e !== upperRightSegment).join('');
    digits[9] = digits[5] + upperRightSegment;

    for(const d of digits[4]) {
        if(d !== rightSegments[0] && d !== rightSegments[1] && digits[3].includes(d)) {
            digits[0] = digits[8].split('').filter(e => e !== d).join('');
            break;
        }
    }

    //console.log(digits);

    let num = '';
    for(const val of vals) {
        for(const d in digits) {
            if(val.split('').sort().join('') === digits[d].split('').sort().join('')) {
                num += d;
                break;
            }
        }
    }
    sum += +num;
}

console.log(sum);