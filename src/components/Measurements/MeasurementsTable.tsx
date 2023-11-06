import { useEffect, useState } from "react";
import {
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
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getAllMeasurements } from "../../features/measurements/measurementsSlice";
import MeasurementsItem from "./MeasurementsItem";
import { LoadingSpinner, PaginationActions } from "..";
import {
  selectMeasurements,
  selectMeasurementsIsLoading,
} from "../../features/measurements/measurementsSelectors";
import "./MeasurementsTable.scss";

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllMeasurements());
  }, []);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - allMeasurements!.length)
      : 0;

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
              {!isLoading && allMeasurements!.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    sx={{
                      padding: "7.8rem",
                    }}
                    align="center"
                  >
                    <p className="no__content full__width">
                      No measurements found!
                    </p>
                  </TableCell>
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
    </div>
  );
};

export default MeasurementsTable;
