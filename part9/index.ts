import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const targetNum = Number(target);
  if (isNaN(targetNum) || !Array.isArray(daily_exercises) || daily_exercises.some(e => isNaN(Number(e)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const exercises = daily_exercises.map(Number);
  const result = calculateExercises(exercises, targetNum);
  return res.json(result);
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`TypeScript server running on port ${PORT}`);
});
