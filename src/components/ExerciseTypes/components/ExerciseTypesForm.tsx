import { useState } from "react";
import {
  Box,
  Chip,
  DialogActions,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useAppDispatch } from "../../../app/store";
import { ExerciseType } from "../../../utils/interfaces";
import { pushErrorsInArray, validations } from "../../../utils/auth.validation";
import { EXERCISETYPE } from "../../../utils/enums";
import {
  createExerciseType,
  getAllExerciseTypes,
  updateExerciseTypeById,
} from "../../../features/exerciseTypes/exerciseTypesSlice";
import { Button, TextField } from "../../shared";
import { Dialog } from "../..";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (
  muscle: string,
  muscleGroups: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      muscleGroups.indexOf(muscle) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

type FormProps = {
  open: boolean;
  toggleDialog: () => void;
  title: string;
  actionType: "create" | "edit";
  exerciseTypeData?: ExerciseType;
};

const ExerciseTypesForm = ({
  open,
  toggleDialog,
  title,
  actionType,
  exerciseTypeData,
}: FormProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [createExerciseTypeData, setCreateExerciseTypeData] =
    useState<ExerciseType>({
      name: "",
      muscleGroups: [],
    });

  const [editExerciseTypeData, setEditExerciseTypeData] = useState({
    ...exerciseTypeData,
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    muscleGroups: false,
  });

  const exerciseType =
    actionType === "create" ? createExerciseTypeData : editExerciseTypeData;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string[]>
  ) => {
    const { name, value } = event.target;

    if (actionType === "create") {
      setCreateExerciseTypeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "muscleGroups") {
        setCreateExerciseTypeData((prevData) => ({
          ...prevData,
          muscleGroups: typeof value === "string" ? value.split(",") : value,
        }));
      }
    } else if (actionType === "edit") {
      setEditExerciseTypeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "muscleGroups") {
        setEditExerciseTypeData((prevData) => ({
          ...prevData,
          muscleGroups: typeof value === "string" ? value.split(",") : value,
        }));
      }
    }

    switch (name) {
      case "name":
        setFieldErrors({
          ...fieldErrors,
          [name]: value === "",
        });
        break;

      case "muscleGroups":
        setFieldErrors({
          ...fieldErrors,
          [name]: value.length === 0,
        });
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (actionType === "create") {
        if (createExerciseTypeData.muscleGroups.length > 0) {
          await dispatch(createExerciseType(createExerciseTypeData)).unwrap();
        } else {
          setFieldErrors((prevState) => ({
            ...prevState,
            muscleGroups: true,
          }));
          throw new Error("Muscle groups must not be empty");
        }
      } else if (actionType === "edit") {
        await dispatch(
          updateExerciseTypeById({
            exerciseTypeId: exerciseType._id ?? "",
            exerciseTypeData: editExerciseTypeData,
          })
        ).unwrap();
      }

      enqueueSnackbar("Success!", {
        preventDuplicate: true,
        variant: "success",
      });

      toggleDialog();
      dispatch(getAllExerciseTypes());
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
        <TextField
          id="name"
          name="name"
          label="Name"
          onChange={(event) => handleChange(event)}
          value={exerciseType!.name}
          error={fieldErrors.name}
          helperText={fieldErrors.name && validations.name}
          variant="outlined"
        />

        <FormControl fullWidth>
          <InputLabel id="muscleGroupsLabel">Muscle groups</InputLabel>
          <Select
            labelId="muscleGroupsLabel"
            id="muscleGroups"
            name="muscleGroups"
            multiple
            key="Muscle groups"
            value={exerciseType!.muscleGroups}
            onChange={(event) => handleChange(event)}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            error={fieldErrors.muscleGroups}
          >
            {Object.values(EXERCISETYPE).map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, exerciseType.muscleGroups!, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

export default ExerciseTypesForm;
