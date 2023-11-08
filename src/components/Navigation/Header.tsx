import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
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
        <NavLink
          className={({ isActive }) => (isActive ? "activeLink" : "")}
          to={ROUTES.INDEX}
        >
          <img src={logo} alt="Logo" className="nav__logo__img" />
        </NavLink>
      </div>
      <ul className="nav__list">
        <li className="nav__list__link">
          <NavLink
            to={ROUTES.INDEX}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "activeLink" : ""
            }
          >
            Home
          </NavLink>
        </li>
        {isUserAdmin && (
          <li className="nav__list__link">
            <NavLink
              to={ROUTES.DASHBOARD}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeLink" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
        )}
        <li className="nav__list__link">
          <NavLink
            to={ROUTES.MEASUREMENTS}
            className={({ isActive }) => (isActive ? "activeLink" : "")}
          >
            Measurements
          </NavLink>
        </li>
        <li className="nav__list__link">
          <NavLink
            to={ROUTES.EXERCISE_TYPES}
            className={({ isActive }) => (isActive ? "activeLink" : "")}
          >
            Exercise types
          </NavLink>
        </li>
        <li className="nav__list__link">
          <NavLink
            to={ROUTES.EXERCISES}
            className={({ isActive }) => (isActive ? "activeLink" : "")}
          >
            Exercises
          </NavLink>
        </li>
        <li className="nav__list__link">
          <NavLink
            to={ROUTES.WORKOUTS}
            className={({ isActive }) => (isActive ? "activeLink" : "")}
          >
            Workouts
          </NavLink>
        </li>
        <li className="nav__list__link">
          <NavLink
            to={ROUTES.PROFILE}
            className={({ isActive }) => (isActive ? "activeLink" : "")}
          >
            Profile
          </NavLink>
        </li>
        <li className="nav__list__link">{authLink}</li>
      </ul>
    </div>
  );
};

export default Navigation;
