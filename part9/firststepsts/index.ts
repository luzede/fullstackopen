
import express from 'express';
import { calculateBmi, calculateExercises } from './modules';
const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  
  const { daily_exercises, target } = req.body
  try {
    res.status(200).json(calculateExercises(daily_exercises, target))
  } catch {
    res.json({
      error: "malformatted parameters"
    })
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});



