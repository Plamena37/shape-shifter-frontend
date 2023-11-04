import { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { format } from "date-fns";
import {
  pushErrorsInArray,
  validationConditions,
  validations,
} from "../../utils/auth.validation";
import { ROLE } from "../../utils/enums";
import { User } from "../../utils/interfaces";
import { fiveYearsBeforeToday } from "../../utils/functions";
import { updateUserById } from "../../features/userSlice";
import { useAppDispatch } from "../../app/store";
import { TextField, Button } from "../shared";
import "./Profile.scss";

type DialogProps = {
  currUser: User;
  isOpen: boolean;
  handleClose: () => void;
};

const ProfileDialog = ({ currUser, isOpen, handleClose }: DialogProps) => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({
    ...currUser,
    dateOfBirth: format(new Date(currUser.dateOfBirth), "yyyy-MM-dd"),
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    password: false,
    gender: false,
    dateOfBirth: false,
    height: false,
  });

  const handleValidate = (fieldName: string, fieldValue: string) => {
    if (fieldName !== "role") {
      setFieldErrors({
        ...fieldErrors,
        [fieldName]: !validationConditions[fieldName].test(fieldValue),
      });
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;

    setUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

    handleValidate(name, value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currUser._id) {
      try {
        await dispatch(
          updateUserById({ userId: currUser._id, userData: user })
        ).unwrap();

        enqueueSnackbar("Success!", {
          preventDuplicate: true,
          variant: "success",
        });

        handleClose();
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
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit information</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              p: 2,
              pb: 0,
              minWidth: 500,
            }}
          >
            <form onSubmit={handleSubmit} className="profile__form">
              <TextField
                id="name"
                name="name"
                label="Name"
                onChange={(event) => handleChange(event)}
                value={user.name}
                error={fieldErrors.name}
                helperText={fieldErrors.name && validations.name}
                required={false}
              />

              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                onChange={(event) => handleChange(event)}
                value={user.email}
                error={fieldErrors.email}
                helperText={fieldErrors.email && validations.email}
                required={false}
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                onChange={(event) => handleChange(event)}
                defaultValue=""
                error={fieldErrors.password}
                helperText={fieldErrors.password && validations.password}
                required={false}
              />

              <FormControl variant="standard" fullWidth>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  id="gender"
                  name="gender"
                  label="Gender"
                  labelId="gender"
                  value={user.gender}
                  onChange={(event) => handleChange(event)}
                  error={fieldErrors.gender}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>

              {currUser.role == ROLE.ADMIN && (
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="role">Role</InputLabel>
                  <Select
                    id="role"
                    name="role"
                    label="Role"
                    labelId="role"
                    value={user.role}
                    onChange={(event) => handleChange(event)}
                    error={fieldErrors.gender}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
              )}

              <TextField
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date of birth"
                type="date"
                onChange={(event) => handleChange(event)}
                value={user.dateOfBirth}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: fiveYearsBeforeToday() }}
                error={fieldErrors.dateOfBirth}
                helperText={fieldErrors.dateOfBirth && validations.dateOfBirth}
                required={false}
              />

              <TextField
                id="height"
                name="height"
                label="Height (cm)"
                type="height"
                onChange={(event) => handleChange(event)}
                value={user.height}
                error={fieldErrors.height}
                helperText={fieldErrors.height && validations.height}
                required={false}
              />

              <Box
                sx={{
                  marginInline: "auto",
                }}
              >
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    btnDisabled={pushErrorsInArray(fieldErrors)}
                    btnType="submit"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileDialog;
