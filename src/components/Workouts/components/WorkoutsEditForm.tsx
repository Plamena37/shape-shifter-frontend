import { useEffect, useState } from "react";
import { Box, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { useAppDispatch } from "../../../app/store";
import {
  deleteExercise,
  getExerciseById,
} from "../../../features/exerciseSlice";
import { getExerciseTypeById } from "../../../features/exerciseTypes/exerciseTypesSlice";
import {
  getAllWorkouts,
  updateWorkoutById,
} from "../../../features/workoutSlice";
import { Workout } from "../../../utils/interfaces";
import { Button, Dialog, ExercisesForm, TextField, WorkoutsForm } from "../..";
import "../WorkoutsAccordion.scss";

type FormProps = {
  open: boolean;
  toggleDialog: () => void;
  title: string;
  workout: Workout;
};

type ExerciseEditType = {
  exerciseId: string;
  name: string;
};

const WorkoutsEditForm = ({
  open,
  toggleDialog,
  title,
  workout,
}: FormProps) => {
  const dispatch = useAppDispatch();

  const [editWorkout, setEditWorkout] = useState({
    ...workout,
  });

  const [openExerciseForm, setOpenExerciseForm] = useState(false);
  const [openCreateExerciseForm, setCreateOpenExerciseForm] = useState(false);

  // Array of objects with exercise id and exercise type name
  const [exerciseIdAndName, setExerciseIdAndName] = useState<
    ExerciseEditType[]
  >([]);

  const [exerciseId, setExerciseId] = useState("");

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const fetchExerciseTypes = async () => {
      const types: ExerciseEditType[] = [];

      for (const exerciseId of workout.exercises) {
        const exercise = await dispatch(getExerciseById(exerciseId)).unwrap();

        let exerciseType;

        if (exercise._id) {
          exerciseType = await dispatch(
            getExerciseTypeById(exercise?.exerciseType)
          ).unwrap();
        }

        if (exerciseType._id) {
          types.push({
            exerciseId: exerciseId,
            name: exerciseType.name,
          });
        }
      }
      setExerciseIdAndName(types);
    };

    fetchExerciseTypes();
  }, [dispatch, workout.exercises]);

  const toggleExerciseForm = async (exerciseId?: string) => {
    setOpenExerciseForm(!openExerciseForm);

    exerciseId && setExerciseId(exerciseId);
  };

  const toggleCreateExerciseForm = async () => {
    setCreateOpenExerciseForm(!openCreateExerciseForm);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    setEditWorkout((prev) => ({
      ...prev,
      date: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(
        updateWorkoutById({
          workoutId: editWorkout._id as string,
          workoutData: editWorkout,
        })
      ).unwrap();

      enqueueSnackbar("Success!", {
        preventDuplicate: true,
        variant: "success",
      });

      toggleDialog();
      dispatch(getAllWorkouts());
    } catch (error: Error | any) {
      enqueueSnackbar(`${error.message}`, {
        preventDuplicate: true,
        variant: "error",
        autoHideDuration: 10000,
        action: (key) => (
          <IconButton color="inherit" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  };

  const handleDeleteExercise = (exerciseId: string) => {
    const action = (key: SnackbarKey) => (
      <>
        <Button
          color="secondary"
          size="small"
          btnVariant="text"
          onClick={() => {
            const exercisesIds = exerciseIdAndName
              .map((el) => el.exerciseId)
              .filter((id) => id !== exerciseId);
            dispatch(deleteExercise(exerciseId));

            dispatch(
              updateWorkoutById({
                workoutId: workout._id as string,
                workoutData: { exercises: exercisesIds },
              })
            );

            closeSnackbar(key);
          }}
        >
          YES
        </Button>
        <Button
          color="secondary"
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

  return (
    <>
      <Dialog open={open} toggleDialog={toggleDialog} title={title}>
        <form onSubmit={handleSubmit} className="workout__form">
          <Box
            sx={{
              marginInline: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ul className="workout__list">
              {exerciseIdAndName.length > 0 &&
                exerciseIdAndName.map((el) => (
                  <li key={uuid()} className="workout__list__item">
                    {el.name}
                    <div>
                      <Button
                        btnVariant="text"
                        onClick={() => toggleExerciseForm(el.exerciseId)}
                      >
                        Edit
                      </Button>
                      <Button
                        btnVariant="text"
                        btnStyle="btn--delete"
                        onClick={() => handleDeleteExercise(el.exerciseId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              {workout.found_exercise_types &&
                workout.found_exercise_types.map((exerciseType) =>
                  workout.exercises.map((exercise: any) => (
                    <li key={uuid()} className="workout__list__item">
                      {exerciseType.name}
                      <div>
                        <Button
                          btnVariant="text"
                          onClick={() => toggleExerciseForm(exercise._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          btnVariant="text"
                          btnStyle="btn--delete"
                          onClick={() => handleDeleteExercise(exercise?._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))
                )}
            </ul>

            <Box
              sx={{
                alignSelf: "stretch",
                margin: "1rem auto",
              }}
            >
              <TextField
                id="date"
                name="date"
                label="Date"
                type="date"
                onChange={(event) => handleChange(event)}
                value={editWorkout.date}
                inputProps={{ max: today }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <DialogActions>
              <Button onClick={toggleDialog}>Cancel</Button>
              <Button onClick={toggleCreateExerciseForm}>Add exercise</Button>
              <Button btnType="submit">Save</Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>

      {openExerciseForm && (
        <ExercisesForm
          open={openExerciseForm}
          toggleDialog={toggleExerciseForm}
          title="Edit exercise"
          actionType="edit"
          exerciseId={exerciseId}
        />
      )}

      {openCreateExerciseForm && (
        <WorkoutsForm
          open={openCreateExerciseForm}
          toggleDialog={toggleCreateExerciseForm}
          title="Add exercise"
          actionType="create"
          workoutData={workout}
        />
      )}
    </>
  );
};

export default WorkoutsEditForm;
