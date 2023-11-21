import { lazy, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import {
  AuthPage,
  ProfilePage,
  DashboardPage,
  MeasurementsPage,
  ExerciseTypesPage,
  ExercisesPage,
  WorkoutsPage,
  HomePage,
  NotSupportedScreenSizePage,
} from "./pages";

import { ROUTES } from "./utils/enums";

import "./assets/global.scss";
import theme, { StyledMaterialDesignContent } from "./theme/theme";
import BasicLayout from "./layout/BasicLayout";
import {
  AdminRouteProtection,
  LoggedInProtection,
  LoggedOutProtection,
} from "./wrappers/wrappers";
import { SuspenseLayout } from "./components";
import { useMediaQuery } from "@mui/material";

const Signup = lazy(() => import("./components/Auth/Signup"));
const Login = lazy(() => import("./components/Auth/Login"));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablet"));

  useEffect(() => {
    let pageTitle = (
      location.pathname.slice(1, 2).toUpperCase() + location.pathname.slice(2)
    ).replace("-", " ");

    if (pageTitle.includes("Profile")) {
      pageTitle = pageTitle.split("/")[0];
    }

    document.title =
      pageTitle.length > 0 ? `ShapeShifter | ${pageTitle}` : "ShapeShifter";

    if (
      isSmallScreen &&
      location.pathname !== ROUTES.NOT_SUPPORTED_SCREEN_SIZE
    ) {
      navigate(ROUTES.NOT_SUPPORTED_SCREEN_SIZE);
    } else if (
      !isSmallScreen &&
      location.pathname === ROUTES.NOT_SUPPORTED_SCREEN_SIZE
    ) {
      navigate(-1);
    }
  }, [location.pathname, isSmallScreen, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
      >
        <Routes>
          <Route element={<LoggedOutProtection />}>
            <Route path={ROUTES.INDEX} element={<BasicLayout />}>
              <Route path={ROUTES.INDEX} element={<HomePage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route
                path={ROUTES.MEASUREMENTS}
                element={<MeasurementsPage />}
              />
              <Route
                path={ROUTES.EXERCISE_TYPES}
                element={<ExerciseTypesPage />}
              />
              <Route path={ROUTES.EXERCISES} element={<ExercisesPage />} />
              <Route path={ROUTES.WORKOUTS} element={<WorkoutsPage />} />
              <Route path="*" element={<Navigate replace to="/" />} />

              <Route element={<AdminRouteProtection />}>
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              </Route>
            </Route>
          </Route>
          <Route element={<LoggedInProtection />}>
            <Route path={ROUTES.INDEX} element={<BasicLayout />}>
              <Route
                path={ROUTES.LOGIN}
                element={
                  <SuspenseLayout>
                    <AuthPage component={Login} />
                  </SuspenseLayout>
                }
              />
              <Route
                path={ROUTES.SIGNUP}
                element={
                  <SuspenseLayout>
                    <AuthPage component={Signup} />
                  </SuspenseLayout>
                }
              />
            </Route>
          </Route>

          <Route
            path={ROUTES.NOT_SUPPORTED_SCREEN_SIZE}
            element={<NotSupportedScreenSizePage />}
          />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
