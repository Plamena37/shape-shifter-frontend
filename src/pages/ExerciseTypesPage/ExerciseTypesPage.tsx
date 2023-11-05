import { useState } from "react";

import {
  Button,
  ExerciseTypesAccordion,
  ExerciseTypesForm,
} from "../../components";
import { useAppSelector } from "../../app/store";
import { selectIsCurrentUserAdmin } from "../../features/profile/profileSelectors";
import "../../assets/global.scss";

const ExerciseTypesPage = () => {
  const [open, setOpen] = useState(false);

  const isUserAdmin = useAppSelector(selectIsCurrentUserAdmin);

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
