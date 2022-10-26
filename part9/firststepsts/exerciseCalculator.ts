
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


const calculateExercises = (array: Array<number>, target: number): Result => {
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

const array: Array<number> = [];
let target = 0;

try {
  for (let i = 2; i < process.argv.length; i++) {
    if (isNaN(Number(process.argv[i]))) throw new Error("Invalid input");
    
    if (i === process.argv.length - 1) {
      target = Number(process.argv[i]);
      break;
    }
    array.push(Number(process.argv[i]));
  }
} catch(error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}



console.log(calculateExercises(array, target));

