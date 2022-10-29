import patients from '../data/patients';
import { Patient, NewPatient } from '../types';
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
    ...p
  };

  patients.push(patient);
  return patient;
};

export default {
  getAll,
  getOne,
  add
};