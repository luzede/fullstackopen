import { NewPatient, Gender, NewEntry, HealthCheckRating } from "./types";



// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const toNewPatient = (obj: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSSN(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: parseEntries(obj.entries)
  };
  return newPatient;
};

export default toNewPatient;



function parseString(value: unknown): string {
  if (!value || !isString(value)) {
    throw new Error('Invalid or missing input');
  }
  return value;
}

function parseName(name: unknown): string {
  if (!name || !isString(name)) {
    throw new Error('Invalid input in name');
  }
  return name;
}
function parseDate(date: unknown): string {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing dateOfBirth input');
  }
  return date;
}
function parseSSN(ssn: unknown): string {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Invalid or missing SSN');
  }
  return ssn;
}
function parseGender(gender: unknown): Gender {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Invalid or missing gender');
  }
  return gender;
}
function parseOccupation(occupation: unknown): string {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid or missing occupation');
  }
  return occupation;
}
function parseType(type: unknown): 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' {
  if (!type || !isType(type)) {
    throw new Error('Invalid or missing input type');
  }
  return type;
}
function parseEntries(entries: unknown): NewEntry[] {
  if(!entries || !areEntries(entries)) {
    throw new Error("Invalid or missing entries");
  }
  return entries;
}

function parseDiagnosisCodes(dCodes: unknown): string[] | undefined {
  const isStringArray = (array: Array<unknown>): array is Array<string> => {
    for (const i of array) {
      if(!isString(i)) return false;
    }
    return true;
  };
  if (!dCodes) return undefined;
  if (!Array.isArray(dCodes) || !isStringArray(dCodes)) {
    throw new Error('Invalid input in diagnosisCodes');
  }

  return dCodes;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function areEntries(input: any): input is NewEntry[] {
  try {
    for(const e of input) {
      parseString(e.description);
      parseDate(e.date);
      parseString(e.specialist);
      parseDiagnosisCodes(e.diagnosisCodes);
      parseType(e.type);
      switch(e.type) {
        case 'Hospital':
          parseDate(e.discharge.date);
          parseString(e.discharge.criteria);
          break;
        case 'HealthCheck':
          parseRating(e.healthCheckRating);
          break;
        case 'OccupationalHealthcare':
          if (e.sickLeave === undefined) break;
          parseDate(e.sickLeave.startDate);
          parseDate(e.sickLeave.endDate);
          parseString(e.employerName);
          break;
        default:
          console.log("=====\n=====\n=====");
          
          return false;
      }
    }
    return true;
  } catch(error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return false;
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(input: any): input is Gender {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(input);
}

function isRating(input: number): input is HealthCheckRating {
  return Object.values(HealthCheckRating).includes(input);
}
function isSSN(input: string): boolean {
  const regex = /^\d{6}-(\d|[A-Z]){3,4}$/;
  return regex.test(input);
}
function isDate(input: string): boolean {
  return Boolean(Date.parse(input));
}
function isString(input: unknown): input is string {
  return (typeof input === "string" || input instanceof String);
}

function isType(input: unknown): input is 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' {
  switch(input) {
    case 'Hospital': case 'OccupationalHealthcare': case 'HealthCheck':
      return true;
    default:
      return false;
  }
}

function parseRating(input: unknown): HealthCheckRating {
  if (!input || !isNumber(input) || !isRating(input)) {
    //throw new Error('Invalid or missing input in HealthCheckRating');
  }
  return input as HealthCheckRating;
}

function isNumber(input: unknown): input is number {
  if (!(input instanceof Number) ||  !(typeof input === 'number')) {
    return false;
  }
  return true;
}