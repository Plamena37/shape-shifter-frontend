import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import {
  Button,
  ExerciseTypesAccordion,
  ExerciseTypesForm,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectIsCurrentUserAdmin } from "../../features/profile/profileSelectors";
import {
  selectExerciseTypesErrorType,
  selectExerciseTypesSuccessType,
} from "../../features/exerciseTypes/exerciseTypesSelectors";
import {
  clearErrorType,
  clearSuccessType,
} from "../../features/exerciseTypes/exerciseTypesSlice";
import {
  ExerciseTypesSliceActionTypePrefix,
  SnackbarErrorMessages,
  SnackbarSuccessMessages,
} from "../../utils/enums";
import "../../assets/global.scss";

const {
  EXERCISE_TYPES_GET_ALL,
  EXERCISE_TYPES_GET_ONE,
  EXERCISE_TYPES_CREATE,
  EXERCISE_TYPES_UPDATE,
  EXERCISE_TYPES_DELETE,
  EXERCISE_TYPES_FILTER,
} = ExerciseTypesSliceActionTypePrefix;

const getSuccessMessage = (successType: string) => {
  switch (successType) {
    case EXERCISE_TYPES_CREATE:
      return SnackbarSuccessMessages.EXERCISE_TYPES_CREATE;
    case EXERCISE_TYPES_UPDATE:
      return SnackbarSuccessMessages.EXERCISE_TYPES_UPDATE;
    case EXERCISE_TYPES_DELETE:
      return SnackbarSuccessMessages.EXERCISE_TYPES_DELETE;
  }
};

const getErrorMessage = (errorType: string) => {
  switch (errorType) {
    case EXERCISE_TYPES_GET_ALL:
      return SnackbarErrorMessages.EXERCISE_TYPES_GET_ALL;
    case EXERCISE_TYPES_GET_ONE:
      return SnackbarErrorMessages.EXERCISE_TYPES_GET_ONE;
    case EXERCISE_TYPES_CREATE:
      return SnackbarErrorMessages.EXERCISE_TYPES_CREATE;
    case EXERCISE_TYPES_UPDATE:
      return SnackbarErrorMessages.EXERCISE_TYPES_UPDATE;
    case EXERCISE_TYPES_DELETE:
      return SnackbarErrorMessages.EXERCISE_TYPES_DELETE;
    case EXERCISE_TYPES_FILTER:
      return SnackbarErrorMessages.EXERCISE_TYPES_FILTER;
    default:
      return "Error";
  }
};

const ExerciseTypesPage = () => {
  const dispatch = useAppDispatch();
  const isUserAdmin = useAppSelector(selectIsCurrentUserAdmin);
  const errorType = useAppSelector(selectExerciseTypesErrorType);
  const successType = useAppSelector(selectExerciseTypesSuccessType);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (successType) {
      enqueueSnackbar(getSuccessMessage(successType), {
        preventDuplicate: true,
        variant: "success",
      });
      dispatch(clearSuccessType());
    }
  }, [successType]);

  useEffect(() => {
    if (errorType) {
      enqueueSnackbar(getErrorMessage(errorType), {
        preventDuplicate: true,
        variant: "error",
        autoHideDuration: 3000,
        action: (key) => (
          <IconButton color="inherit" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
      dispatch(clearErrorType());
    }
  }, [errorType]);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <section className="wrapper overlay">
        <nav className="wrapper__nav">
          <h2>Exercise types</h2>
          {isUserAdmin && (
            <Button
              btnStyle="action__btn"
              btnVariant="outlined"
              onClick={toggleDialog}
            >
              New exercise type
            </Button>
          )}
        </nav>
        <ExerciseTypesAccordion />
      </section>

      {open && (
        <ExerciseTypesForm
          open={open}
          toggleDialog={toggleDialog}
          title="Add exercise type"
          actionType="create"
        />
      )}
    </>
  );
};

export default ExerciseTypesPage;
