const fs = require('fs');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

let validPassports = 0;
let fields = {};

for(const line of inputs) {
    if(line === '') {
        const fieldsCount = Object.keys(fields).length;
        let errors = 0;
        if(fieldsCount === 8 || (fieldsCount === 7 && fields.cid === undefined)) {
            console.log("Passport: ");
            console.log(fields);
            if(!(Number.isInteger(+fields.byr) && +fields.byr >= 1920 && +fields.byr <= 2002)) {
                console.log("Invalid birth year");
                errors++;
            }
            if(!(Number.isInteger(+fields.iyr) && +fields.iyr >= 2010 && +fields.iyr <= 2020)) {
                console.log("Invalid issue year");
                errors++;
            }
            if(!(Number.isInteger(+fields.eyr) && +fields.eyr >= 2020 && +fields.eyr <= 2030)) {
                console.log("Invalid expiration year");
                errors++;
            }
            if(!/^(1([5678][0-9]|9[0123])cm)|((59|6[0-9]|7[0123456])in)$/.test(fields.hgt)) {
                console.log("Invalid height");
                errors++;
            }
            if(!/^#[0-9abcdef]{6}$/.test(fields.hcl)) {
                console.log("Invalid hair color");
                errors++;
            }
            if(!/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(fields.ecl)) {
                console.log("Invalid eye color");
                errors++;
            }
            if(!/^[0-9]{9}$/.test(fields.pid)) {
                console.log("Invalid passport ID");
                errors++;
            }
            if(errors === 0) {
                console.log("Passport is valid");
                validPassports++;
            }
            console.log("");
        }
        fields = {};
        continue;
    }

    for(const field of line.split(' ')) {
        const [key, value] = field.split(':');
        fields[key] = value;
    }
}

console.log(validPassports);