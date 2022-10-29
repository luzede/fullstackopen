import { NewPatient, Gender } from "./types";



// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const toNewPatient = (obj: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSSN(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: []
  };
  return newPatient;
};

export default toNewPatient;





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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(input: any): input is Gender {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(input);
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