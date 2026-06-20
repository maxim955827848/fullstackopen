interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(h => h > 0).length;
  const totalHours = dailyExercises.reduce((sum, h) => sum + h, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'bad, you need to train harder';

  if (success) {
    rating = 3;
    ratingDescription = 'excellent work, target achieved';
  } else if (average >= target * 0.7) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

if (require.main === module) {
  const target = Number(process.argv[2]);
  const dailyExercises = process.argv.slice(3).map(Number);
  if (isNaN(target) || dailyExercises.some(isNaN) || process.argv.length < 4) {
    console.log('Error: Invalid arguments. First arg is target, followed by daily exercise hours');
  } else {
    console.log(calculateExercises(dailyExercises, target));
  }
}
