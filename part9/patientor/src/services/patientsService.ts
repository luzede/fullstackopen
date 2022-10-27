import patients from '../data/patients';
import { Patient } from '../types';

const getAll = (): Patient[] => {
  return patients;
};

export default {
  getAll,
};