import { useEffect, useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  clearErrorType,
  clearSuccessType,
  getAllMeasurements,
} from "../../features/measurements/measurementsSlice";
import MeasurementsItem from "./MeasurementsItem";
import { LoadingSpinner, PaginationActions } from "..";
import {
  selectMeasurements,
  selectMeasurementsSuccessType,
  selectMeasurementsIsLoading,
  selectMeasurementsErrorType,
} from "../../features/measurements/measurementsSelectors";
import { calcEmptyRows } from "../../utils/functions";
import {
  MeasurementsSliceActionTypePrefix,
  SnackbarErrorMessages,
  SnackbarSuccessMessages,
} from "../../utils/enums";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import "./MeasurementsTable.scss";

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

const measurementCellData: {
  title: string;
}[] = [
  { title: "Weight (kg)" },
  { title: "Chest (cm)" },
  { title: "Waist (cm)" },
  { title: "Hips (cm)" },
  { title: "Biceps (cm)" },
  { title: "Date" },
  { title: "" },
  { title: "" },
  { title: "" },
];

const MeasurementsTable = () => {
  const dispatch = useAppDispatch();
  const allMeasurements = useAppSelector(selectMeasurements);
  const isLoading = useAppSelector(selectMeasurementsIsLoading);
  const errorType = useAppSelector(selectMeasurementsErrorType);
  const successType = useAppSelector(selectMeasurementsSuccessType);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const emptyRows = calcEmptyRows(page, rowsPerPage, allMeasurements!.length);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {allMeasurements!.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {measurementCellData.map((el) => (
                  <TableCell key={uuid()} className="table__head">
                    {el.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    sx={{
                      padding: "7.8rem",
                    }}
                    align="center"
                  >
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? allMeasurements!.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : allMeasurements!
                ).map((measurement) => (
                  <MeasurementsItem
                    key={measurement._id}
                    measurement={measurement}
                  />
                ))
              )}

              {!isLoading && emptyRows > 0 && (
                <TableRow style={{ height: 66.9 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter className="table__footer">
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={8}
                  count={allMeasurements!.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={(_, page) => {
                    setPage(page);
                  }}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      {!isLoading && allMeasurements!.length === 0 && (
        <p className="no__content full__width">No measurements found!</p>
      )}
    </div>
  );
};

export default MeasurementsTable;
