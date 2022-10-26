
import express from 'express'
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong')
});

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack!')
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
})



