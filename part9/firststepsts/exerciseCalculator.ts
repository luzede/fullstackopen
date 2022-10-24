
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
  let total: number = 0
  let trainingDays: number = 0
  const periodLength: number = array.length


  array.forEach((item: number) => {
    total += item
    if (item > 0) trainingDays++
  })

  const average: number = total/periodLength
  const success: boolean = average > target
  const rating: number = (average < target) ? 1 : (average - target) >= 1 ? 3 : 2
  let ratingDescription: string = (rating === 1)
    ? "You did poorly"
    : (rating === 2)
    ? "You did good"
    : (rating === 3)
    ? "You did great"
    : "There was an error"

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

let array: Array<number> = []
let target: number

for (let i = 2; i < process.argv.length; i++) {
  
  if (i === process.argv.length - 1) {
    target = Number(process.argv[i])
    break
  }
  array.push(Number(process.argv[i]))
}


console.log(calculateExercises(array, target));

