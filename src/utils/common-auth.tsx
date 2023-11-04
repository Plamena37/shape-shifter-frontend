import {
  ErrorsInArrayExerciseTypes,
  ErrorsInArrayExercises,
  ErrorsInArrayLogin,
  ErrorsInArrayMeasurements,
  ErrorsInArraySignup,
} from "./common-interfaces";

export const validationConditions: { [key: string]: RegExp } = {
  name: /^.{2,}$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: /^.{6,}$/,
  gender: /^(?!$).+/,
  dateOfBirth: /^(?!$).+/,
  height: /^(1\d{2}|200|2[0-4]\d|250)$/,
  date: /^(?!$).+/,
};

export const validations = {
  name: "Enter a valid name",
  email: "Enter a valid email address",
  password: "Password must be at least 6 characters long",
  confirmPassword: "Passwords don't match",
  gender: "Pick your gender",
  dateOfBirth: "Pick your birth date",
  height: "Enter a height between 100 and 250",
  thirtyTo250: "Value must be between 30 and 250",
  thirtyTo200: "Value must be between 30 and 200",
  tenTo100: "Value must be between 10 and 100",
  zeroTo100: "Value must be between 0 and 100",
  zeroTo300: "Value must be between 0 and 300",
  duration: "Value must be of hh:mm format",
  photoUrl: "Enter valid image url",
  muscleGroups:
    "Value must be: pectorals, deltoids, biceps, triceps, delts, quadriceps, glutes, hamstrings, calves, lats, trapezius, abdominals, obliques, rhomboids, shoulders",
  date: "Enter a valid date",
};

export const pushErrorsInArray = (
  fieldErrors:
    | ErrorsInArrayLogin
    | ErrorsInArraySignup
    | ErrorsInArrayMeasurements
    | ErrorsInArrayExerciseTypes
    | ErrorsInArrayExercises
) => {
  const arrayWithValues = Object.values(fieldErrors);

  // If the array contains a falsy value, the operation stops and returns false
  return arrayWithValues.some((element) => element);
};
