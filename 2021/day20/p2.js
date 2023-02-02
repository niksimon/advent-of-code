const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const algorithm = inputs[0];
let image = {map: new Set(), top: inputs.length - 2, bottom: 0, right: inputs[2].length, left: 0, outerPixelsOn: false, litPixels: null};

for(let i = 2; i < inputs.length; i++) {
    for(let j = 0; j < inputs[i].length; j++) {
        const ch = inputs[i][j];
        if(ch === '#') {
            image.map.add(`${j},${i - 2}`);
        }
    }
}

for(let i = 0; i < 50; i++) {
    image = enhance(image, algorithm);
}

console.log(image.litPixels);

function enhance(image, algorithm) {
    const newImage = {map: new Set(), top: image.top + 1, bottom: image.bottom - 1, right: image.right + 1, left: image.left - 1, outerPixelsOn: image.outerPixelsOn, litPixels: 0};

    for(let i = image.bottom - 1; i < image.top + 1; i++) {
        for(let j = image.left - 1; j < image.right + 1; j++) {
            let pixels = '';
            for(let n = i - 1; n <= i + 1; n++) {
                for(let m = j - 1; m <= j + 1; m++) {
                    // out of bounds
                    if(n < image.bottom || m < image.left || n >= image.top || m >= image.right) {
                        pixels += image.outerPixelsOn ? '1' : '0';
                    }
                    // in bounds
                    else if(image.map.has(`${m},${n}`)) {
                        pixels += '1';
                    }
                    else {
                        pixels += '0';
                    }
                }
            }
            const idx = parseInt(pixels, 2);
            if(algorithm[idx] === '#') {
                newImage.litPixels++;
                newImage.map.add(`${j},${i}`);
            }
        }
    }

    if(algorithm[0] === '#' && algorithm[511] === '.') {
        newImage.outerPixelsOn = !image.outerPixelsOn;
    }

    return newImage;
}