import express from 'express';
import toNewPatient from '../utils';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAll());
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

export default router;