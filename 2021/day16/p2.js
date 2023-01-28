const fs = require('fs');
const { validateHeaderValue } = require('http');
const inputs = fs.readFileSync(`./input.txt`, 'utf-8').split("\r\n");

const hex = inputs[0];
const binary = hexToBin(hex).padStart(hex.length, '0');

console.log(binary);

console.log(`Total value: ${readPacket(binary)}`);

function readPacket(packet) {
    let pos = 0;
    let totalValue = 0;
    const packetVersion = binToDec(packet.substring(pos, pos + 3));
    const typeID = binToDec(packet.substring(pos + 3, pos + 6));

    console.log(`Packet version: ${packetVersion}`);
    console.log(`Type ID: ${typeID}`);

    pos += 6;

    // // literal value packet
    if(typeID === 4) {
        const groups = packet.substring(pos, packet.length);

        let i = 0;
        let groupsCount = 0;

        while(true) {
            groupsCount++;
            if(groups[i] === '0') {
                break;
            }
            i += 5;
        }

        let groupsArr = [];
        for(let i = 0; i < groupsCount; i++) {
            groupsArr.push(groups.substring(5 * i, 5 * i + 5));
        }
        const value = binToDec(groupsArr.map(e => e.substring(1)).join(''));
        console.log(`Groups: ${groupsArr} - Value: ${value}\n`);

        pos += i + 5;

        return value;
    }
    // operator packet
    else {
        const lengthTypeID = packet[pos];
        console.log(`Length type ID: ${lengthTypeID}`);
        pos++;

        let subPacketsArr = [];

        if(lengthTypeID === '0') {
            const totalLength = binToDec(packet.substring(pos, pos + 15));
            console.log(`Total bits length of subpackets: ${totalLength}`);
            pos += 15;
            const subPackets = packet.substring(pos, pos + totalLength);
            
            let i = 0;

            while(i < totalLength) {
                const startPos = i;
                i += 3;
                const subPacketType = binToDec(subPackets.substring(i, i + 3));
                i += 3;
                if(subPacketType === 4) {
                    while(true) {
                        i += 5;
                        if(subPackets[i - 5] === '0') {
                            break;
                        }
                    }
                }
                else {
                    const subPacketLengthTypeID = subPackets[i];
                    i++;
                    if(subPacketLengthTypeID === '0') {
                        const subPacketTotalLength = binToDec(subPackets.substring(i, i + 15));
                        i += 15 + subPacketTotalLength;
                    }
                    else {
                        const subPacketCount = binToDec(subPackets.substring(i, i + 11));
                        i += 11;
                        i += readPacketLengthTypeOne(subPackets.substring(i, subPackets.length), subPacketCount)[0];
                    }
                }
                subPacketsArr.push(subPackets.substring(startPos, i));
            }

            console.log(`Subpackets: ${subPacketsArr}\n`);
        }
        else {
            const subPacketCount = binToDec(packet.substring(pos, pos + 11));
            pos += 11;
            subPacketsArr = readPacketLengthTypeOne(packet.substring(pos, packet.length), subPacketCount)[1];
            console.log(`Subpackets: ${subPacketsArr}\n`);
        }

        if(typeID === 0) {
            totalValue = 0;
            for(const sp of subPacketsArr) {
                totalValue += readPacket(sp);
            }
        }
        else if(typeID === 1) {
            totalValue = 1;
            for(const sp of subPacketsArr) {
                totalValue *= readPacket(sp);
            }
        }
        else if(typeID === 2) {
            totalValue = 9999999;
            for(const sp of subPacketsArr) {
                const packetValue = readPacket(sp);
                totalValue = packetValue < totalValue ? packetValue : totalValue;
            }
        }
        else if(typeID === 3) {
            totalValue = 0;
            for(const sp of subPacketsArr) {
                const packetValue = readPacket(sp);
                totalValue = packetValue > totalValue ? packetValue : totalValue;
            }
        }
        else if(typeID === 5) {
            totalValue = 0;
            if(readPacket(subPacketsArr[0]) > readPacket(subPacketsArr[1])) {
                totalValue = 1;
            }
        }
        else if(typeID === 6) {
            totalValue = 0;
            if(readPacket(subPacketsArr[0]) < readPacket(subPacketsArr[1])) {
                totalValue = 1;
            }
        }
        else if(typeID === 7) {
            totalValue = 0;
            if(readPacket(subPacketsArr[0]) === readPacket(subPacketsArr[1])) {
                totalValue = 1;
            }
        }
    }

    return totalValue;
}

function readPacketLengthTypeOne(packet, count) {
    let packets = [];
    let i = 0;
    while(count > 0) {
        let startPos = i;
        i += 3;
        const typeID = binToDec(packet.substring(i, i + 3));
        i += 3;
        if(typeID === 4) {
            while(true) {
                i += 5;
                if(packet[i - 5] === '0') {
                    break;
                }
            }
        }
        else {
            const packetLengthTypeID = packet[i];
            i++;
            if(packetLengthTypeID === '0') {
                const packetTotalLength = binToDec(packet.substring(i, i + 15));
                i += 15 + packetTotalLength;
            }
            else {
                const packetCount = binToDec(packet.substring(i, i + 11));
                i += 11;
                i += readPacketLengthTypeOne(packet.substring(i, packet.length), packetCount)[0];
            }
        }
        packets.push(packet.substring(startPos, i));
        count--;
    }
    return [i, packets];
}

function hexToBin(hex){
    let out = "";
    for(const c of hex) {
        switch(c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'A': out += "1010"; break;
            case 'B': out += "1011"; break;
            case 'C': out += "1100"; break;
            case 'D': out += "1101"; break;
            case 'E': out += "1110"; break;
            case 'F': out += "1111"; break;
            default: return "";
        }
    }
    return out;
}

function binToDec(bin) {
    return Number(parseInt(bin, 2).toString(10));
}