import { useState } from "react";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { TableCell, TableRow } from "@mui/material";
import { format } from "date-fns";
import { User } from "../../utils/interfaces";
import { useAppDispatch } from "../../app/store";
import { deleteUser, getAllUsers } from "../../features/users/userSlice";
import ChangeRole from "./ChangeRole";
import { Button } from "../shared";
import "./Dashboard.scss";

type DashboardItemProps = {
  user: User;
};

const DashboardItem = ({ user }: DashboardItemProps) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const dateOfBirth =
    user.dateOfBirth && format(new Date(user?.dateOfBirth), "yyyy-MM-dd");

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleDeleteUser = () => {
    const action = (key: SnackbarKey) => (
      <>
        <Button
          btnStyle="btn__snackbar"
          size="small"
          btnVariant="text"
          onClick={async () => {
            await dispatch(deleteUser(user._id!));
            dispatch(getAllUsers());
            closeSnackbar(key);
          }}
        >
          YES
        </Button>
        <Button
          btnStyle="btn__snackbar"
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
      <TableRow
        key={user._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell align="left">{user.email}</TableCell>
        <TableCell align="left">{user.gender}</TableCell>
        <TableCell align="left">{user.role}</TableCell>
        <TableCell align="left">{user.height}</TableCell>
        <TableCell align="left">{dateOfBirth}</TableCell>
        <TableCell align="left">
          <Button
            btnStyle="dashboard change--role"
            btnVariant="outlined"
            onClick={toggleDialog}
          >
            Role
          </Button>
        </TableCell>
        <TableCell align="left">
          <Button
            btnStyle="dashboard delete--user"
            btnVariant="text"
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      {open && (
        <ChangeRole open={open} user={user} toggleDialog={toggleDialog} />
      )}
    </>
  );
};

export default DashboardItem;
