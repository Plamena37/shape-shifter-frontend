export enum ROUTES {
  INDEX = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  DASHBOARD = "/dashboard",
  MEASUREMENTS = "/measurements",
  EXERCISE_TYPES = "/exercise-types",
  EXERCISES = "/exercises",
  WORKOUTS = "/workouts",
  PROFILE = "/profile",
  NOT_FOUND = "/*",
}

export enum ROLE {
  ADMIN = "admin",
  USER = "user",
}

export enum GENDER {
  FEMALE = "female",
  MALE = "male",
}

export enum EXERCISETYPE {
  PECTORALS = "pectorals",
  DELTOIDS = "deltoids",
  BICEPS = "biceps",
  TRICEPS = "triceps",
  DELTS = "delts",
  QUADRICEPS = "quadriceps",
  GLUTES = "glutes",
  HAMSTRINGS = "hamstrings",
  CALVES = "calves",
  LATS = "lats",
  TRAPEZIUS = "trapezius",
  ABDOMINALS = "abdominals",
  OBLIQUES = "obliques",
  RHOMBOIDS = "rhomboids",
  SHOULDERS = "shoulders",
}

export enum UsersSliceActionTypePrefix {
  USERS_CREATE = "users/signup",
  USERS_LOGIN = "users/login",
  USERS_GET_ALL = "users/getAllUsers",
  USERS_GET_ONE = "users/getUserById",
  USERS_UPDATE = "users/updateUserById",
  USERS_UPDATE_ROLE = "users/updateRole",
  USERS_DELETE = "users/deleteUser",
}

export enum MeasurementsSliceActionTypePrefix {
  MEASUREMENTS_CREATE = "measurements/createMeasurement",
  MEASUREMENTS_GET_ALL = "measurements/getAllMeasurements",
  MEASUREMENTS_GET_ONE = "measurements/getMeasurementById",
  MEASUREMENTS_UPDATE = "measurements/updateMeasurementById",
  MEASUREMENTS_DELETE = "measurements/deleteMeasurement",
}

export enum ExerciseTypesSliceActionTypePrefix {
  EXERCISE_TYPES_CREATE = "exerciseTypes/createExerciseType",
  EXERCISE_TYPES_GET_ALL = "exerciseTypes/getAllExerciseTypes",
  EXERCISE_TYPES_GET_ONE = "exerciseTypes/getExerciseTypeById",
  EXERCISE_TYPES_UPDATE = "exerciseTypes/updateExerciseTypeById",
  EXERCISE_TYPES_DELETE = "exerciseTypes/deleteExerciseType",
  EXERCISE_TYPES_FILTER = "exerciseTypes/filterExerciseTypes",
}

export enum ExercisesSliceActionTypePrefix {
  EXERCISES_CREATE = "exercises/createExercise",
  EXERCISES_GET_ALL = "exercises/getAllExercises",
  EXERCISES_GET_ONE = "exercises/getExerciseById",
  EXERCISES_UPDATE = "exercises/updateExerciseById",
  EXERCISES_DELETE = "exercises/deleteExercise",
}

export enum WorkoutsSliceActionTypePrefix {
  WORKOUTS_CREATE = "workouts/createWorkout",
  WORKOUTS_GET_ALL = "workouts/getAllWorkouts",
  WORKOUTS_UPDATE = "workouts/updateWorkoutById",
  WORKOUTS_DELETE = "workouts/deleteWorkout",
  WORKOUTS_SEARCH = "workouts/searchWorkouts",
  WORKOUTS_FILTER_EXERCISE_TYPES = "workouts/filterExerciseTypes",
  WORKOUTS_FILTER_MEASUREMENTS = "workouts/filterMeasurements",
}

export enum SnackbarSuccessMessages {
  USERS_CREATE = "User was created",
  USERS_EDIT = "Profile was updated",
  USERS_DELETE = "User was deleted",
  USERS_UPDATE_ROLE = "Role was updated",

  MEASUREMENTS_CREATE = "Measurement was created",
  MEASUREMENTS_EDIT = "Measurement was updated",
  MEASUREMENTS_DELETE = "Measurement was deleted",

  REQUESTS_CREATE = "Event request created",
  REQUESTS_CHANGE_STATUS = "Request updated",
  REQUESTS_EDIT = "Request was updated",

  SEASONS_DELETE = "Season was deleted",

  TECHNOLOGIES_CREATE = "Technology created",
  TECHNOLOGIES_EDIT = "Technology updated",
  TECHNOLOGIES_DELETE = "Technology deleted",

  ABSENCES_DELETE = "Absence was deleted",
}

export enum SnackbarErrorMessages {
  USERS_CREATE = "User couldn't be created",
  USERS_EDIT = "Profile couldn't be updated",
  USERS_DELETE = "User couldn't be deleted",
  USERS__GET_ALL = "User couldn't be displayed",
  USERS__GET_ONE = "User couldn't be displayed",
  USERS_UPDATE_ROLE = "Role couldn't be changed",

  MEASUREMENTS_GET_ALL = "Measurement couldn't be displayed",
  MEASUREMENTS_GET_ONE = "Measurement details couldn't be displayed",
  MEASUREMENTS_CREATE = "Measurement couldn't be created",
  MEASUREMENTS_UPDATE = "Measurement couldn't be updated",
  MEASUREMENTS_DELETE = "Measurement couldn't be deleted",

  REQUESTS_CREATE = "Event request couldn't be created",
  REQUESTS_CHANGE_STATUS = "Request couldn't be updated",
  REQUESTS_GET_ALL = "Request's couldn't be displayed",
  REQUESTS_EDIT = "Request couldn't be updated",

  SEASONS_DELETE = "Season couldn't be deleted",

  TECHNOLOGIES_CREATE = "Technology couldn't be created",
  TECHNOLOGIES_EDIT = "Technology couldn't be updated",
  TECHNOLOGIES_DELETE = "Technology could't be deleted",
  TECHNOLOGIES_GET_ONE_PAGE = "Technologies couldn't be displayed",

  ABSENCES_GET_ALL = "Absences couldn't be displayed",
  ABSENCES_CREATE = "Absence couldn't be created",
  ABSENCES_EDIT = "Absence couldn't be updated",
  ABSENCES_DELETE = "Absence couldn't be deleted",
}
