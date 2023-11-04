import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../../utils/common-interfaces";
import { ROLE } from "../../utils/common-enums";
import { AppDispatch } from "../../app/store";
import { updateRole } from "../../features/userSlice";
import { Button } from "../UI";

type ChangeRoleProps = {
  open: boolean;
  user: User;
  toggleDialog: () => void;
};

const ChangeRole = ({ open, user, toggleDialog }: ChangeRoleProps) => {
  const [userRole, setUserRole] = useState<ROLE>(user.role ?? ROLE.USER);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    setUserRole(event.target.value as ROLE);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user._id) {
      try {
        await dispatch(updateRole({ userId: user._id, userRole })).unwrap();

        enqueueSnackbar("Success!", {
          preventDuplicate: true,
          variant: "success",
        });

        toggleDialog();
      } catch (error: Error | any) {
        enqueueSnackbar(`${error.message}!`, {
          preventDuplicate: true,
          variant: "error",
          autoHideDuration: 10000,
          action: (key) => (
            <IconButton color="inherit" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          ),
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={toggleDialog}>
      <DialogTitle>Change role</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change a user's role, please submit your desired one here.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="role">Role</InputLabel>
            <Select
              id="role"
              name="role"
              label="Role"
              labelId="role"
              value={userRole}
              onChange={(event) => handleChange(event)}
            >
              <MenuItem value={ROLE.ADMIN}>Admin</MenuItem>
              <MenuItem value={ROLE.USER}>User</MenuItem>
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={toggleDialog}>Cancel</Button>
            <Button btnType="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRole;
