
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