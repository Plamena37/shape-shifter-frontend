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
import ExercisesItem from "./ExercisesItem";
import { getAllExercises } from "../../features/exerciseSlice";
import { PaginationActions } from "..";
import "./ExercisesTable.scss";

const exerciseCellData: {
  title: string;
}[] = [
  {
    title: "Exercise",
  },
  { title: "Series" },
  { title: "Repetitions" },
  { title: "Weight (kg)" },
  { title: "Time (hh/mm)" },
  { title: "Distance (km)" },
];

const ExercisesTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch<AppDispatch>();

  const allExercises = useSelector(
    (state: RootState) => state.exercise.exercises
  );

  useEffect(() => {
    dispatch(getAllExercises());
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allExercises.length) : 0;

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
    <div className="exercises__container">
      {allExercises.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {exerciseCellData.map((el) => (
                  <TableCell key={uuid()} className="table__head">
                    {el.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allExercises
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((exercise) => (
                  <ExercisesItem key={exercise._id} exercise={exercise} />
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 52.5 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter className="table__footer">
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={8}
                  count={allExercises.length}
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
      {allExercises.length === 0 && (
        <p className="no__content">No exercises found!</p>
      )}
    </div>
  );
};

export default ExercisesTable;
