import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { selectIsUserLoggedIn } from "../features/auth/authSelectors";
import { selectIsCurrentUserAdmin } from "../features/profile/profileSelectors";
import { ROUTES } from "../utils/enums";

export const LoggedOutProtection = () => {
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export const LoggedInProtection = () => {
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  return isLoggedIn ? <Navigate to={ROUTES.INDEX} /> : <Outlet />;
};

export const AdminRouteProtection = () => {
  const isAdmin = useAppSelector(selectIsCurrentUserAdmin);

  return isAdmin ? <Outlet /> : <Navigate to={ROUTES.INDEX} />;
};
