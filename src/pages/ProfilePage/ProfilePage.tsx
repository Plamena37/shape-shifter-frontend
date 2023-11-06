import { useEffect } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Profile } from "../../components";
import {
  SnackbarErrorMessages,
  SnackbarSuccessMessages,
  UsersSliceActionTypePrefix,
} from "../../utils/enums";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  selectUserErrorType,
  selectUserSuccessType,
} from "../../features/users/usersSelectors";
import {
  clearErrorType,
  clearSuccessType,
} from "../../features/users/userSlice";
import "../../assets/global.scss";

const { USERS_UPDATE, USERS_GET_ONE } = UsersSliceActionTypePrefix;

const getSuccessMessage = (successType: string) => {
  switch (successType) {
    case USERS_UPDATE:
      return SnackbarSuccessMessages.USERS_UPDATE;
    default:
      "Success";
  }
};

const getErrorMessage = (errorType: string) => {
  switch (errorType) {
    case USERS_UPDATE:
      return SnackbarErrorMessages.USERS_UPDATE;
    case USERS_GET_ONE:
      return SnackbarErrorMessages.USERS_GET_ONE;
    default:
      return "Error";
  }
};

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const errorType = useAppSelector(selectUserErrorType);
  const successType = useAppSelector(selectUserSuccessType);

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

  return (
    <section className="overlay--profile">
      <div className="overlay--profile__section">
        <Profile />
      </div>
    </section>
  );
};

export default ProfilePage;
