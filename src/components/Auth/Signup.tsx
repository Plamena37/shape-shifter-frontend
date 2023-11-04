import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import {
  pushErrorsInArray,
  validationConditions,
  validations,
} from "../../utils/auth.validation";
import { TextField, Button } from "../UI";
import { ROUTES } from "../../utils/enums";
import { fiveYearsBeforeToday } from "../../utils/functions";
import { signup } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/store";
import "./Auth.scss";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    height: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    gender: false,
    dateOfBirth: false,
    height: false,
  });

  const handleValidate = (fieldName: string, fieldValue: string) => {
    if (fieldName !== "confirmPassword") {
      setFieldErrors({
        ...fieldErrors,
        [fieldName]: !validationConditions[fieldName].test(fieldValue),
      });
    } else {
      if (fieldValue === formData.password) {
        setFieldErrors({
          ...fieldErrors,
          confirmPassword: false,
        });
      } else {
        setFieldErrors({
          ...fieldErrors,
          confirmPassword: true,
        });
      }
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    handleValidate(name, value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataFinal = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      height: formData.height,
    };

    try {
      await dispatch(signup(formDataFinal)).unwrap();

      enqueueSnackbar("Success!", {
        preventDuplicate: true,
        variant: "success",
      });

      navigate(ROUTES.LOGIN);
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
  };

  return (
    <div className="form__wrapper">
      <nav className="form__nav">
        <Link to={ROUTES.LOGIN}>
          <button className="form__nav__btn">Login</button>
        </Link>
        <span className="form__nav--span">|</span>
        <Link to={ROUTES.SIGNUP}>
          <button className="form__nav__btn form__nav__btn--active">
            Signup
          </button>
        </Link>
      </nav>

      <form onSubmit={handleSubmit} className="form form__signup">
        <TextField
          id="name"
          name="name"
          label="Name"
          onChange={(event) => handleChange(event)}
          value={formData.name}
          error={fieldErrors.name}
          helperText={fieldErrors.name && validations.name}
        />

        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          onChange={(event) => handleChange(event)}
          value={formData.email}
          error={fieldErrors.email}
          helperText={fieldErrors.email && validations.email}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={(event) => handleChange(event)}
          value={formData.password}
          error={fieldErrors.password}
          helperText={fieldErrors.password && validations.password}
        />

        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={(event) => handleChange(event)}
          value={formData.confirmPassword}
          error={fieldErrors.confirmPassword}
          helperText={
            fieldErrors.confirmPassword && validations.confirmPassword
          }
        />

        <FormControl variant="standard" fullWidth>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            id="gender"
            name="gender"
            label="Gender"
            labelId="gender"
            value={formData.gender}
            onChange={(event) => handleChange(event)}
            error={fieldErrors.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="dateOfBirth"
          name="dateOfBirth"
          label="Date of birth"
          type="date"
          onChange={(event) => handleChange(event)}
          value={formData.dateOfBirth}
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: fiveYearsBeforeToday() }}
          error={fieldErrors.dateOfBirth}
          helperText={fieldErrors.dateOfBirth && validations.dateOfBirth}
        />

        <TextField
          id="height"
          name="height"
          label="Height (cm)"
          type="height"
          onChange={(event) => handleChange(event)}
          value={formData.height}
          error={fieldErrors.height}
          helperText={fieldErrors.height && validations.height}
        />
        <Button
          btnStyle="btn__auth"
          btnDisabled={pushErrorsInArray(fieldErrors)}
          btnType="submit"
        >
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;
