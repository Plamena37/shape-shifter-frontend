import { useEffect } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { ExercisesTable } from "../../components";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectExercisesErrorType } from "../../features/exercises/exercisesSelectors";
import { clearErrorType } from "../../features/exercises/exercisesSlice";
import {
  ExercisesSliceActionTypePrefix,
  SnackbarErrorMessages,
} from "../../utils/enums";
import "../../assets/global.scss";

const { EXERCISES_GET_ALL } = ExercisesSliceActionTypePrefix;

const ExercisesPage = () => {
  const dispatch = useAppDispatch();
  const errorType = useAppSelector(selectExercisesErrorType);

  useEffect(() => {
    if (errorType === EXERCISES_GET_ALL) {
      enqueueSnackbar(SnackbarErrorMessages.EXERCISES_GET_ALL, {
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

  return (
    <section className="wrapper overlay">
      <nav className="wrapper__nav">
        <h2>Exercises</h2>
      </nav>
      <ExercisesTable />
    </section>
  );
};

export default ExercisesPage;
