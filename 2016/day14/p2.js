const fs = require('fs');
const md5 = require('js-md5');
const input = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

function findTriples(h) {
    for(let i = 0; i < h.length - 2; i++) {
        if(h[i] === h[i + 1] && h[i] === h[i + 2]) {
            return h[i];
        }
    }
    return null;
}

function hash2016(h) {
    for(let i = 0; i <= 2016; i++) {
        h = md5(h);
    }
    return h;
}

const cache = {};
const salt = input[0];
let i = 0;
let key = 0;

while(key < 64) {
    const hash = cache[salt + i] ?? hash2016(salt + i);
    cache[salt + i] ??= hash;
    const triple = findTriples(hash);

    if(triple !== null) {
        main: for(let j = i + 1; j <= i + 1000; j++) {
            const hash2 = cache[salt + j] ?? hash2016(salt + j);
            cache[salt + j] ??= hash2;
            for(let k = 0; k < hash2.length - 5; k++) {
                if(hash2[k] === triple && hash2[k] === hash2[k + 1] && hash2[k] === hash2[k + 2] && hash2[k] === hash2[k + 3] && hash2[k] === hash2[k + 4]) {
                    key++;
                    break main;
                }
            }
        }
    }

    i++;
}

console.log(i - 1);