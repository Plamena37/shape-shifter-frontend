import { useEffect } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { DashboardTable } from "../../components";
import {
  selectUserErrorType,
  selectUserSuccessType,
} from "../../features/users/usersSelectors";
import {
  SnackbarErrorMessages,
  SnackbarSuccessMessages,
  UsersSliceActionTypePrefix,
} from "../../utils/enums";
import {
  clearErrorType,
  clearSuccessType,
} from "../../features/users/userSlice";
import "./DashboardPage.scss";

const { USERS_GET_ALL, USERS_UPDATE_ROLE, USERS_DELETE } =
  UsersSliceActionTypePrefix;

const getSuccessMessage = (successType: string) => {
  switch (successType) {
    case USERS_UPDATE_ROLE:
      return SnackbarSuccessMessages.USERS_UPDATE_ROLE;
    case USERS_DELETE:
      return SnackbarSuccessMessages.USERS_DELETE;
    default:
      "Success";
  }
};

const getErrorMessage = (errorType: string) => {
  switch (errorType) {
    case USERS_GET_ALL:
      return SnackbarErrorMessages.USERS_GET_ALL;
    case USERS_UPDATE_ROLE:
      return SnackbarErrorMessages.USERS_UPDATE_ROLE;
    case USERS_DELETE:
      return SnackbarErrorMessages.USERS_DELETE;
    default:
      return "Error";
  }
};

const DashboardPage = () => {
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
    <section className="dashboard__layout">
      <DashboardTable />
    </section>
  );
};

export default DashboardPage;
