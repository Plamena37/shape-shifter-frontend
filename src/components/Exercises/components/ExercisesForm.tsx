import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  DialogActions,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { RootState, useAppDispatch } from "../../../app/store";
import {
  createExercise,
  getExerciseById,
  updateExerciseById,
} from "../../../features/exerciseSlice";
import { getAllExerciseTypes } from "../../../features/exerciseTypes/exerciseTypeSlice";
import { Exercise } from "../../../utils/interfaces";
import { pushErrorsInArray, validations } from "../../../utils/auth.validation";
import { Button, TextField } from "../../shared";
import { Dialog } from "../..";
import "../ExercisesTable.scss";

type FormProps = {
  open: boolean;
  toggleDialog: () => void;
  title: string;
  actionType: "create" | "edit";
  exerciseData?: Exercise;
  exerciseId?: string;
  setExerciseIds?: Dispatch<SetStateAction<string[]>>;
  setExerciseTypeId?: Dispatch<SetStateAction<string>>;
};

const ExercisesForm = ({
  open,
  toggleDialog,
  title,
  actionType,
  exerciseData,
  exerciseId,
  setExerciseIds,
  setExerciseTypeId,
}: FormProps) => {
  const dispatch = useAppDispatch();

  const [createExerciseData, setCreateExerciseData] = useState<Exercise>({
    exerciseType: "",
    series: 0,
    repetitions: 0,
    weight: 0,
    time: "",
    distance: 0,
  });
  const [editExerciseData, setEditExerciseData] = useState({
    ...exerciseData,
  });

  const [fieldErrors, setFieldErrors] = useState({
    exerciseType: false,
    series: false,
    repetitions: false,
    weight: false,
    time: false,
    distance: false,
  });

  useEffect(() => {
    dispatch(getAllExerciseTypes());

    const getExercise = async () => {
      if (exerciseId) {
        const exercise = await dispatch(getExerciseById(exerciseId)).unwrap();

        setEditExerciseData(exercise);
      }
    };

    getExercise();
  }, []);

  const allExerciseTypes = useSelector(
    (state: RootState) => state.exerciseType.exerciseTypes
  );

  const exercise =
    actionType === "create" ? createExerciseData : editExerciseData;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    const numericValue = parseInt(value, 10);

    if (actionType === "create") {
      setCreateExerciseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (actionType === "edit") {
      setEditExerciseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    switch (name) {
      case "series":
      case "repetitions":
        setFieldErrors({
          ...fieldErrors,
          [name]: numericValue < 0 || numericValue > 100,
        });
        break;
      case "weight":
      case "distance":
        setFieldErrors({
          ...fieldErrors,
          [name]: numericValue < 0 || numericValue > 300,
        });
        break;
      case "time":
        setFieldErrors({
          ...fieldErrors,
          [name]: value === "",
        });
        break;
      case "exerciseType":
        setFieldErrors({
          ...fieldErrors,
          [name]: value === "",
        });
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (actionType === "create") {
        const data = await dispatch(
          createExercise(createExerciseData)
        ).unwrap();

        // Get all exercise ids when creating a workout
        setExerciseIds && setExerciseIds((prevIds) => [...prevIds, data._id]);
        setExerciseTypeId && setExerciseTypeId(data.exerciseType);
      } else if (actionType === "edit") {
        await dispatch(
          updateExerciseById({
            exerciseId: exercise._id ?? "",
            exerciseData: editExerciseData,
          })
        ).unwrap();
      }

      enqueueSnackbar("Success!", {
        preventDuplicate: true,
        variant: "success",
      });

      toggleDialog();
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

  return (
    <Dialog open={open} toggleDialog={toggleDialog} title={title}>
      <form onSubmit={handleSubmit} className="measurement__form">
        <FormControl variant="standard" fullWidth>
          <InputLabel id="exerciseType">Exercise type</InputLabel>
          <Select
            id="exerciseType"
            name="exerciseType"
            label="Exercise type"
            labelId="exerciseType"
            value={exercise.exerciseType ?? ""}
            onChange={(event) => handleChange(event)}
            required
          >
            {allExerciseTypes &&
              allExerciseTypes.length > 0 &&
              allExerciseTypes.map((el) => (
                <MenuItem key={el._id} value={el._id}>
                  {el.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          id="series"
          name="series"
          label="Series"
          onChange={(event) => handleChange(event)}
          value={exercise.series ?? ""}
          error={fieldErrors.series}
          helperText={fieldErrors.series && validations.zeroTo100}
          required={false}
        />

        <TextField
          id="repetitions"
          name="repetitions"
          label="Repetitions"
          type="repetitions"
          onChange={(event) => handleChange(event)}
          value={exercise.repetitions ?? ""}
          error={fieldErrors.repetitions}
          helperText={fieldErrors.repetitions && validations.zeroTo100}
          required={false}
        />

        <TextField
          id="weight"
          name="weight"
          label="Weight (kg)"
          onChange={(event) => handleChange(event)}
          value={exercise.weight ?? ""}
          error={fieldErrors.weight}
          helperText={fieldErrors.weight && validations.zeroTo300}
          required={false}
        />

        <TextField
          id="time"
          name="time"
          label="Time"
          onChange={(event) => handleChange(event)}
          value={exercise.time ?? ""}
          error={fieldErrors.time}
          helperText={fieldErrors.time && validations.duration}
          InputLabelProps={{ shrink: true }}
          required={false}
          placeholder="hh:mm"
        />

        <TextField
          id="distance"
          name="distance"
          label="Distance (km)"
          type="distance"
          onChange={(event) => handleChange(event)}
          value={exercise.distance ?? ""}
          error={fieldErrors.distance}
          helperText={fieldErrors.distance && validations.zeroTo300}
          required={false}
        />

        <Box
          sx={{
            marginInline: "auto",
          }}
        >
          <DialogActions>
            <Button onClick={toggleDialog}>Cancel</Button>
            <Button
              btnDisabled={pushErrorsInArray(fieldErrors)}
              btnType="submit"
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
};

export default ExercisesForm;
