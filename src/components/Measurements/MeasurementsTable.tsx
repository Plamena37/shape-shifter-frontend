import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { AppDispatch, RootState } from "../../app/store";
import { getAllMeasurements } from "../../features/measurementSlice";
import MeasurementsItem from "./MeasurementsItem";
import { PaginationActions } from "..";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch<AppDispatch>();

  const allMeasurements = useSelector(
    (state: RootState) => state.measurement.measurements
  );

  useEffect(() => {
    dispatch(getAllMeasurements());
  }, []);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - allMeasurements.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {allMeasurements.length > 0 && (
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
              {allMeasurements
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((measurement) => (
                  <MeasurementsItem
                    key={measurement._id}
                    measurement={measurement}
                  />
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 66.9 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter className="table__footer">
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={allMeasurements.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      {allMeasurements.length === 0 && (
        <p className="no__content">No measurements found!</p>
      )}
    </div>
  );
};

export default MeasurementsTable;
