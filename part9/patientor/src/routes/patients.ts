import express from 'express';
import toNewPatient, { parseEntry } from '../utils';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAll());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getOne(id);
  if(patient) {
    return res.send(patient);
  } else {
    return res.status(404).send('Patient not found');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    res.send(patientsService.add(newPatient));
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong \n';
    if (error instanceof Error) {
      console.log(error.message);
      errorMessage += error.message;
    }
    res.status(404).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log(req.body);
  
  const id = req.params.id;
  console.log(id);
  
  try {
    const entry = parseEntry(req.body);
    const patient = patientsService.addEntry(id, entry);
    if (!patient) {
      res.status(404).send('Patient with that ID not found');
    }
    res.send(patient);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong \n';
    if (error instanceof Error) {
      console.log(error.message);
      errorMessage += error.message;
    }
    res.status(404).send(errorMessage);
  }
});

export default router;