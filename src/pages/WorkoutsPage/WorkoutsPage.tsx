import { useState } from "react";
import { Box } from "@mui/material";
import { Button, WorkoutsForm, WorkoutsAccordion } from "../../components";
import "../../assets/global.scss";
import "./WorkoutsPage.scss";

const WorkoutsPage = () => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box className="workoutsContainer">
        <nav className="navBox">
          <h2>Workouts</h2>

          <Button
            btnStyle="action__btn"
            btnVariant="outlined"
            onClick={toggleDialog}
          >
            New workout
          </Button>
        </nav>
        <WorkoutsAccordion />
      </Box>

      {open && (
        <WorkoutsForm
          open={open}
          toggleDialog={toggleDialog}
          title="Add workout"
          actionType="create"
        />
      )}
    </>
  );
};

export default WorkoutsPage;
