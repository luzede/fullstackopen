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
        occupation: parseOccupation(obj.occupation),
        entries: parseEntries(obj.entries)
    };
    return newPatient;
};
exports.default = toNewPatient;
function parseString(value) {
    if (!value || !isString(value)) {
        throw new Error('Invalid or missing input');
    }
    return value;
}
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
// function parseType(type: unknown): 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' {
//   if (!type || !isType(type)) {
//     throw new Error('Invalid or missing input type')
//   }
//   return type;
// }
function parseEntries(entries) {
    if (!entries || !areEntries(entries)) {
        throw new Error("Invalid or missing entries");
    }
    return entries;
}
function parseDiagnosisCodes(dCodes) {
    const isStringArray = (array) => {
        for (const i of array) {
            if (!isString(i))
                return false;
        }
        return true;
    };
    if (!dCodes)
        return undefined;
    if (!Array.isArray(dCodes) || !isStringArray(dCodes)) {
        throw new Error('Invalid input in diagnosisCodes');
    }
    return dCodes;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function areEntries(input) {
    try {
        for (const e of input) {
            parseString(e.id);
            parseString(e.description);
            parseDate(e.date);
            parseString(e.specialist);
            parseDiagnosisCodes(e.diagnosisCodes);
            switch (input.type) {
                case 'Hospital':
                    parseDate(e.discharge.date);
                    parseString(e.discharge.criteria);
                    break;
                case 'HealthCheck':
                    parseRating(e.healthCheckRating);
                    break;
                case 'OccupationalHealthcare':
                    parseDate(e.sickLeave.startDate);
                    parseDate(e.sickLeave.endDate);
                    parseString(e.employerName);
                    break;
                default:
                    return false;
            }
        }
        return true;
    }
    catch (_a) {
        return false;
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(input) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(input);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRating(input) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(input);
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
// function isType(input: unknown): input is 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' {
//   switch(input) {
//     case 'Hospital': case 'OccupationalHealthcare': case 'HealthCheck':
//       return true;
//     default:
//       return false;
//   }
// }
function parseRating(input) {
    if (!input || !isRating(input)) {
        throw new Error('Invalid or missing input');
    }
    return input;
}
