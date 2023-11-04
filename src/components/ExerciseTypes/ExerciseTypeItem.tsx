import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";
import { RootState, useAppDispatch } from "../../app/store";
import { Button } from "../UI";
import { ExerciseTypesForm } from "..";
import {
  deleteExerciseType,
  getAllExerciseTypes,
} from "../../features/exerciseTypes/exerciseTypeSlice";
import { ExerciseType, User } from "../../utils/interfaces";
import { ROLE } from "../../utils/enums";

type ExerciseTypeItemProps = {
  exerciseType: ExerciseType;
};

const ExerciseTypeItem = ({ exerciseType }: ExerciseTypeItemProps) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const user: User | undefined = useSelector(
    (state: RootState) => state.user.user
  );

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleDeleteExerciseType = () => {
    const action = (key: SnackbarKey) => (
      <>
        <Button
          color="secondary"
          size="small"
          btnVariant="text"
          onClick={async () => {
            await dispatch(deleteExerciseType(exerciseType._id!));
            dispatch(getAllExerciseTypes());
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
      <Accordion
        sx={{
          backgroundColor: "#f5f5f5",
          width: "41vw",
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
            {exerciseType.name}
            {user.role === ROLE.ADMIN && (
              <div style={{ marginLeft: "auto" }}>
                <Button btnVariant="text" onClick={toggleDialog}>
                  Edit
                </Button>
                <Button
                  btnVariant="text"
                  btnStyle="btn--delete"
                  onClick={handleDeleteExerciseType}
                >
                  Delete
                </Button>
              </div>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {exerciseType.muscleGroups.map((muscle) => (
              <span key={uuid()}>🟢{muscle} </span>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {open && (
        <ExerciseTypesForm
          open={open}
          toggleDialog={toggleDialog}
          title="Edit exercise type"
          actionType="edit"
          exerciseTypeData={exerciseType}
        />
      )}
    </>
  );
};

export default ExerciseTypeItem;
