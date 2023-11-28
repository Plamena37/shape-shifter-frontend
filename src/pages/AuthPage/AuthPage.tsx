import { useEffect } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import authImage from "../../assets/img/auth.jpg";

import {
  SnackbarErrorMessages,
  SnackbarSuccessMessages,
  UsersSliceActionTypePrefix,
} from "../../utils/enums";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  selectAuthErrorType,
  selectAuthHasError,
  selectAuthSuccessType,
} from "../../features/auth/authSelectors";
import {
  clearErrorType,
  clearSuccessType,
} from "../../features/auth/authSlice";
import "../../assets/global.scss";

const { USERS_CREATE, USERS_LOGIN } = UsersSliceActionTypePrefix;

const getSuccessMessage = (successType: string) => {
  switch (successType) {
    case USERS_CREATE:
      return SnackbarSuccessMessages.USERS_CREATE;
    default:
      "Success";
  }
};

const getErrorMessage = (errorType: string) => {
  switch (errorType) {
    case USERS_CREATE:
      return SnackbarErrorMessages.USERS_CREATE;
    case USERS_LOGIN:
      return SnackbarErrorMessages.USERS_LOGIN;
    default:
      return "Error";
  }
};

type Props = {
  component: React.ComponentType;
};
const AuthPage = ({ component: Component }: Props) => {
  const dispatch = useAppDispatch();
  const successType = useAppSelector(selectAuthSuccessType);
  const errorType = useAppSelector(selectAuthErrorType);
  const error = useAppSelector(selectAuthHasError);

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
    if (
      errorType &&
      error?.message !== SnackbarErrorMessages.USERS_ALREADY_EXISTS
    ) {
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
    <div className="overlay">
      <div className="overlay__section">
        <div className="overlay__image__wrapper">
          <img className="overlay__img" alt="Hot air baloon" src={authImage} />
        </div>
        <Component />
      </div>
    </div>
  );
};

export default AuthPage;
