import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-main.png";
import { ROUTES } from "../../utils/enums";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { selectIsUserLoggedIn } from "../../features/auth/authSelectors";
import { clearCurrentUser } from "../../features/profile/profileSlice";
import { selectIsCurrentUserAdmin } from "../../features/profile/profileSelectors";
import "./Header.scss";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const isUserAdmin = useAppSelector(selectIsCurrentUserAdmin);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCurrentUser());
    localStorage.removeItem("token");
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
        {isUserAdmin && (
          <li className="nav__list__link">
            <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
          </li>
        )}
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
        <li className="nav__list__link">
          <Link to={ROUTES.PROFILE}>Profile</Link>
        </li>
        <li className="nav__list__link">{authLink}</li>
      </ul>
    </div>
  );
};

export default Navigation;
