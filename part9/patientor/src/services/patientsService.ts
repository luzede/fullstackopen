import patients from '../data/patients';
import { Patient, NewPatient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): Patient[] => {
  return patients;
};

const getOne = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const add = (p: NewPatient): Patient => {
  const patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    id: uuid(),
    ...p,
    entries: p.entries.map((entry: NewEntry) => {
      return {
        ...entry,
        id: uuid()
      } as Entry;
    })
  };

  patients.push(patient);
  return patient;
};

const addEntry = (patientId: string, newEntry: NewEntry) => {
  const patient = patients.find((p) => p.id === patientId);
  console.log(patient);
  
  if (!patient) return undefined;
  const entry = {
    ...newEntry,
    id: uuid()
  } as Entry;

  patient.entries.push(entry);
  return patient;
};

export default {
  getAll,
  getOne,
  add,
  addEntry
};