"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const toNewPatient = (obj) => {
    const newPatient = {
        name: parseName(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseSSN(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseOccupation(obj.occupation)
    };
    return newPatient;
};
exports.default = toNewPatient;
function parseName(name) {
    if (!name || !isString(name)) {
        throw new Error('Invalid input in name');
    }
    return name;
}
function parseDate(date) {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Invalid or missing dateOfBirth input');
    }
    return date;
}
function parseSSN(ssn) {
    if (!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Invalid or missing SSN');
    }
    return ssn;
}
function parseGender(gender) {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Invalid or missing gender');
    }
    return gender;
}
function parseOccupation(occupation) {
    if (!occupation || !isString(occupation)) {
        throw new Error('Invalid or missing occupation');
    }
    return occupation;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(input) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(input);
}
function isSSN(input) {
    const regex = /^\d{6}-(\d|[A-Z]){3,4}$/;
    return regex.test(input);
}
function isDate(input) {
    return Boolean(Date.parse(input));
}
function isString(input) {
    return (typeof input === "string" || input instanceof String);
}
