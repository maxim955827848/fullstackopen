export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

if (require.main === module) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  if (isNaN(height) || isNaN(weight) || process.argv.length < 4) {
    console.log('Error: Invalid or missing arguments. Provide height (cm) and weight (kg)');
  } else {
    console.log(calculateBmi(height, weight));
  }
}
