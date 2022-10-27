import patients from '../data/patients';
import { Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): Patient[] => {
  return patients;
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
  add
};