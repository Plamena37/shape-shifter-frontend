import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { format } from "date-fns";
import {
  Button,
  MeasurementsForm,
  MeasurementsTable,
  TextField,
} from "../../components";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  clearErrorType,
  clearSuccessType,
  getAllMeasurements,
} from "../../features/measurements/measurementsSlice";
import {
  selectMeasurements,
  selectMeasurementsErrorType,
  selectMeasurementsSuccessType,
} from "../../features/measurements/measurementsSelectors";
import MeasurementsChart from "../../components/Measurements/components/MeasurementsChart";
import "../../components/Measurements/MeasurementsTable.scss";
import {
  MeasurementsSliceActionTypePrefix,
  SnackbarErrorMessages,
  SnackbarSuccessMessages,
} from "../../utils/enums";
import "../../assets/global.scss";
import "./MeasurementsPage.scss";

const {
  MEASUREMENTS_GET_ALL,
  MEASUREMENTS_GET_ONE,
  MEASUREMENTS_CREATE,
  MEASUREMENTS_UPDATE,
  MEASUREMENTS_DELETE,
} = MeasurementsSliceActionTypePrefix;

const getSuccessMessage = (successType: string) => {
  switch (successType) {
    case MEASUREMENTS_CREATE:
      return SnackbarSuccessMessages.MEASUREMENTS_CREATE;
    case MEASUREMENTS_UPDATE:
      return SnackbarSuccessMessages.MEASUREMENTS_EDIT;
    case MEASUREMENTS_DELETE:
      return SnackbarSuccessMessages.MEASUREMENTS_DELETE;
  }
};

const getErrorMessage = (errorType: string) => {
  switch (errorType) {
    case MEASUREMENTS_GET_ALL:
      return SnackbarErrorMessages.MEASUREMENTS_GET_ALL;
    case MEASUREMENTS_GET_ONE:
      return SnackbarErrorMessages.MEASUREMENTS_GET_ONE;
    case MEASUREMENTS_CREATE:
      return SnackbarErrorMessages.MEASUREMENTS_CREATE;
    case MEASUREMENTS_UPDATE:
      return SnackbarErrorMessages.MEASUREMENTS_UPDATE;
    case MEASUREMENTS_DELETE:
      return SnackbarErrorMessages.MEASUREMENTS_DELETE;
    default:
      return "Error";
  }
};

const MeasurementsPage = () => {
  const dispatch = useAppDispatch();
  const measurements = useAppSelector(selectMeasurements);
  const errorType = useAppSelector(selectMeasurementsErrorType);
  const successType = useAppSelector(selectMeasurementsSuccessType);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    dispatch(getAllMeasurements());
  }, []);

  useEffect(() => {
    if (successType) {
      enqueueSnackbar(getSuccessMessage(successType), {
        preventDuplicate: true,
        variant: "success",
      });
      dispatch(clearSuccessType());
    }
  }, [successType]);

  useEffect(() => {
    if (errorType) {
      enqueueSnackbar(getErrorMessage(errorType), {
        preventDuplicate: true,
        variant: "error",
        autoHideDuration: 3000,
        action: (key) => (
          <IconButton color="inherit" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
      dispatch(clearErrorType());
    }
  }, [errorType]);

  useEffect(() => {
    measurements!.length > 0 &&
      setDate({
        startDate: String(measurements![0].date),
        endDate: String(measurements![measurements!.length - 1].date),
      });
  }, [measurements]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setDate({
      startDate: String(measurements![0].date),
      endDate: String(measurements![measurements!.length - 1].date),
    });
  };

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box className="measurementsBox">
        <div className="measurementsContainer">
          <nav className="navBox">
            <h2>My measurements</h2>
            <Button
              btnStyle="action__btn"
              onClick={toggleDialog}
              btnVariant="outlined"
            >
              New measurement
            </Button>
          </nav>
          <MeasurementsTable />
        </div>

        <div className="measurementsContainer chartContainer">
          <div className="chart">
            <form onSubmit={handleSubmit} className="chart__form">
              <TextField
                id="startDate"
                name="startDate"
                label="Start date"
                type="date"
                onChange={(event) => handleChange(event)}
                value={date.startDate as string}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: today }}
                required={false}
              />
              <TextField
                id="endDate"
                name="endDate"
                label="End date"
                type="date"
                onChange={(event) => handleChange(event)}
                value={date.endDate as string}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: today }}
                required={false}
              />
              <Button btnType="submit" btnVariant="text" onClick={handleReset}>
                Clear
              </Button>
            </form>

            <MeasurementsChart
              measurements={measurements!}
              startDate={date.startDate as string}
              endDate={date.endDate as string}
            />
          </div>
          <nav className="navBox chartNav">
            <h2>Track your measurements</h2>
          </nav>
        </div>
      </Box>

      {open && (
        <MeasurementsForm
          open={open}
          toggleDialog={toggleDialog}
          title="Add measurement"
          actionType="create"
        />
      )}
    </>
  );
};

export default MeasurementsPage;
