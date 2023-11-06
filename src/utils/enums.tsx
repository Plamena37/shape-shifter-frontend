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

export enum ExerciseTypesSliceActionTypePrefix {
  EXERCISE_TYPES_CREATE = "exerciseTypes/createExerciseType",
  EXERCISE_TYPES_GET_ALL = "exerciseTypes/getAllExerciseTypes",
  EXERCISE_TYPES_GET_ONE = "exerciseTypes/getExerciseTypeById",
  EXERCISE_TYPES_UPDATE = "exerciseTypes/updateExerciseTypeById",
  EXERCISE_TYPES_DELETE = "exerciseTypes/deleteExerciseType",
  EXERCISE_TYPES_FILTER = "exerciseTypes/filterExerciseTypes",
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
