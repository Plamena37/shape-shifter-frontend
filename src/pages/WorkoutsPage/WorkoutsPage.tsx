import { useState } from "react";
import { Button, WorkoutsForm, WorkoutsAccordion } from "../../components";

const WorkoutsPage = () => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <section className="wrapper overlay">
        <nav className="wrapper__nav">
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
      </section>

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
