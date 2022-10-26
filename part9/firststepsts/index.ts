
import express from 'express'
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong')
});

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  
  res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight)
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
})


function calculateBmi(height: number, weight: number): string {
  const bmi = weight * 10000 / (height * height)
  if (bmi <= 18.5) {
    return "Underweight (unhealthy weight)"
  }
  else if (bmi < 25) {
    return "Normal (healthy weight)"
  }
  else if (bmi < 30) {
    return "Overweight (unhealthy weight)"
  }
  else if (bmi >= 30) {
    return "Obese (very unhealthy weight)"
  }
  else {
    throw new Error("Invalid input")
  }
}



