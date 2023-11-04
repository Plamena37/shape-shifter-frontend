import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material";
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
} from "./pages";
import { SuspenseLayout, NavigationLayout } from "./components";
import { ROUTES } from "./utils/common-enums";
import { RootState } from "./app/store";
import "./assets/global.scss";

const Signup = lazy(() => import("./components/Auth/Signup"));
const Login = lazy(() => import("./components/Auth/Login"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#55c57a",
    },
  },
});

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route
            path={ROUTES.SIGNUP}
            element={
              !isLoggedIn ? (
                <SuspenseLayout>
                  <AuthPage component={Signup} />
                </SuspenseLayout>
              ) : (
                <Navigate to={ROUTES.INDEX} />
              )
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={
              !isLoggedIn ? (
                <SuspenseLayout>
                  <AuthPage component={Login} />
                </SuspenseLayout>
              ) : (
                <Navigate to={ROUTES.INDEX} />
              )
            }
          />

          <Route
            path={ROUTES.INDEX}
            element={
              isLoggedIn ? <NavigationLayout /> : <Navigate to={ROUTES.LOGIN} />
            }
          >
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.INDEX} element={<DashboardPage />} />
            <Route path={ROUTES.MEASUREMENTS} element={<MeasurementsPage />} />
            <Route
              path={ROUTES.EXERCISE_TYPES}
              element={<ExerciseTypesPage />}
            />
            <Route path={ROUTES.EXERCISES} element={<ExercisesPage />} />
            <Route path={ROUTES.WORKOUTS} element={<WorkoutsPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
