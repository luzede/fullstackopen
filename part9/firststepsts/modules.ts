
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


export const calculateExercises = (array: Array<number>, target: number): Result => {
  let total = 0;
  let trainingDays = 0;
  const periodLength: number = array.length;


  array.forEach((item: number) => {
    total += item;
    if (item > 0) trainingDays++;
  });

  const average: number = total/periodLength;
  const success: boolean = average > target;
  const rating: number = (average < target) ? 1 : (average - target) >= 1 ? 3 : 2;
  const ratingDescription: string = (rating === 1)
    ? "You did poorly"
    : (rating === 2)
    ? "You did good"
    : (rating === 3)
    ? "You did great"
    : "There was an error";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

export function calculateBmi(height: number, weight: number): string {
  const bmi = weight * 10000 / (height * height);
  if (bmi <= 18.5) {
    return "Underweight (unhealthy weight)";
  }
  else if (bmi < 25) {
    return "Normal (healthy weight)";
  }
  else if (bmi < 30) {
    return "Overweight (unhealthy weight)";
  }
  else if (bmi >= 30) {
    return "Obese (very unhealthy weight)";
  }
  else {
    throw new Error("Invalid input");
  }
}