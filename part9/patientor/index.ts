import express from 'express';
import cors from 'cors';

import diagnosesRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';


const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});