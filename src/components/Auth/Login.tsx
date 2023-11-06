import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  pushErrorsInArray,
  validationConditions,
  validations,
} from "../../utils/auth.validation";
import { TextField, Button, LoadingSpinner } from "../shared";
import { ROUTES } from "../../utils/enums";
import { login } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectAuthIsLoading } from "../../features/auth/authSelectors";
import "./Auth.scss";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthIsLoading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });

  const handleValidate = (fieldName: string, fieldValue: string) => {
    setFieldErrors({
      ...fieldErrors,
      [fieldName]: !validationConditions[fieldName].test(fieldValue),
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    await dispatch(login(formData)).unwrap();
    navigate(ROUTES.INDEX);
  };

  return (
    <div className="form__wrapper login">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <nav className="form__nav login">
            <Link to={ROUTES.LOGIN}>
              <button className="form__nav__btn form__nav__btn--active">
                Login
              </button>
            </Link>
            <span className="form__nav--span">|</span>
            <Link to={ROUTES.SIGNUP}>
              <button className="form__nav__btn">Signup</button>
            </Link>
          </nav>
          <form onSubmit={handleSubmit} className="form form__login">
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

            <Button
              btnStyle="btn__auth"
              btnDisabled={pushErrorsInArray(fieldErrors)}
              btnType="submit"
            >
              Login
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
