import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { useAppDispatch } from "../../app/store";
import { getExerciseTypeById } from "../../features/exerciseTypes/exerciseTypesSlice";
import {
  createExercise,
  deleteExercise,
  getExerciseById,
} from "../../features/exerciseSlice";
import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
} from "../../features/workouts/workoutSlice";
import { ExerciseType, Workout } from "../../utils/interfaces";
import { WorkoutsEditForm } from "..";
import { Button } from "../shared";

type WorkoutItemProps = {
  workout: Workout;
  isFilteredData: boolean;
};

const WorkoutsItem = ({ workout, isFilteredData }: WorkoutItemProps) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  // Array with all exercise type names of a single exercise
  const [exerciseTypeNames, setExerciseTypeNames] = useState<string[]>([]);

  // Array with all new exercise ids when duplicating a workout
  const [duplicateExerciseIds, setDuplicateExerciseIds] = useState<string[]>(
    []
  );

  // Array with all exercises in a workout
  // const [exerciseFromDuplicate, setExerciseFromDuplicate] = useState<
  //   Exercise[]
  // >([]);

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (!isFilteredData) {
      const fetchExerciseTypes = async () => {
        // Array with exercise type names of an exercise
        const types: string[] = [];

        for (const exerciseId of workout.exercises) {
          const exercise = await dispatch(getExerciseById(exerciseId)).unwrap();

          let exerciseType;

          if (exercise._id) {
            exerciseType = await dispatch(
              getExerciseTypeById(exercise?.exerciseType)
            ).unwrap();
          }

          if (exerciseType._id) {
            types.push(exerciseType.name);
          }
        }
        setExerciseTypeNames(types);
      };

      fetchExerciseTypes();
    }
  }, [dispatch, workout.exercises, setExerciseTypeNames]);

  const handleDuplicateWorkout = async (workout: Workout) => {
    for (const exerciseId of workout.exercises) {
      const exercise = await dispatch(getExerciseById(exerciseId)).unwrap();
      // setExerciseFromDuplicate((prev) => [...prev, exercise]);

      let newExercise: any;

      if (exercise._id) {
        newExercise = await dispatch(
          createExercise({
            exerciseType: exercise.exerciseType,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            time: exercise.time,
            distance: exercise.distance,
          })
        ).unwrap();
      }

      setDuplicateExerciseIds((prev) => [...prev, newExercise._id]);
    }
  };

  useEffect(() => {
    if (duplicateExerciseIds.length === workout.exercises.length) {
      dispatch(createWorkout({ exercises: duplicateExerciseIds, date: today }));
    }
  }, [duplicateExerciseIds]);

  const handleDeleteWorkout = () => {
    const action = (key: SnackbarKey) => (
      <>
        <Button
          btnStyle="btn__snackbar"
          size="small"
          btnVariant="text"
          onClick={async () => {
            await dispatch(deleteWorkout(workout._id!));
            dispatch(getAllWorkouts());

            workout.exercises.map((exerciseId) =>
              dispatch(deleteExercise(exerciseId))
            );

            closeSnackbar(key);
          }}
        >
          YES
        </Button>
        <Button
          btnStyle="btn__snackbar"
          size="small"
          btnVariant="text"
          onClick={() => {
            closeSnackbar(key);
          }}
        >
          NO
        </Button>
      </>
    );

    enqueueSnackbar("Proceed to delete?", {
      variant: "warning",
      preventDuplicate: true,
      persist: true,
      action,
    });
  };

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Accordion
        sx={{
          backgroundColor: "#f5f5f5",
          height: "100%",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexGrow: 1,
            }}
          >
            {workout.date}

            <div style={{ marginLeft: "auto" }}>
              <Button btnVariant="text" onClick={toggleDialog}>
                Edit
              </Button>
              <Button
                btnVariant="text"
                onClick={() => handleDuplicateWorkout(workout)}
              >
                Duplicate
              </Button>
              <Button
                btnVariant="text"
                onClick={handleDeleteWorkout}
                btnStyle="btn--delete"
              >
                Delete
              </Button>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {isFilteredData &&
              workout.found_exercise_types &&
              workout.found_exercise_types.length > 0 &&
              workout.found_exercise_types.map((el: ExerciseType) => (
                <span key={uuid()}>🟢{el.name} </span>
              ))}
            {!isFilteredData &&
              exerciseTypeNames.length > 0 &&
              exerciseTypeNames.map((name) => (
                <span key={uuid()}>🟢{name} </span>
              ))}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {open && (
        <WorkoutsEditForm
          open={open}
          toggleDialog={toggleDialog}
          title="Edit workout"
          workout={workout}
        />
      )}
    </>
  );
};

export default WorkoutsItem;
