import { useEffect, useState } from "react";
import { Box, DialogActions, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { useAppDispatch } from "../../../app/store";
import {
  createWorkout,
  getAllWorkouts,
  updateWorkoutById,
} from "../../../features/workoutSlice";
import { getExerciseTypeById } from "../../../features/exerciseTypeSlice";
import { getExerciseById } from "../../../features/exerciseSlice";
import { Workout } from "../../../utils/common-interfaces";
import { Dialog, ExercisesForm } from "../..";
import { Button, TextField } from "../../UI";
import "../WorkoutsAccordion.scss";

type FormProps = {
  open: boolean;
  toggleDialog: () => void;
  title: string;
  actionType: "create" | "edit";
  workoutData?: Workout;
};

const WorkoutsForm = ({
  open,
  toggleDialog,
  title,
  actionType,
  workoutData,
}: FormProps) => {
  const dispatch = useAppDispatch();

  const [createWorkoutData, setCreateWorkoutData] = useState<Workout>({
    exercises: [],
    date: "",
  });

  const [editWorkoutData, setEditWorkoutData] = useState({
    ...workoutData,
  });

  const [openExerciseForm, setOpenExerciseForm] = useState(false);
  const [openEditExerciseForm, setOpenEditExerciseForm] = useState(false);

  // Array with all exrcise ids when creating a workout, modified in ExerciseForm
  const [exerciseIds, setExerciseIds] = useState<string[]>([]);

  // Array with all exercise type names of a single exercise
  const [exerciseTypeNames, setExerciseTypeNames] = useState<string[]>([]);

  // String
  const [exerciseTypeId, setExerciseTypeId] = useState("");

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    dispatch(getAllWorkouts());
  }, []);

  useEffect(() => {
    // Get exercise type id
    const getExercise = async (id: string) => {
      const exercise = await dispatch(getExerciseById(id)).unwrap();

      return exercise.exerciseType;
    };

    // Get exercise type name
    const getExerciseTypeName = async (id: string) => {
      const exerciseType = await dispatch(getExerciseTypeById(id)).unwrap();

      setEditWorkoutData({ ...exerciseType });
      if (exerciseType.name) {
        setExerciseTypeNames((prev) => [...prev, exerciseType.name]);
      }
    };

    if (actionType === "edit") {
      workoutData!.exercises.map(async (el: string) => {
        const id = await getExercise(el);

        getExerciseTypeName(id);
      });
    } else {
      getExerciseTypeName(exerciseTypeId);
    }
  }, [exerciseTypeId, dispatch]);

  const workout = actionType === "create" ? createWorkoutData : editWorkoutData;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setCreateWorkoutData((prev) => ({
      ...prev,
      date: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (actionType === "create") {
        if (exerciseIds.length === 0) {
          throw new Error("No exercises added");
        }
        await dispatch(
          createWorkout({
            exercises: exerciseIds,
            date: createWorkoutData.date,
          })
        ).unwrap();
        setExerciseTypeNames([]);
      } else if (actionType === "edit") {
        await dispatch(
          updateWorkoutById({
            workoutId: editWorkoutData._id as string,
            workoutData: editWorkoutData,
          })
        ).unwrap();
      }

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

  const toggleExerciseFormDialog = () => {
    setOpenExerciseForm(!openExerciseForm);
  };

  const toggleEditExerciseFormDialog = () => {
    setOpenEditExerciseForm(!openEditExerciseForm);
  };

  const createContent = (
    <div className="exercise__name">
      {exerciseTypeNames.length > 0 ? (
        exerciseTypeNames.map((name) => (
          <p key={uuid()} className="exercise__name--special">
            🟢
            {name}
          </p>
        ))
      ) : (
        <p className="exercise__name--no__content">No exercises added..</p>
      )}
    </div>
  );

  const editContent = (
    <ul>
      {exerciseTypeNames.length > 0 &&
        exerciseTypeNames.map((name) => (
          <div key={uuid()}>
            <p className="exercise__name--special">
              🟢
              {name}
            </p>
            <div>
              <Button
                btnVariant="outlined"
                onClick={toggleEditExerciseFormDialog}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
    </ul>
  );

  return (
    <>
      <Dialog open={open} toggleDialog={toggleDialog} title={title}>
        <form onSubmit={handleSubmit} className="measurement__form">
          <div className="workout__form__nav">
            <p>Add exercise to your workout</p>
            <Button btnVariant="text">
              <AddCircleOutlineIcon
                className="workout__form__nav--icon"
                onClick={toggleExerciseFormDialog}
              />
            </Button>
          </div>
          {actionType === "create" ? createContent : editContent}

          <TextField
            id="date"
            name="date"
            label="Date"
            type="date"
            onChange={(event) => handleChange(event)}
            value={createWorkoutData.date}
            inputProps={{ max: today }}
            InputLabelProps={{ shrink: true }}
          />
          <Box
            sx={{
              marginInline: "auto",
            }}
          >
            <DialogActions>
              <Button onClick={toggleDialog}>Cancel</Button>
              <Button btnType="submit">Save</Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>

      {openExerciseForm && (
        <ExercisesForm
          open={openExerciseForm}
          toggleDialog={toggleExerciseFormDialog}
          title="Add exercise"
          actionType="create"
          setExerciseIds={setExerciseIds}
          setExerciseTypeId={setExerciseTypeId}
        />
      )}

      {openEditExerciseForm && (
        <ExercisesForm
          open={openEditExerciseForm}
          toggleDialog={toggleEditExerciseFormDialog}
          title="Edit exercise"
          actionType="edit"
        />
      )}
    </>
  );
};

export default WorkoutsForm;
