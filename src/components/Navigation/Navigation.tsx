import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/img/logo-main.png";
import { ROUTES } from "../../utils/common-enums";
import { RootState } from "../../app/store";
import { AppDispatch } from "../../app/store";
import { logout } from "../../features/authSlice";
import "./Navigation.scss";

const Navigation = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const authLink = (
    <Link to={ROUTES.LOGIN} onClick={isLoggedIn ? handleLogout : handleLogin}>
      {isLoggedIn ? "Log out" : "Log in"}
    </Link>
  );
  return (
    <div className="nav">
      <div className="nav__logo">
        <Link to={ROUTES.INDEX}>
          <img src={logo} alt="Logo" className="nav__logo__img" />
        </Link>
      </div>
      <ul className="nav__list">
        <li className="nav__list__link">
          <Link to={ROUTES.INDEX}>Home</Link>
        </li>
        <li className="nav__list__link">
          <Link to={ROUTES.MEASUREMENTS}>Measurements</Link>
        </li>
        <li className="nav__list__link">
          <Link to={ROUTES.EXERCISE_TYPES}>Exercise types</Link>
        </li>
        <li className="nav__list__link">
          <Link to={ROUTES.EXERCISES}>Exercises</Link>
        </li>
        <li className="nav__list__link">
          <Link to={ROUTES.WORKOUTS}>Workouts</Link>
        </li>
        {isLoggedIn && (
          <li className="nav__list__link">
            <Link to={ROUTES.PROFILE}>Profile</Link>
          </li>
        )}
        <li className="nav__list__link">{authLink}</li>
      </ul>
    </div>
  );
};

export default Navigation;
