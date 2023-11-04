import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { createTheme, styled } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider, MaterialDesignContent } from "notistack";
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
import { ROUTES } from "./utils/enums";
import { useAppSelector } from "./app/store";
import { selectIsUserLoggedIn } from "./features/auth/authSelectors";
import "./assets/global.scss";

const Signup = lazy(() => import("./components/Auth/Signup"));
const Login = lazy(() => import("./components/Auth/Login"));

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#2eb47b",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#32a184",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#318974",
        },
      },
      variants: [
        {
          props: {
            variant: "contained",
          },
          style: {
            "&:disabled": {
              backgroundColor: "#9d9d9d",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#318974",
            },
            backgroundColor: "#32a184",
            color: "#fff",
          },
        },
        {
          props: {
            variant: "outlined",
          },
          style: {
            "&:hover": {
              backgroundColor: "#f3f3f3",
            },
            backgroundColor: "#fff",
            color: "#318974",
          },
        },
      ],
    },
  },
});

function App() {
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

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
