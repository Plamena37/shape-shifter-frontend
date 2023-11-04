import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";
import { AppDispatch, RootState } from "../../app/store";
import { Button } from "../UI";
import { ExerciseTypesForm } from "..";
import { deleteExerciseType } from "../../features/exerciseTypeSlice";
import { ExerciseType, User } from "../../utils/common-interfaces";
import { ROLE } from "../../utils/common-enums";

type ExerciseTypeItemProps = {
  exerciseType: ExerciseType;
};

const ExerciseTypeItem = ({ exerciseType }: ExerciseTypeItemProps) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

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
          onClick={() => {
            dispatch(deleteExerciseType(exerciseType._id!));
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