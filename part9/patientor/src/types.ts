export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: {
    date: string,
    criteria: string
  }
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type: 'OccupationalHealthcare'
  sickLeave?: {
    startDate: string,
    endDate: string
  }
  employerName: string,
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewEntry = Omit<Entry, "id">;
export interface NewPatient extends Omit<Patient, "id" | "entries"> {
  entries: NewEntry[];
}
export type NewDiagnosis = Omit<Diagnosis, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}