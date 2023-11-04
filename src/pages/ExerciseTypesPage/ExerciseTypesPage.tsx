import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  ExerciseTypesAccordion,
  ExerciseTypesForm,
} from "../../components";
import { RootState, useAppDispatch } from "../../app/store";
import { getUserById } from "../../features/userSlice";
import { getCurrentUserIdAndEmail } from "../../utils/common-functions";
import { User } from "../../utils/common-interfaces";
import { ROLE } from "../../utils/common-enums";
import "../../assets/global.scss";

const ExerciseTypesPage = () => {
  const dispatch = useAppDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    id: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const res = getCurrentUserIdAndEmail();

    setUserInfo({
      email: res!.email,
      id: res!.id,
    });
  }, []);

  const user: User | undefined = useSelector(
    (state: RootState) => state.user.user
  );

  useEffect(() => {
    if (userInfo.id) {
      dispatch(getUserById(userInfo.id));
    }
  }, [userInfo]);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <section className="wrapper overlay">
        <nav className="wrapper__nav">
          <h2>Exercise types</h2>
          {user.role === ROLE.ADMIN && (
            <Button btnStyle="wrapper__btn" onClick={toggleDialog}>
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
