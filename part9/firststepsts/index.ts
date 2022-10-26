
import express from 'express';
import { calculateBmi } from './modules';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  try {
    res.json({
      height,
      weight,
      bmi: calculateBmi(height, weight)
    });
  } catch {
    res.json({
      error: 'malformatted parameters'
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});



